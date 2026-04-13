import { PageHero } from "@/components/page-hero";
import { NewsGrid } from "@/components/news-grid";

export const metadata = { title: "News – Suriname College of Accountancy" };

export default function NewsPage() {
  return (
    <>
      <PageHero title="News updates" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <NewsGrid />
      </section>
    </>
  );
}
