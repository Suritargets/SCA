import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  date,
  time,
  decimal,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ─── Enums ──────────────────────────────────────────────────────────────────
export const bookingStatus = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);
export const cancelledBy = pgEnum("cancelled_by", ["customer", "admin"]);
export const postStatus = pgEnum("post_status", ["draft", "published"]);

// ─── services ─────────────────────────────────────────────────────────────—
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  durationMinutes: integer("duration_minutes").notNull().default(30),
  price: decimal("price", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── availability (per day of week) ──────────────────────────────————————————
export const availability = pgTable("availability", {
  id: uuid("id").defaultRandom().primaryKey(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sun ... 6=Sat
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isOpen: boolean("is_open").notNull().default(true),
  slotDurationMinutes: integer("slot_duration_minutes").notNull().default(30),
  maxBookingsPerSlot: integer("max_bookings_per_slot").notNull().default(1),
});

// ─── blocked_periods (holidays / vacation) ──────————————————————————————————
export const blockedPeriods = pgTable("blocked_periods", {
  id: uuid("id").defaultRandom().primaryKey(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: varchar("reason", { length: 200 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── bookings ─────────————————————————————————————————————————————————————————
export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "restrict" }),
    date: date("date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    customerName: varchar("customer_name", { length: 100 }).notNull(),
    customerEmail: varchar("customer_email", { length: 200 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 30 }),
    notes: text("notes"),
    status: bookingStatus("status").notNull().default("confirmed"),
    cancelToken: uuid("cancel_token").notNull().defaultRandom(),
    cancelledAt: timestamp("cancelled_at"),
    cancelledBy: cancelledBy("cancelled_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("bookings_date_idx").on(t.date),
    index("bookings_status_idx").on(t.status),
    uniqueIndex("bookings_cancel_token_idx").on(t.cancelToken),
  ]
);

// ─── pages (CMS) ─────────————————————————————————————————————————————————————
export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  content: jsonb("content"),
  seoTitle: varchar("seo_title", { length: 200 }),
  seoDescription: varchar("seo_description", { length: 300 }),
  ogImage: varchar("og_image", { length: 500 }),
  isPublished: boolean("is_published").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: varchar("updated_by", { length: 100 }),
});

// ─── posts (blog / news) ─────————————————————————————————————————————————————
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  excerpt: text("excerpt"),
  content: jsonb("content"),
  featuredImage: varchar("featured_image", { length: 500 }),
  images: jsonb("images").$type<string[]>().default([]),
  seoTitle: varchar("seo_title", { length: 200 }),
  seoDescription: varchar("seo_description", { length: 300 }),
  status: postStatus("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── media ─────————————————————————————————————————————————————————————————————
export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: varchar("filename", { length: 300 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  sizeBytes: integer("size_bytes"),
  altText: varchar("alt_text", { length: 300 }),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  uploadedBy: varchar("uploaded_by", { length: 100 }),
});

// ─── contact_submissions ─────————————————————————————————————————————————————
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── settings (key-value) ─────————————————————————————————————————————————————
export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: jsonb("value"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Inferred types ─────————————————————————————————————————————————————————
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Availability = typeof availability.$inferSelect;
export type BlockedPeriod = typeof blockedPeriods.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Media = typeof media.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Setting = typeof settings.$inferSelect;
