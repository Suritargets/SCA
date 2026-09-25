import { eq, desc } from "drizzle-orm";
import { db, posts, type Post } from "@/db";
import type { NewsItem } from "@/lib/news-data";

function contentText(content: unknown): string {
  if (content && typeof content === "object" && "text" in content) {
    return String((content as { text: unknown }).text ?? "");
  }
  return "";
}

export function postToNewsItem(post: Post): NewsItem {
  const dateSource = post.publishedAt ?? post.createdAt;
  const images = (post.images ?? []).filter(Boolean);
  return {
    title: post.title,
    date: dateSource.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    // Single image uses the simple `image` field; 2+ images render as a gallery in the modal.
    image: images.length <= 1 ? images[0] ?? post.featuredImage ?? undefined : undefined,
    images: images.length > 1 ? images : undefined,
    content: contentText(post.content) || post.excerpt || "",
  };
}

/** Published blog posts from the admin dashboard, newest first. Empty on DB error. */
export async function getPublishedNewsItems(): Promise<NewsItem[]> {
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt));
    return rows.map(postToNewsItem);
  } catch {
    return [];
  }
}
