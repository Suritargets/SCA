import path from "path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

/**
 * Embedded Postgres (PGlite) used when no real DATABASE_URL is configured.
 * Persists to a local directory so admin edits and bookings survive restarts,
 * without needing Docker or any external account — purely for local preview.
 *
 * The client auto-queues operations until its WASM engine is ready, so it can
 * be constructed synchronously. Run `npm run db:seed` once beforehand to
 * apply migrations and load demo data.
 */
export function createLocalDb() {
  const client = new PGlite(path.join(process.cwd(), ".pglite-data"));
  return drizzle(client, { schema });
}

export type LocalDb = ReturnType<typeof createLocalDb>;

export async function migrateLocalDb(db: LocalDb) {
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  await migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
}
