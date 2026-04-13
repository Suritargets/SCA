import Link from "next/link";
import { BookOpen, BarChart3, Monitor, GraduationCap, Award, Globe } from "lucide-react";
import { NewsCarousel } from "@/components/news-carousel";
import { HeroGallery } from "@/components/hero-gallery";

const courseCards = [
  {
    icon: Monitor,
    title: "ACCA Courses",
    lines: ["Certified Accounting Technician (CAT)", "Association of Chartered Certified Accountants"],
    href: "/courses/acca",
  },
  {
    icon: BarChart3,
    title: "NIVE Courses",
    lines: ["Qualified Controller (QC)", "Qualified Treasurer (QT)"],
    href: "/courses/qc",
  },
  {
    icon: BookOpen,
    title: "ISACA Courses",
    lines: ["Certified Information Systems Auditor (CISA)"],
    href: "/courses/cisa",
  },
];


const stats = [
  { value: "2006", label: "Year Founded" },
  { value: "100+", label: "Total Students" },
  { value: "40+", label: "Job Guaranteed" },
];

const careerCards = [
  {
    icon: GraduationCap,
    title: "Globally Accredited Educations",
    text: "Professional educations in Accounting & Finance. With lecturers with professional experience in Accounting and Finance.",
  },
  {
    icon: Award,
    title: "Provider of ACCA, NIVE and ISACA educations",
    text: "Certified tuition provider of international qualifications well equipped for Professional educations in Accounting & Finance.",
  },
  {
    icon: Globe,
    title: "International Qualifications",
    text: "QT, QC, ACCA, CAT & CISA will give you the opportunity to work in more than 160 countries.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center px-6 py-16 md:py-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-sca-orange">
              Suriname College of Accountancy
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-sca-navy md:text-5xl">
              Forms your Future in Accounting &amp; Finance
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We hope that you will recognize our goal of knowledge sharing and our goal to actively
              disseminate 'what we know and do best' to our society. Our lecturers share the same
              philosophy and aim to strengthen business organizations and the government with their
              intellectual contributions.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our social contribution is to provide tuition on the highest level of education, mainly
              post-bachelor qualifications, forming the financial professionals in the field of
              accountancy and finance.
            </p>
          </div>
          {/* Right – photo gallery */}
          <div className="relative hidden min-h-[380px] md:block">
            <HeroGallery />
          </div>
        </div>
      </section>

      {/* ── COURSE CARDS ── */}
      <section className="bg-white pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {courseCards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col gap-3 rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded bg-sca-navy/10">
                <c.icon className="h-6 w-6 text-sca-navy" />
              </div>
              <h3 className="font-bold text-sca-navy group-hover:text-sca-orange transition-colors">
                {c.title}
              </h3>
              <div className="text-xs text-muted-foreground space-y-1">
                {c.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── NEWS UPDATES ── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-sca-navy">
            News updates
          </h2>
          <div className="px-6">
            <NewsCarousel />
          </div>
        </div>
      </section>

      {/* ── TOP 6 REASONS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 items-center">
          {/* Left */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-sca-navy leading-tight">
              Top 6 reasons to choose ACCA
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ACCA is the global body for professional accountants. By studying with ACCA, you will
              have the world's most progressive and supportive accountancy body driving your career
              towards amazing opportunities.
            </p>
            <Link
              href="/courses/acca"
              className="inline-block rounded bg-sca-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark"
            >
              READ MORE
            </Link>
          </div>
          {/* Right – YouTube embed */}
          <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/j5JVPMDswEE"
              title="Top 6 reasons to choose ACCA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE IN NUMBERS ── */}
      <section className="bg-white py-16 border-t border-b">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-sca-navy">The Marketplace in Numbers</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-6xl font-black text-sca-navy">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-5xl font-black text-sca-orange md:text-7xl">
            TESTIMONIALS
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-2 items-start">
            {/* Left – Vimeo video */}
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://player.vimeo.com/video/527964394"
                title="Suriname College of Accountancy Promo"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Right – group photo + caption */}
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden rounded-sm">
                <img
                  src="/web-gradute-1024x1024.jpg"
                  alt="SCA Graduates"
                  className="w-full object-cover"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We proudly present the graduate Qualified Treasurer: Candiacey Brewster and
                Qualified Controller: Narinderkumar Kewalapat. Congratulations on this milestone!
              </p>
            </div>
          </div>

          {/* Second testimonial row */}
          <div className="mt-10 grid gap-10 md:grid-cols-2 items-start">
            {/* Left – bordered testimonial box */}
            <div className="border border-blue-200 rounded-sm p-6 space-y-4">
              <p className="text-sm font-bold text-foreground">
                Testimonial – Qualified Treasurer
              </p>
              <blockquote className="text-sm italic leading-relaxed text-muted-foreground space-y-3">
                <p>"The Treasury course not only provided me with valuable knowledge about cash management, liquidity planning, and financial risks, but also boosted my confidence in making strategic financial decisions. Thanks to the practical approach and expert guidance, I now have a better understanding of how to efficiently manage and allocate financial resources within an organization.</p>
                <p>This course has given my career a strong boost and better prepared me for a responsible role in the financial field.</p>
                <p>I'm grateful for the insights and skills I gained during the course. They form a solid foundation for my continued professional development."</p>
              </blockquote>
              <p className="text-sm text-sca-orange">
                Jo-ann Paidondo – Qualified Treasurer
              </p>
            </div>

            {/* Right – graduation photos + caption */}
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden rounded-sm">
                <img
                  src="/Geslaagden-promo-foto-1024x768.jpg"
                  alt="SCA Geslaagden"
                  className="w-full object-cover"
                />
              </div>
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                Suriname now has 6 new Qualified Treasurers and 2 new Qualified Controllers!
                Congratulations to our graduates on reaching this significant milestone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR CAREER IN FINANCE ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-sca-navy">Your Career in Finance</h2>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
            To fulfill the need for financial professionals in Suriname, SCA is the official tuition
            provider for the following international educational bodies: Association of Chartered
            Certified Accountants (ACCA) and the NIVE &amp; ISACA.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {careerCards.map((c) => (
              <div key={c.title} className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sca-navy/10">
                  <c.icon className="h-6 w-6 text-sca-navy" />
                </div>
                <h3 className="font-bold text-sca-navy">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
