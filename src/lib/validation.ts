import { z } from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ongeldige datum"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Ongeldige tijd"),
  customerName: z.string().trim().min(2, "Vul je naam in").max(100),
  customerEmail: z.string().trim().email("Ongeldig e-mailadres").max(200),
  customerPhone: z.string().trim().max(30).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional(),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Bericht is te kort").max(5000),
  company: z.string().max(0).optional(), // honeypot
});
export type ContactInput = z.infer<typeof contactSchema>;

export const serviceSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  durationMinutes: z.coerce.number().int().min(5).max(600),
  price: z.string().trim().optional().nullable(),
  currency: z.string().trim().length(3).default("USD"),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const availabilityRowSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  isOpen: z.boolean(),
  slotDurationMinutes: z.coerce.number().int().min(5).max(240),
  maxBookingsPerSlot: z.coerce.number().int().min(1).max(50),
});
export const availabilityUpdateSchema = z.object({
  rows: z.array(availabilityRowSchema).length(7),
});

export const blockedPeriodSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().trim().max(200).optional().or(z.literal("")),
});

export const postSchema = z.object({
  title: z.string().trim().min(1, "Titel is verplicht").max(200),
  slug: z
    .string()
    .trim()
    .max(200)
    .regex(/^[a-z0-9-]*$/, "Alleen kleine letters, cijfers en streepjes")
    .optional()
    .or(z.literal("")),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().trim().max(20000).optional().or(z.literal("")),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
});
