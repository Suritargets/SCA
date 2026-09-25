import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createLocalDb } from "./local";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "";

/** True when a real Neon/Postgres connection string is configured. */
export const dbReady = url.length > 0 && !url.includes("placeholder") && !url.includes("localhost:5432");

// Real Neon connection when configured, otherwise an embedded local Postgres
// (PGlite) for preview/dev — no external account needed. Run `npm run db:seed`
// once to apply migrations + demo data to the local database.
export const db = dbReady ? drizzle(neon(url), { schema }) : createLocalDb();

export * from "./schema";
