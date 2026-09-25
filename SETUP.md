# CMS Dashboard + Afspraken — Setup

Dit platform is gebouwd met **Next.js 16 · Drizzle · Neon (Postgres) · Clerk · Resend**.
Volg deze stappen om het lokaal en in productie te laten draaien.

## 1. Environment variabelen

Kopieer `.env.example` naar `.env.local` en vul de echte waarden in:

```bash
cp .env.example .env.local
```

| Variabele | Waar haal je die | Nodig voor |
|-----------|------------------|-----------|
| `DATABASE_URL` | [Neon](https://neon.tech) → project → *pooled* connection string | Database |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | [Clerk dashboard](https://dashboard.clerk.com) → API keys | Admin login |
| `RESEND_API_KEY` | [Resend](https://resend.com/api-keys) | E-mails |
| `EMAIL_FROM` | Adres op een in Resend geverifieerd domein | Afzender e-mails |
| `ADMIN_EMAIL` | Adres dat notificaties ontvangt | Booking/contact notificaties |
| `NEXT_PUBLIC_APP_URL` | Publieke URL (bijv. `https://…`) | Annuleerlinks in e-mails |

> Zonder `RESEND_API_KEY` worden e-mails naar de console gelogd i.p.v. verstuurd — de rest
> van de flow (boeken, contact) blijft werken. Zonder `DATABASE_URL` / Clerk-keys start de app niet.

## 2. Database migreren + seeden

```bash
npm run db:push     # schema naar Neon pushen (of: npm run db:migrate voor de SQL-migratie)
npm run db:seed     # voorbeelddiensten, openingstijden (ma–vr 9–17, za 9–12) en instellingen
```

Drizzle Studio om data te bekijken: `npm run db:studio`.

## 3. Admin-toegang instellen (Clerk)

1. Maak in het Clerk-dashboard een gebruiker aan (of laat jezelf registreren).
2. Open die gebruiker → **Public metadata** → voeg toe:
   ```json
   { "role": "admin" }
   ```
3. Alleen gebruikers met `role: "admin"` komen voorbij de middleware naar `/admin`.

Login: **`/admin/login`** → dashboard op **`/admin`**.

## 4. Draaien

```bash
npm run dev      # http://localhost:3000
npm run build && npm run start   # productie
```

## Wat zit erin

**Publiek**
- `/diensten` — dienstenoverzicht met prijs/duur
- `/boeken` — boeking in 4 stappen (dienst → datum/tijd → gegevens → bevestiging)
- `/boeken/annuleren?token=…` — zelf annuleren via de link in de bevestigingsmail
- `/contact` — contactformulier (+ e-mailbevestiging naar klant en admin)

**Admin (`/admin`)**
- Dashboard met stats + aankomende afspraken
- Kalender (agenda per dag) en afsprakenlijst met statusfilter + detail (bevestigen/afronden/annuleren)
- Beschikbaarheid: openingstijden per dag + geblokkeerde periodes
- Diensten (CRUD), Pagina's (CMS-teksten + SEO), Media (upload), Contactberichten (inbox)

## Productie-aandachtspunten

- **Media-opslag:** uploads gaan lokaal naar `public/uploads/` (werkt in dev, maar het bestandssysteem
  van Vercel is niet persistent). Zet in productie [Vercel Blob](https://vercel.com/docs/vercel-blob)
  of S3 in bij `uploadMedia`/`deleteMedia` in `src/app/admin/(dashboard)/actions.ts`. De
  `next.config.ts` staat Blob-domeinen al toe.
- **Double-booking:** de slotcheck gebeurt bij het aanmaken van de boeking. Voor 100% race-veiligheid
  bij hoge gelijktijdigheid is een DB-transactie met lock aan te raden (zie PRD §11).
- **Reminder-mails / cron** (24u vooraf) staan nog op de backlog (PRD BK-11).
