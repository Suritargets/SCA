import { PageHero } from "@/components/page-hero";
import { Clock, Gauge, ExternalLink, Banknote, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = { title: "Qualified Treasurer (QT) – Suriname College of Accountancy" };

const accordionItems: { title: string; content: ReactNode }[] = [
  {
    title: "Course for Qualified Treasurer (QT)",
    content: (
      <div className="space-y-4">
        <p className="font-semibold text-foreground uppercase tracking-wide">
          CREATING VALUE, UNLOCKING VALUE, AND PROTECTING VALUE
        </p>
        <p>
          The Qualified Treasurer (QT) is a practical, post-bachelor professional executive program designed for financial professionals working within corporations, banks, insurance companies, financial institutions, and government entities.
        </p>
        <p>
          The program focuses on financial decision-making regarding investments, corporate finance, liquidity management, treasury, and risk management. The central theme throughout the curriculum is how organizations can create value, unlock value, and protect value.
        </p>
        <p>
          The program bridges the gap between theory and practice by utilizing real-world case studies from corporations, banks, and insurers, with a distinct emphasis on Surinamese treasury and business practices.
        </p>
        <p>
          Participants will not only learn how to deploy financial instruments, but more importantly, how to strategically advise senior management on:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Value creation</li>
          <li>Cash &amp; liquidity management</li>
          <li>Funding &amp; capital structures</li>
          <li>Risk management and mitigation</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Method",
    content: (
      <div className="space-y-3">
        <p>
          Brief introductions are followed by practical examples. Practice and Cases
          (group) assignments are an important added value. Discussions which are
          invoked on the experience and knowledge of the participants and teachers.
        </p>
        <p>
          One of the tasks is to advise on working capital and cash management for a
          fictitious company. The program concludes with an overall case in which
          important aspects of the substance can be applied.
        </p>
      </div>
    ),
  },
  {
    title: "Audience",
    content: (
      <p>
        The Treasury Management course is designed for financials and treasurers and
        the banks, large corporations, business and government work.
      </p>
    ),
  },
  {
    title: "Admission",
    content: (
      <div className="space-y-3">
        <ul className="ml-5 list-disc space-y-1">
          <li>Bachelor&apos;s Degree in Business Economics or SPD</li>
          <li>Qualified Controller HOFAM</li>
          <li>Two (2) years in a treasury function</li>
        </ul>
        <p>College times will vary per module.</p>
      </div>
    ),
  },
  {
    title: "Examination",
    content: (
      <p>
        Each module is completed with a written exam. The course ends with a final
        examination that consists of writing a thesis and oral defense thereof.
      </p>
    ),
  },
  {
    title: "Curriculum",
    content: (
      <div className="space-y-6 text-sm">

        <div className="space-y-2">
          <p className="font-bold text-foreground">Module 1: Corporate Finance &amp; Value Creation</p>
          <p className="italic text-muted-foreground">Core Question: How do corporations, banks, and insurers create sustainable value?</p>
          <p className="font-semibold text-foreground">Value-Based Management</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Financial Mathematics (or Financial Arithmetic)</li>
            <li>Investment Analysis (Capital Budgeting)</li>
            <li>Cost of Capital &amp; Risk</li>
            <li>Capital Structure</li>
            <li>Business Valuation (Corporate Valuation)</li>
            <li>Credit Analysis</li>
            <li>Value Creation &amp; Optimization</li>
            <li>Mergers &amp; Acquisitions (M&amp;A)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-foreground">Module 2: Cash, Liquidity, Treasury &amp; Working Capital Management</p>
          <p className="italic text-muted-foreground">Core Question: How do organizations unlock value through the optimal management of cash flows and working capital?</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Treasury Fundamentals</li>
            <li>Treasury Policy (Treasury Statute)</li>
            <li>Cash Management</li>
            <li>Liquidity Management</li>
            <li>Working Capital Management</li>
            <li>Accounts Receivable Management (Credit Management)</li>
            <li>Accounts Payable Management</li>
            <li>Inventory Management</li>
            <li>Treasury Technology</li>
            <li>Recent Industry Developments (AI/Software)</li>
            <li>Practical Assignment</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-foreground">Module 3: Financial &amp; Enterprise Risk Management</p>
          <p className="italic text-muted-foreground">Core Question: How do organizations protect their value against financial and operational risks?</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Enterprise Risk Management (ERM)</li>
            <li>Financial Risks</li>
            <li>Interest Rate Risk Management</li>
            <li>FX Risk Management (Foreign Exchange Risk Management)</li>
            <li>Treasury Instruments</li>
            <li>Credit Risk Management</li>
            <li>Country Risk</li>
            <li>Operational Risk</li>
            <li>Banking &amp; Insurance</li>
            <li>Risk Reporting</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-foreground">Module 4: Integrated Practical Case Study</p>
          <p>Participants will work individually or in groups on a real-world business case, comprehensively applying the knowledge gained from the first three modules.</p>
          <p className="font-semibold text-foreground">The case study may focus on:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>A corporation</li>
            <li>A bank</li>
            <li>An insurance company</li>
            <li>A government organization</li>
          </ul>
          <p className="font-semibold text-foreground">Participants will formulate concrete recommendations regarding:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Value creation</li>
            <li>Corporate financing / funding</li>
            <li>Treasury</li>
            <li>Liquidity management</li>
            <li>Risk management</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-bold text-foreground">Module 5: Thesis &amp; Oral Examination</p>
          <p>The program concludes with a practice-oriented thesis based on a financial or treasury issue within the participant's own organization.</p>
          <p className="font-semibold text-foreground">The thesis includes:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Problem analysis</li>
            <li>Theoretical framework</li>
            <li>Empirical / practical research</li>
            <li>Proposed solutions</li>
            <li>Advisory &amp; implementation proposal</li>
          </ul>
          <p>Following the evaluation of the thesis, an oral examination will take place, during which the participant will defend their conclusions and recommendations before an examination board.</p>
        </div>

      </div>
    ),
  },
  {
    title: "Diploma",
    content: (
      <p>
        After completing the program you receive the Diploma in Treasury Management.
        You will be registered in the courses of NIVE and will be able to carry the official
        title Qualified Treasurer (QT).
      </p>
    ),
  },
  {
    title: "Study Material",
    content: (
      <p>
        NIVE Training uses the latest study material. Before the start of each module you
        will receive the material.
      </p>
    ),
  },
  {
    title: "Cost",
    content: (
      <div className="space-y-3">
        <p>
          The tuition fee is EUR 7.500 including books, thesis supervision and exam fee.
        </p>
        <p>
          In cooperation with the Nationale Ontwikkelingsbank, Finabank, Hakrinbank and
          De Surinaamsche Bank, Suriname College of Accountancy was able to create a
          way for her students to receive study financing for their courses if necessary.
        </p>
        <p>
          If you have further enquiries please do contact us, a personal interview with the
          program coordinator can also be arranged.
        </p>
        <p>
          For an appointment we can be contacted on the following numbers: 425 766 / 71 56 302
          or you can send an email{" "}
          <a
            href="mailto:info@surinamecollegeofaccountancy.com"
            className="text-sca-orange hover:underline"
          >
            info@surinamecollegeofaccountancy.com
          </a>
          .
        </p>
      </div>
    ),
  },
];

const sidebarItems = [
  { icon: Clock, label: "Length:", value: "1 year" },
  { icon: Gauge, label: "Effort:", value: "2-4 hours per week" },
  { icon: ExternalLink, label: "Exams:", value: "Written exam" },
  { icon: Banknote, label: "Price:", value: "Download QT info sheet" },
];

export default function QTPage() {
  return (
    <>
      <PageHero
        title="Qualified Treasurer (QT)"
        backgroundImage="/home-banner-2.png"
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course photo */}
            <img
              src="/smiling-afro-woman-in-blazer-wear-glasses-sitting-at-laptop-computer-at-home-office-dreaming-about_t20_0XVnx2-1024x682.jpg"
              alt="QT Students"
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
                href="/QT-brochure-website-2023.pdf"
                download
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                QT Brochure
              </a>
              <a
                href="/QT-inschrijfformulier.pdf"
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
