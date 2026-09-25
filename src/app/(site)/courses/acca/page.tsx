import Link from "next/link";

export const metadata = { title: "ACCA Courses – Suriname College of Accountancy" };

export default function ACCACoursesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden text-white flex items-end" style={{ minHeight: "180px" }}>
        <img
          src="/Background-copy.jpg"
          alt="ACCA Courses"
          className="absolute right-0 h-full w-auto max-w-none"
          style={{ top: 0, objectFit: "contain" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sca-orange/95 via-sca-orange/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 pt-28">
          <h1 className="text-4xl font-black uppercase tracking-wide md:text-5xl">
            ACCA Courses
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="mx-auto max-w-4xl px-6 py-14 space-y-8">

        {/* Choose ACCA */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-sca-navy leading-snug">
            Choose ACCA – and discover a world of opportunity
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            When you study with ACCA, you can take your career in any direction. You open doors to the
            best and most interesting roles all over the world. And you become one of the sought-after
            finance professionals our fast-changing world needs.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            It's a rewarding and intense path – and we're here to support you at every stage of your career.
          </p>
        </div>

        {/* Video section */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-sca-navy">
            Get a flying start to your business career with ACCA
          </h3>
          {/* YouTube embed — swap the src with the real video ID */}
          <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/j6TVEgU1xgA"
              title="Get a flying start to your business career with ACCA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Work anywhere */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-sca-navy">Work anywhere in the world</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We have a worldwide reputation for excellence and our rigorous qualifications are recognised
            and respected across the globe. When you join us, you become part of our diverse body of
            more than 219,000 members and 527,000 students in 179 countries.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/courses/cat"
            className="rounded border-2 border-sca-orange px-8 py-3 text-sm font-bold text-sca-orange uppercase tracking-widest hover:bg-sca-orange hover:text-white transition-colors"
          >
            Start with CAT
          </Link>
          <Link
            href="/courses/acca-qualification"
            className="rounded bg-sca-orange px-8 py-3 text-sm font-bold text-white uppercase tracking-widest hover:bg-sca-orange-dark transition-colors"
          >
            Start with ACCA
          </Link>
        </div>
      </section>

    </>
  );
}
