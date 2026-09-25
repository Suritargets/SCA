import { db } from "./index";
import { posts } from "./schema";
import { newsItems } from "../lib/news-data";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

async function main() {
  console.log(`Migrating ${newsItems.length} static news items to the posts table…`);

  for (const item of newsItems) {
    const publishedAt = new Date(item.date);
    const slug = slugify(item.title);
    const images = item.images ?? (item.image ? [item.image] : []);
    const featuredImage = images[0] ?? null;

    await db
      .insert(posts)
      .values({
        slug,
        title: item.title,
        excerpt: null,
        content: { text: item.content ?? "" },
        featuredImage,
        images,
        status: "published",
        publishedAt: Number.isNaN(publishedAt.getTime()) ? new Date() : publishedAt,
      })
      .onConflictDoNothing();
  }

  console.log("✓ Migration complete. Static items now live in the database.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
