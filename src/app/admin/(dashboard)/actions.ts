"use server";

import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import {
  db,
  services,
  availability,
  blockedPeriods,
  bookings,
  pages,
  posts,
  media,
  contactSubmissions,
} from "@/db";
import { getAdmin } from "@/lib/auth";
import {
  serviceSchema,
  availabilityUpdateSchema,
  blockedPeriodSchema,
  postSchema,
} from "@/lib/validation";
import {
  sendEmail,
  bookingCancelledCustomer,
} from "@/lib/email";

async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

// ─── Services ───────────────────────────────────────────────────────────────
export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const parsed = serviceSchema.parse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    durationMinutes: formData.get("durationMinutes"),
    price: (formData.get("price") as string) || null,
    currency: (formData.get("currency") as string) || "USD",
    isActive: formData.get("isActive") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  });
  const values = {
    name: parsed.name,
    description: parsed.description || null,
    durationMinutes: parsed.durationMinutes,
    price: parsed.price && parsed.price !== "" ? parsed.price : null,
    currency: parsed.currency,
    isActive: parsed.isActive,
    sortOrder: parsed.sortOrder,
    updatedAt: new Date(),
  };
  if (id) {
    await db.update(services).set(values).where(eq(services.id, id));
  } else {
    await db.insert(services).values(values);
  }
  revalidatePath("/admin/diensten");
  revalidatePath("/diensten");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/diensten");
  revalidatePath("/diensten");
}

// ─── Availability ─────────────────────────────────────────────────────────—
export async function saveAvailability(formData: FormData) {
  await requireAdmin();
  const rows = Array.from({ length: 7 }, (_, dow) => ({
    dayOfWeek: dow,
    startTime: (formData.get(`start-${dow}`) as string) || "09:00",
    endTime: (formData.get(`end-${dow}`) as string) || "17:00",
    isOpen: formData.get(`open-${dow}`) === "on",
    slotDurationMinutes: Number(formData.get(`slot-${dow}`) || 30),
    maxBookingsPerSlot: Number(formData.get(`max-${dow}`) || 1),
  }));
  const parsed = availabilityUpdateSchema.parse({ rows });

  for (const row of parsed.rows) {
    const [existing] = await db
      .select({ id: availability.id })
      .from(availability)
      .where(eq(availability.dayOfWeek, row.dayOfWeek))
      .limit(1);
    if (existing) {
      await db.update(availability).set(row).where(eq(availability.id, existing.id));
    } else {
      await db.insert(availability).values(row);
    }
  }
  revalidatePath("/admin/beschikbaarheid");
}

export async function addBlockedPeriod(formData: FormData) {
  await requireAdmin();
  const parsed = blockedPeriodSchema.parse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    reason: formData.get("reason") ?? "",
  });
  await db.insert(blockedPeriods).values({
    startDate: parsed.startDate,
    endDate: parsed.endDate,
    reason: parsed.reason || null,
  });
  revalidatePath("/admin/beschikbaarheid");
}

export async function deleteBlockedPeriod(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await db.delete(blockedPeriods).where(eq(blockedPeriods.id, id));
  revalidatePath("/admin/beschikbaarheid");
}

// ─── Bookings ─────────────────────────────────────────────────────────────—
export async function cancelBooking(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  if (!booking) return;

  await db
    .update(bookings)
    .set({ status: "cancelled", cancelledAt: new Date(), cancelledBy: "admin", updatedAt: new Date() })
    .where(eq(bookings.id, id));

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, booking.serviceId))
    .limit(1);
  await sendEmail({
    to: booking.customerEmail,
    ...bookingCancelledCustomer({
      serviceName: service?.name ?? "Afspraak",
      date: booking.date,
      startTime: booking.startTime,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
    }),
  });
  revalidatePath("/admin/afspraken");
  revalidatePath("/admin/kalender");
}

export async function setBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as "pending" | "confirmed" | "completed";
  await db.update(bookings).set({ status, updatedAt: new Date() }).where(eq(bookings.id, id));
  revalidatePath("/admin/afspraken");
  revalidatePath(`/admin/afspraken/${id}`);
}

