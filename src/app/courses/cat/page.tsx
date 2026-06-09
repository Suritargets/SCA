import { PageHero } from "@/components/page-hero";
import { Clock, Gauge, ExternalLink, Banknote, PenLine, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = { title: "CAT – Suriname College of Accountancy" };

const accordionItems: { title: string; content: ReactNode }[] = [
  {
    title: "ACCA's course to Certified Accounting Technician (CAT)",
    content: (
      <p>
        Two year professional qualification to become a Certified Accounting Technician. The CAT
        qualification provides a solid foundation in Finance &amp; Accounting, with which you will
        have the necessary knowledge and skills to fulfill an "accounting-support role".
      </p>
    ),
  },
  {
    title: "Foundation in Accountancy",
    content: (
      <p>
        Suriname College of Accountancy in cooperation with ACCA has provided the 'Foundation in
        Accountancy' program. This means the Certified Accounting Technician (CAT) qualification,
        offers you certificates and diplomas after every level has been completed. The knowledge
        gained from the practical content of FIA can be directly applied in the workplace and
        offers immediate benefits for existing and future employers.
      </p>
    ),
  },
  {
    title: "Method",
    content: (
      <div className="space-y-3">
        <p>
          ACCA's Accounting Technician is offered as a modular course in Suriname which can be
          completed in 18 months. Every four months, students are led by skilled tutors so that
          they can be prepared for two to three exams (papers).
        </p>
        <p>
          Students should bear in mind that an average of three times college a week would be
          required. Furthermore, study facilities such as a library and Wi-Fi internet are
          available to students attending classes at Suriname College of Accountancy.
        </p>
      </div>
    ),
  },
  {
    title: "Practice",
    content: (
      <div className="space-y-3">
        <p>
          ACCA's Certified Accounting Technician course requires that all students be adequately
          trained for their practical experience. Students perform their practical requirements at
          their workplace under supervision of a workplace mentor, who should be a certified
          accountant.
        </p>
        <p>
          The Foundation in Practical Experience Requirement (FPER) is a document which requires
          the student to perform certain tasks which are revised by the workplace mentor. These
          operations will be recorded in the FPER record and summary which can be accessed by the
          students through their myACCA account. Besides passing the exams, students must have
          completed the FPER for diploma eligibility.
        </p>
      </div>
    ),
  },
  {
    title: "Admission",
    content: (
      <div className="space-y-3">
        <p>You can enroll into ACCA's course for Certified Accounting Technician (CAT) with the following degrees:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>VWO</li>
          <li>HAVO</li>
          <li>IMEAO</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Exams",
    content: (
      <div className="space-y-4">
        <p>
          All CAT exams are computer-based (CBE) and can be taken on demand at ACCA-approved
          centres. Students register for their exams through their personal myACCA account and
          choose a convenient date at an approved test centre. Results are available immediately
          after completing the exam.
        </p>
        <p>
          Suriname College of Accountancy is a licensed CBE exam centre, allowing students to
          sit their exams on-site.
        </p>
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-foreground">Exam structure</p>
          <div className="overflow-hidden rounded border text-sm">
            <div className="grid grid-cols-2 bg-gray-100 px-3 py-2 font-semibold text-foreground">
              <span>Level</span>
              <span>Papers</span>
            </div>
            <div className="grid grid-cols-2 border-t px-3 py-2">
              <span className="font-medium">Introductory</span>
              <span className="text-muted-foreground">FA1 – Recording Financial Transactions<br />MA1 – Information Management</span>
            </div>
            <div className="grid grid-cols-2 border-t bg-gray-50 px-3 py-2">
              <span className="font-medium">Intermediate</span>
              <span className="text-muted-foreground">FA2 – Maintaining Financial Records<br />MA2 – Managing Costs and Finances</span>
            </div>
            <div className="grid grid-cols-2 border-t px-3 py-2">
              <span className="font-medium">Advanced</span>
              <span className="text-muted-foreground">FMA – Management Accounting<br />FFA – Financial Accounting<br />FAB – Accountant in Business</span>
            </div>
            <div className="grid grid-cols-2 border-t bg-gray-50 px-3 py-2">
              <span className="font-medium">Options <span className="text-xs font-normal">(choose 2)</span></span>
              <span className="text-muted-foreground">FTX – Foundations in Taxation<br />FFM – Foundations in Financial Management<br />FAU – Foundations in Audit</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Study",
    content: (
      <div className="space-y-4">
        <p>
          Each paper is accompanied by a study text and a practice &amp; revision kit that is
          fully organized under the supervision of ACCA. The syllabus is carefully compiled
          and is updated annually. The English language in the syllabus is clear; the theory
          is explained with examples and summarized (at the end of each chapter).
          Furthermore, in each chapter there are exercises. In addition to the syllabus,
          each student receives additional information for which the exam questions and
          answers from the final exams are treated.
        </p>
        <p>
          The curriculum consists of nine papers, below is the order in which papers are offered:
        </p>
        <div className="overflow-hidden rounded border text-sm">
          <div className="grid grid-cols-3 bg-gray-100 px-3 py-2 font-semibold text-foreground">
            <span>Paper</span>
            <span>Title</span>
            <span>Level</span>
          </div>
          <div className="grid grid-cols-3 border-t px-3 py-2">
            <span className="font-medium">FA1</span>
            <span className="text-muted-foreground">Recording Financial Transactions</span>
            <span className="text-muted-foreground">Introductory</span>
          </div>
          <div className="grid grid-cols-3 border-t bg-gray-50 px-3 py-2">
            <span className="font-medium">MA1</span>
            <span className="text-muted-foreground">Information Management</span>
            <span className="text-muted-foreground">Introductory</span>
          </div>
          <div className="grid grid-cols-3 border-t px-3 py-2">
            <span className="font-medium">FA2</span>
            <span className="text-muted-foreground">Maintaining Financial Records</span>
            <span className="text-muted-foreground">Intermediate</span>
          </div>
          <div className="grid grid-cols-3 border-t bg-gray-50 px-3 py-2">
            <span className="font-medium">MA2</span>
            <span className="text-muted-foreground">Managing Costs and Finances</span>
            <span className="text-muted-foreground">Intermediate</span>
          </div>
          <div className="grid grid-cols-3 border-t px-3 py-2">
            <span className="font-medium">FMA</span>
            <span className="text-muted-foreground">Management Accounting</span>
            <span className="text-muted-foreground">Advanced</span>
          </div>
          <div className="grid grid-cols-3 border-t bg-gray-50 px-3 py-2">
            <span className="font-medium">FFA</span>
            <span className="text-muted-foreground">Financial Accounting</span>
            <span className="text-muted-foreground">Advanced</span>
          </div>
          <div className="grid grid-cols-3 border-t px-3 py-2">
            <span className="font-medium">FAB</span>
            <span className="text-muted-foreground">Accountant in Business</span>
            <span className="text-muted-foreground">Advanced</span>
          </div>
          <div className="grid grid-cols-3 border-t bg-gray-50 px-3 py-2">
            <span className="font-medium">FTX / FFM / FAU</span>
            <span className="text-muted-foreground">Options (choose 2 of 3)</span>
            <span className="text-muted-foreground">Options</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Levels",
    content: (
      <div className="space-y-5 text-sm">
        <div className="space-y-1">
          <p className="font-bold text-foreground">Introductory level:</p>
          <p><span className="font-semibold">FA1</span>&nbsp;&nbsp;Recording Financial Transactions</p>
          <p><span className="font-semibold">MA1</span>&nbsp;&nbsp;Information Management</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Intermediate level:</p>
          <p><span className="font-semibold">FA2</span>&nbsp;&nbsp;Maintaining Financial Records</p>
          <p><span className="font-semibold">MA2</span>&nbsp;&nbsp;Managing Costs and Finances</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Advanced level:</p>
          <p><span className="font-semibold">FMA</span>&nbsp;&nbsp;Management Accounting</p>
          <p><span className="font-semibold">FFA</span>&nbsp;&nbsp;Financial Accounting</p>
          <p><span className="font-semibold">FAB</span>&nbsp;&nbsp;Accountant in Business</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-foreground">Options (two to be completed)</p>
          <p><span className="font-semibold">FTX</span>&nbsp;&nbsp;Foundations in Taxation</p>
          <p><span className="font-semibold">FFM</span>&nbsp;&nbsp;Foundations in Financial Management</p>
          <p><span className="font-semibold">FAU</span>&nbsp;&nbsp;Foundations in Audit</p>
        </div>
      </div>
    ),
  },
  {
    title: "Your result:",
    content: (
      <div className="space-y-4">
        <p>
          After successfully obtaining the necessary training and experience, the participant will
          bear the title CAT. If you have further enquiries please do contact us, a personal
          interview with the program coordinator can also be arranged.
        </p>
        <p>
          For an appointment we can be contacted on the following numbers:
        </p>
        <p>
          425 766 / 71 56 302 or you can send an email{" "}
          <a
            href="mailto:info@surinamecollegeofaccountancy.com"
            className="text-sca-orange hover:underline"
          >
            info@surinamecollegeofaccountancy.com
          </a>{" "}
          .
        </p>
      </div>
    ),
  },
];

const sidebarItems = [
  { icon: Clock, label: "Length:", value: "2 years" },
  { icon: Gauge, label: "Effort:", value: "2-4 hours per week" },
  { icon: ExternalLink, label: "Exams:", value: "Computer base exams (CBE)" },
  { icon: Banknote, label: "Price:", value: "Download CAT info sheet" },
  { icon: PenLine, label: "FPER", value: "(PRACTICAL EXPERIENCE FOR FOUNDATION LEVEL)" },
];

export default function CATPage() {
  return (
    <>
      <PageHero
        title="Certified Accounting Technician (CAT)"
        backgroundImage="/home-banner-2.png"
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course photo */}
            <img
              src="/about-3.png"
              alt="CAT Students"
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
                  {label === "FPER" && (
                    <a href="https://www.accaglobal.com/gb/en/student/practical-experience-per/practical-experience-foundation-level.html" target="_blank" rel="noopener noreferrer" className="mt-1 text-xs text-sca-orange hover:underline">Read more</a>
                  )}
                </div>
              </div>
            ))}
            <div className="px-4 py-5 space-y-3">
              <a
                href="/CAT-Info-sheet-26.pdf"
                download
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                CAT Info sheet
              </a>
              <a
                href="/CAT-Enrollment-form-26.pdf"
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
