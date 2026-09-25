import { db, dbReady } from "./index";
import { migrateLocalDb, type LocalDb } from "./local";
import * as schema from "./schema";

async function main() {
  if (!dbReady) {
    console.log("Geen DATABASE_URL geconfigureerd — migreert lokale PGlite-database…");
    await migrateLocalDb(db as LocalDb);
  }

  console.log("Seeding database…");

  // Services (SCA offers course intakes / info consults)
  const insertedServices = await db
    .insert(schema.services)
    .values([
      {
        name: "Gratis studieadvies",
        description:
          "Vrijblijvend kennismakingsgesprek over de ACCA-, CAT-, NIVE- en CISA-opleidingen.",
        durationMinutes: 30,
        price: null,
        currency: "USD",
        sortOrder: 1,
      },
      {
        name: "Inschrijfgesprek ACCA / CAT",
        description: "Persoonlijk gesprek om je inschrijving en planning door te nemen.",
        durationMinutes: 45,
        price: "0.00",
        currency: "USD",
        sortOrder: 2,
      },
      {
        name: "CISA informatiesessie",
        description: "Individuele toelichting op de CISA-certificering en het lesrooster.",
        durationMinutes: 60,
        price: "0.00",
        currency: "USD",
        sortOrder: 3,
      },
    ])
    .onConflictDoNothing()
    .returning();

  // Availability: Mon–Fri 09:00–17:00, Sat 09:00–12:00
  const weekdays = [1, 2, 3, 4, 5].map((d) => ({
    dayOfWeek: d,
    startTime: "09:00",
    endTime: "17:00",
    isOpen: true,
    slotDurationMinutes: 30,
    maxBookingsPerSlot: 1,
  }));
  await db
    .insert(schema.availability)
    .values([
      ...weekdays,
      {
        dayOfWeek: 6,
        startTime: "09:00",
        endTime: "12:00",
        isOpen: true,
        slotDurationMinutes: 30,
        maxBookingsPerSlot: 1,
      },
      {
        dayOfWeek: 0,
        startTime: "09:00",
        endTime: "12:00",
        isOpen: false,
        slotDurationMinutes: 30,
        maxBookingsPerSlot: 1,
      },
    ])
    .onConflictDoNothing();

  // Settings
  await db
    .insert(schema.settings)
    .values([
      { key: "site_name", value: "Suriname College of Accountancy" },
      {
        key: "contact",
        value: {
          address: "Henck Arronstraat 134, Paramaribo, Suriname",
          phone: "+597 425766",
          email: "info@surinamecollegeofaccountancy.com",
        },
      },
    ])
    .onConflictDoNothing();

  // Demo bookings + contact submissions + a blog post, so the admin dashboard
  // and public site show something realistic right away.
  const services = insertedServices.length
    ? insertedServices
    : await db.select().from(schema.services);

  if (services.length > 0) {
    const today = new Date();
    const iso = (offsetDays: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offsetDays);
      return d.toISOString().slice(0, 10);
    };

    await db
      .insert(schema.bookings)
      .values([
        {
          serviceId: services[0].id,
          date: iso(1),
          startTime: "10:00",
          endTime: "10:30",
          customerName: "Naomi Redan",
          customerEmail: "naomi.redan@example.com",
          customerPhone: "+597 8812345",
          notes: "Interesse in ACCA-traject na CAT.",
          status: "confirmed",
        },
        {
          serviceId: services[1]?.id ?? services[0].id,
          date: iso(2),
          startTime: "13:30",
          endTime: "14:15",
          customerName: "Dhiren Autar",
          customerEmail: "dhiren.autar@example.com",
          customerPhone: "+597 8756432",
          status: "pending",
        },
        {
          serviceId: services[services.length - 1].id,
          date: iso(-3),
          startTime: "09:30",
          endTime: "10:30",
          customerName: "Fatima Bhagwandin",
          customerEmail: "fatima.b@example.com",
          status: "completed",
        },
      ])
      .onConflictDoNothing();
  }

  await db
    .insert(schema.contactSubmissions)
    .values([
      {
        name: "Marlon Wijngaarde",
        email: "marlon.w@example.com",
        phone: "+597 8899001",
        message: "Wat zijn de kosten voor de QT-opleiding en wanneer start de volgende lichting?",
        isRead: false,
      },
      {
        name: "Priscilla Oosterling",
        email: "priscilla.o@example.com",
        message: "Kan ik mijn CAT-diploma laten waarderen voor vrijstellingen bij ACCA?",
        isRead: true,
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(schema.pages)
    .values([
      {
        slug: "over-ons",
        title: "Over ons",
        content: { type: "doc", content: [] },
        seoTitle: "Over Suriname College of Accountancy",
        seoDescription: "Officiële tuition provider voor ACCA, NIVE en ISACA in Suriname.",
        isPublished: true,
      },
    ])
    .onConflictDoNothing();

  console.log("✓ Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
