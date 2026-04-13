import { PageHero } from "@/components/page-hero";
import { Clock, Gauge, ExternalLink, Banknote, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = { title: "Qualified Controller (QC) – Suriname College of Accountancy" };

const accordionItems: { title: string; content: ReactNode }[] = [
  {
    title: "Training for Qualified Controller (QC)",
    content: (
      <div className="space-y-3">
        <p>
          Two-year practical course to become a senior controller at post bachelor level.
        </p>
        <p>
          As a financial-economic specialist or controller, you will have a responsible
          position in your company, not only looking backwards but also to the future
          regarding financial policy development and communication. The practical
          training of Qualified Controller plays a role in the development of your field.
          As a senior controller you become a solid sparring partner at management level.
        </p>
      </div>
    ),
  },
  {
    title: "Training",
    content: (
      <p>
        You learn to give substance to a financial function in the (sub) top of medium
        and large businesses and organizations. The training is aimed at: making
        choices for financial policy from a strategic perspective, managing an
        organization from a team, taking responsibility for financial management. Also,
        you acquire knowledge of all disciplines within a company or organization. You
        will become fully familiar with planning and control, management information,
        external reporting, management accounting, regulatory, fiscal aspects, finance
        and internal control.
      </p>
    ),
  },
  {
    title: "Method",
    content: (
      <p>
        You will follow a practical program of two (2) years. The teachers keep
        theoretical lectures with examples from practice, followed by case studies. After
        the work material has been discussed; discussions take place and experiences
        are exchanged. Literature Studies and assignments are part of the program.
      </p>
    ),
  },
  {
    title: "Audience",
    content: (
      <p>
        The training is intended for Qualified Controller financials, who want to grow into
        a position as senior controller or acquire a controller function within a large
        company.
      </p>
    ),
  },
  {
    title: "Admission",
    content: (
      <div className="space-y-2">
        <p>Diploma</p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>a) HEAO BE,</li>
          <li>b) HEAO AA</li>
          <li>c) HEAO AC or diploma SPD – 3 years of relevant experience at college level.</li>
        </ol>
      </div>
    ),
  },
  {
    title: "Examination",
    content: (
      <p>
        Each semester ends with a written exam. The two (2) – year course ends with a
        final examination that consists of writing a thesis and oral defense thereof. The
        examinations are conducted 2 times per year and go beyond the teaching units.
      </p>
    ),
  },
  {
    title: "Diploma",
    content: (
      <p>
        If the final examination has been passed, you will receive the diploma Qualified
        Controller. You will be included in the Qualified Controller register and carry the
        official title Qualified Controller (QC)
      </p>
    ),
  },
  {
    title: "Study",
    content: (
      <p>
        NIVE training uses the latest study material, study 76 sessions spread over two
        (2) years.
      </p>
    ),
  },
  {
    title: "Cost",
    content: (
      <div className="space-y-3">
        <p>
          The totally cost for the two years course is EUR 10.000 including textbooks, thesis
          supervision and examination fees.
        </p>
        <p>
          In cooperation with the Nationale Ontwikkelingsbank, Finabank, Hakrinbank and
          De Surinaamsche Bank, Suriname College of Accountancy was able to create a
          way for her students to receive study financing for their courses if necessary.
        </p>
      </div>
    ),
  },
  {
    title: "Study program",
    content: (
      <div className="space-y-5 text-sm">
        <div className="space-y-1">
          <p className="font-bold text-foreground">Communications (module 0, 11 sessions)</p>
          <p>An important part is to know each other and team building. Also collegial consultation is discussed. The course also focuses on written and oral presentations. This is done in the form of practical exercises. Serving is also reflected in other modules as you are regularly invited to give a presentation. Written presentation is partly focused on writing the thesis.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Organization and Management (module 1, 14 sessions)</p>
          <p>In this module, various aspects in the field of organizational structures and operations are discussed all relevant information to the audit function. In this module the position of the controller is discussed in detail.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Administrative Information (Module 2, 8 sessions)</p>
          <p>You will be familiarized with the structure of business processes and internal controls. As a controller, you will be taught how to develop systems in which you can capture, process and deliver information that the board would be capable of using for internal and external accountability.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">External Reporting (Module 3A, 8 sessions)</p>
          <p>This module allows you to become acquainted with the Dutch and international laws and regulations in the field of reporting by companies and organizations for profit. Also engrossed in the practical application.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Financial Management (module 3B, 11 sessions)</p>
          <p>You will learn to translate corporate objectives into financial terms. Both the thinking in costs and revenues as the examination of cash flows is important. Each risk and return must be re-weighed.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Management Accounting (module 3C, 8 sessions)</p>
          <p>Using case studies elaborates on various aspects of management accounting and management control. Profit and cost responsibility, transfer pricing, planning and control cycle and whether or not indirect costs are passed on offer. Attention is also paid to the assessment of managers and ethical dilemmas in this regard.</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Company Features (module 4, 16 sessions)</p>
          <p>You will gain insight into tasks and discipline of officers and various other business interests at play within organizations. This knowledge will strengthen your contribution to the management team. You will also be introduced to production, purchasing and logistics, marketing and human resource management.</p>
        </div>
        <div className="space-y-2 pt-2 border-t">
          <p>If you have further enquiries please do contact us, a personal interview with the program coordinator can also be arranged.</p>
          <p>
            For an appointment we can be contacted on the following numbers: 425 766 / 71 56 302 or you can send an email{" "}
            <a
              href="mailto:info@surinamecollegeofaccountancy.com"
              className="text-sca-orange hover:underline"
            >
              info@surinamecollegeofaccountancy.com
            </a>
            .
          </p>
        </div>
      </div>
    ),
  },
];

const sidebarItems = [
  { icon: Clock, label: "Length:", value: "2 years" },
  { icon: Gauge, label: "Effort:", value: "2-4 hours per week" },
  { icon: ExternalLink, label: "Exams:", value: "Written exam" },
  { icon: Banknote, label: "Price:", value: "Download QC info sheet" },
];

export default function QCPage() {
  return (
    <>
      <PageHero
        title="Qualified Controller (QC)"
        backgroundImage="/home-banner-2.png"
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course photo */}
            <img
              src="/smiling-afro-woman-in-blazer-wear-glasses-sitting-at-laptop-computer-at-home-office-dreaming-about_t20_0XVnx2-1024x682.jpg"
              alt="QC Students"
              className="w-full rounded-lg object-cover"
            />

            <h2 className="text-2xl font-bold text-foreground">About this course.</h2>

            {/* Accordion */}
            <div className="divide-y border rounded-md overflow-hidden">
              {accordionItems.map((item) => (
                <details key={item.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between bg-gray-50 px-4 py-3 text-sm font-medium text-foreground hover:bg-gray-100">
                    {item.title}
                    <span className="ml-2 text-lg font-light text-gray-500 group-open:hidden">+</span>
                    <span className="ml-2 text-lg font-light text-gray-500 hidden group-open:inline">−</span>
                  </summary>
                  <div className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                    {item.content}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-0 divide-y border rounded-md overflow-hidden self-start">
            {sidebarItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 px-4 py-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                  {value && <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>}
                </div>
              </div>
            ))}
            <div className="px-4 py-5 space-y-3">
              <a
                href="/QC-brochure-website-2023.pdf"
                download
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                QC Brochure
              </a>
              <a
                href="/QC-inschrijfformulier.pdf"
                download
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                Enrollment Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
