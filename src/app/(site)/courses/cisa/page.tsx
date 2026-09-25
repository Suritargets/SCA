import { PageHero } from "@/components/page-hero";
import { Clock, Gauge, ExternalLink, Banknote, PenLine, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = { title: "CISA – Suriname College of Accountancy" };

const accordionItems: { title: string; content: ReactNode }[] = [
  {
    title: "Certified Information Systems Auditor (CISA)",
    content: (
      <p>
        On August 1, 2011, the Suriname College of Accountancy launched the globally recognized
        course &ldquo;Certified Information Systems Auditor&rdquo;. This course for IS auditors in
        Suriname is offered as a one and a half year part-time course and is completely based on the
        curriculum of ISACA.
      </p>
    ),
  },
  {
    title: "What is ISACA",
    content: (
      <p>
        ISACA was founded in 1967, originally as a professional organization for IS auditors, with
        an aim of elevating the role of IT governance, IT auditing, information security and risk
        management automation, to a higher level of professionalism. The institute has over 95,000
        members in 160 countries.
      </p>
    ),
  },
  {
    title: "What does an IS auditor do?",
    content: (
      <div className="space-y-3">
        <p>
          IT auditing is a specialized function concerned with assessing the automation of the
          organization and the organization of automation. IT auditing is a specialty within the
          auditing profession. This specialty is increasingly requested for the performance of audits.
        </p>
        <p>
          In recent decades, IT auditing has expanded to build the relationship with business and
          ICT. The reason for the emergence of the field is the increasing degree of automation.
          Because of administrative processes within automated information systems increasing
          enormously, an accountant can now receive more satisfactory assurance concerning the
          reliability of financial reporting of organizations. The understanding of automated
          information systems requires knowledge other than just business and administrative
          organization knowledge.
        </p>
      </div>
    ),
  },
  {
    title: "Professional Qualification",
    content: (
      <div className="space-y-3">
        <p>
          Students who take the CISA Professional Qualification are guided by expert teachers and
          professionals who are skilled in all knowledge areas of IS audit and IS Governance.
        </p>
        <p>
          After completion of CISA Professional Qualification and a rounded practice requirement
          students can be registered as Certified Information Systems Auditor (CISA), which is a
          global professional recognition.
        </p>
      </div>
    ),
  },
  {
    title: "Admission Requirements",
    content: (
      <p>
        This program is designed for professionals with 5 years of IS audit, control, assurance or
        security work experience.
      </p>
    ),
  },
  {
    title: "Examination",
    content: (
      <div className="space-y-3">
        <p>The exam will be administered remotely (online from any location).</p>
        <p>
          In addition to successfully passing the theory test, the candidate must meet the following
          conditions to obtain the professional CISA:
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>proven relevant experience in IT auditing, IT security and control;</li>
          <li>compliance with ISACA&rsquo;s Code of Professional Ethics;</li>
          <li>comply with the requirement of continuing education.</li>
        </ol>
        <p>The CISA Curriculum consists of the following five areas:</p>
        <ol className="ml-5 list-decimal space-y-1 uppercase text-xs font-semibold tracking-wide">
          <li>Information Systems Auditing Process</li>
          <li>Governance and Management of IT</li>
          <li>Information Systems Acquisition, Development and Implementation</li>
          <li>Information Systems Operations and Business Resilience</li>
          <li>Protection of Information Assets</li>
        </ol>
      </div>
    ),
  },
  {
    title: "Study",
    content: (
      <div className="space-y-3">
        <p>
          In cooperation with the Nationale Ontwikkelingsbank, Finabank, Hakrinbank and De
          Surinaamsche Bank, Suriname College of Accountancy was able to create a way for her
          students to receive study financing for their courses if necessary.
        </p>
        <p>
          The program is offered as a part-time modular course and will last for one year, a session
          lasts for two and a half hours.
        </p>
        <p>Do you have any questions concerning the information provided?</p>
        <p>
          Please do contact us and ask for a personal interview with the program coordinator.
        </p>
        <p>
          Call for an appointment on the number&nbsp;&nbsp;425 766/715 6302 or send an email to{" "}
          <a
            href="mailto:info@surinamecollegeofaccountancy.com"
            className="text-sca-orange hover:underline"
          >
            info@surinamecollegeofaccountancy.com
          </a>
        </p>
        <p>
          For more information on ISACA&rsquo;s IS Auditing website: www.isaca.org.
        </p>
      </div>
    ),
  },
];

const sidebarItems = [
  { icon: Clock, label: "Length:", value: "1 years" },
  { icon: Gauge, label: "Effort:", value: "5 hours per week" },
  { icon: ExternalLink, label: "Exams:", value: "Computer base exams (CBE)" },
  { icon: Banknote, label: "Price:", value: "Download CISA info sheet" },
  { icon: PenLine, label: "(PRACTICAL EXPERIENCE Requirement)", value: "" },
];

export default function CISAPage() {
  return (
    <>
      <PageHero
        title="Certified Information Systems Auditor (CISA)"
        backgroundImage="/cisa-header.png"
      />

      {/* ── MAIN CONTENT ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course photo */}
            <img
              src="/cisa-1024x531.png"
              alt="CISA Course"
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
                href="/CISA-brochure-2026.pdf"
                download="CISA-brochure-2026.pdf"
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                CISA Brochure
              </a>
              <a
                href="/Enrollment-form-CISA.pdf"
                download="Enrollment-form-CISA.pdf"
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
