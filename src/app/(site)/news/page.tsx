import { PageHero } from "@/components/page-hero";
import { NewsGrid } from "@/components/news-grid";
import { getPublishedNewsItems } from "@/lib/posts";

export const metadata = { title: "News – Suriname College of Accountancy" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const items = await getPublishedNewsItems();

  return (
    <>
      <PageHero title="News updates" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <NewsGrid items={items} />
      </section>
    </>
  );
}
