import { PageHero } from "@/components/page-hero";
import { Clock, Gauge, ExternalLink, Banknote, PenLine, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const metadata = { title: "ACCA – Suriname College of Accountancy" };

const accordionItems: { title: string; content: ReactNode }[] = [
  {
    title: "ACCA's course to Chartered Certified Accountant (ACCA)",
    content: (
      <div className="space-y-3">
        <p>
          Three and a half year professional qualification to become Chartered Certified
          Accountant on post-bachelor level. Monitoring and advising are the main duties
          of an accountant. As an accountant you will interact with various organizations.
          You will be familiar with many companies and will be able to advise the company
          as well on how to increase financial performance. In addition to auditing
          accounts, you will be able to act as a confidant and adviser.
        </p>
        <p>
          As a certified accountant you can work for many companies, from sole trader to
          multinational. In large organizations your primary responsibilities are: the
          fairness of the management report and sound board, given to senior management
          and the board of directors, thus a very responsible job. In smaller
          organizations, you play a pivotal role: to provide financial-economic support
          and give advice. This goes beyond the annual accounts and tax returns. In other
          words, you will be gaining expertise in many financial areas, will be able to
          give advice when preparing a business plan or in a business takeover.
        </p>
      </div>
    ),
  },
  {
    title: "Course",
    content: (
      <p>
        The program offers many features and an excellent perspective. Obviously, you
        can become an (Internal) accountant, but you can also become a controller,
        general manager or a financial manager. More than 50 percent of qualified
        accountants do not work for an accounting firm. The course offers you the basic
        skills required for a variety of positions within companies such as, financial
        services, government and even non-profit institutions.
      </p>
    ),
  },
  {
    title: "Method",
    content: (
      <div className="space-y-3">
        <p>
          ACCA's Professional Qualification is offered in a modular form of three and a half
          years in Suriname.
        </p>
        <p>
          To make every step towards your future function efficiently as possible, we
          provide tuition by qualified financial professionals who will help you familiarize
          yourself with the practical work field that you will be engaging with in the future.
          The lectures are mostly in Dutch with due care to the English terminology.
        </p>
      </div>
    ),
  },
  {
    title: "Examination",
    content: (
      <div className="space-y-3">
        <p>
          Every three months, students under the supervision of expert teachers are
          prepared for two exams (papers).
        </p>
        <p>
          ACCA also makes distinction between CBE and PBE exams. CBE exams are
          computer based and can always be taken at a registered CBE center. The
          students receive the results for these exams immediately. An important part of
          the CBE questions are multiple choice. CBE exams are applicable for the first four
          papers of the ACCA course. SCA is the official ACCA Computer Based Exam
          Center in Suriname.
        </p>
        <p>
          The subjects starting from Performance Management (PM) are home-based
          session CBEs and administered four times a year in the months March, June,
          September and December.
        </p>
        <p>
          All questions regarding these exams you can directly address to ACCA, these are
          the rules from ACCA regarding examcentres.
        </p>
      </div>
    ),
  },
  {
    title: "Duration of course and lectures",
    content: (
      <p>
        The program is offered as a part-time modular course and will take three and a
        half years (3.5 years) to complete. Students should bear in mind that classes will
        be given two times a week in the evening, 18:00 – 20:30 hrs.
      </p>
    ),
  },
  {
    title: "Your result after the course",
    content: (
      <div className="space-y-3">
        <p>
          After completion of ACCA's Professional Qualification, you are theoretically and
          practically trained in all aspects of accountancy and well prepared for the
          professional field. Upon having completed the course you will be able to
          contribute to the financial policies of companies and in small businesses you will
          be the financial – economic adviser.
        </p>
        <p>
          After completing ACCA's Professional Qualification and achieving the necessary
          practice requirement you will be registered as a Chartered Certified Accountant
          (ACCA), which is a globally recognized profession.
        </p>
      </div>
    ),
  },
  {
    title: "Study",
    content: (
      <div className="space-y-3">
        <p>
          Each paper is accompanied with a course book and an exam practice kit that is
          fully organized under the supervision of ACCA. The syllabus is carefully compiled
          and are updated annually. The English language in the syllabus is quite clear; the
          topics are explained with examples and are at the end summarized.
          Furthermore, each chapter consists of exercises. In addition to the syllabus, each
          student is provided with additional information on which the exam will be based.
        </p>
        <p>
          If you have further enquiries please do contact us, a personal interview with the
          program coordinator can also be arranged.
        </p>
        <p>
          For an appointment we can be contacted on the following numbers:
        </p>
        <p>
          + 597 425 766 / +597 71 56 302 or you can send an email at{" "}
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
  { icon: Clock, label: "Length:", value: "3 years" },
  { icon: Gauge, label: "Effort:", value: "2-4 hours per week" },
  { icon: ExternalLink, label: "Exams:", value: "Computer base exams (CBE)" },
  { icon: Banknote, label: "Price:", value: "Download ACCA info sheet" },
  { icon: PenLine, label: "PER", value: "(PRACTICAL EXPERIENCE)" },
];

export default function ACCAQualificationPage() {
  return (
    <>
      <PageHero
        title="Association of Chartered Certified Accountants (ACCA)"
        backgroundImage="/home-banner-2.png"
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course photo */}
            <img
              src="/about-5-1024x531.png"
              alt="ACCA Students"
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
                  {label === "PER" && (
                    <a href="#" className="mt-1 text-xs text-sca-orange hover:underline">Read more</a>
                  )}
                </div>
              </div>
            ))}
            <div className="px-4 py-5 space-y-3">
              <a
                href="/ACCA-Info-sheet-2026.pdf"
                download
                className="flex items-center gap-2 w-full rounded bg-sca-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-sca-orange-dark transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0" />
                ACCA Info sheet
              </a>
              <a
                href="/ACCA-enrollment-form-26.pdf"
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
