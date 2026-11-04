import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob (production media storage)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // PGlite is a WASM-backed Postgres used for local preview (no DATABASE_URL
  // configured). Its internal asset resolution breaks when bundled, so it
  // must run via Node's native module loader instead.
  serverExternalPackages: ["@electric-sql/pglite"],
  experimental: {
    serverActions: {
      // Server Actions default to 1MB, far too small for photo/PDF uploads
      // in the blog editor and media library. Stay under Vercel's ~4.5MB
      // platform request-body ceiling.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