// ─── Pages (CMS) ────────────────────────────────────────────────────────────
export async function savePage(formData: FormData) {
  const admin = await requireAdmin();
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const bodyText = (formData.get("body") as string) ?? "";
  const seoTitle = (formData.get("seoTitle") as string) || null;
  const seoDescription = (formData.get("seoDescription") as string) || null;

  const values = {
    title,
    content: { text: bodyText },
    seoTitle,
    seoDescription,
    isPublished: formData.get("isPublished") === "on",
    updatedAt: new Date(),
    updatedBy: admin,
  };

  const [existing] = await db.select({ id: pages.id }).from(pages).where(eq(pages.slug, slug)).limit(1);
  if (existing) {
    await db.update(pages).set(values).where(eq(pages.slug, slug));
  } else {
    await db.insert(pages).values({ slug, ...values });
  }
  revalidatePath("/admin/paginas");
}

// ─── Blog / news posts ──────————————————————————————————————————————————————
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = (formData.get("id") as string) || null;

  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug") ?? "",
    excerpt: formData.get("excerpt") ?? "",
    content: formData.get("content") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
    status: formData.get("status") === "published" ? "published" : "draft",
  });

  const slug = parsed.slug && parsed.slug.length > 0 ? slugify(parsed.slug) : slugify(parsed.title);

  // Images kept from before (minus any the user checked to remove) + newly uploaded files.
  const removedImages = new Set(formData.getAll("removeImage") as string[]);
  const keptImages = (formData.getAll("existingImages") as string[]).filter((url) => !removedImages.has(url));
  const newFiles = (formData.getAll("images") as File[]).filter((f) => f && f.size > 0);
  const uploadedUrls = await Promise.all(newFiles.map((f) => saveUploadedFile(f)));
  const images = [...keptImages, ...uploadedUrls];
  const featuredImage = images[0] ?? null;
  await Promise.all([...removedImages].map((url) => deleteUploadedFile(url)));

  const [existing] = id
    ? await db.select({ id: posts.id, status: posts.status, publishedAt: posts.publishedAt }).from(posts).where(eq(posts.id, id)).limit(1)
    : [];

  const values = {
    slug,
    title: parsed.title,
    excerpt: parsed.excerpt || null,
    content: { text: parsed.content || "" },
    featuredImage,
    images,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    status: parsed.status,
    publishedAt:
      parsed.status === "published" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null,
    updatedAt: new Date(),
  };

  if (existing) {
    await db.update(posts).set(values).where(eq(posts.id, existing.id));
  } else {
    await db.insert(posts).values(values);
  }
  revalidatePath("/admin/blog");
  revalidatePath("/news");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const [row] = await db.select({ images: posts.images }).from(posts).where(eq(posts.id, id)).limit(1);
  await db.delete(posts).where(eq(posts.id, id));
  if (row?.images?.length) await Promise.all(row.images.map((url) => deleteUploadedFile(url)));
  revalidatePath("/admin/blog");
  revalidatePath("/news");
}

// ─── Media ─────────————————————————————————————————————————————————————————
// Vercel's serverless filesystem is read-only outside /tmp, so uploads must
// go to Vercel Blob storage in production. The SDK authenticates either via
// BLOB_READ_WRITE_TOKEN or (when the store is connected through the
// dashboard) BLOB_STORE_ID + Vercel's auto-injected OIDC token. Locally,
// with neither present, we fall back to writing into public/uploads.
async function saveUploadedFile(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filename = `${Date.now()}-${safeName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, { access: "public" });
    return blob.url;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${filename}`;
}

export async function uploadMedia(formData: FormData) {
  const admin = await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return;

  const url = await saveUploadedFile(file);
  await db.insert(media).values({
    filename: file.name,
    url,
    mimeType: file.type,
    sizeBytes: file.size,
    altText: (formData.get("altText") as string) || null,
    uploadedBy: admin,
  });
  revalidatePath("/admin/media");
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  if (row?.url) await deleteUploadedFile(row.url);
  await db.delete(media).where(eq(media.id, id));
  revalidatePath("/admin/media");
}

async function deleteUploadedFile(url: string) {
  if (url.startsWith("/uploads/")) {
    await fs.unlink(path.join(process.cwd(), "public", url)).catch(() => {});
    return;
  }
  if ((process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) && url.includes(".public.blob.vercel-storage.com")) {
    const { del } = await import("@vercel/blob");
    await del(url).catch(() => {});
  }
}

// ─── Contact submissions ─────————————————————————————————————————————————————
export async function markContactRead(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const read = formData.get("read") === "true";
  await db.update(contactSubmissions).set({ isRead: read }).where(eq(contactSubmissions.id, id));
  revalidatePath("/admin/contact");
}

export async function deleteContact(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  revalidatePath("/admin/contact");
}
