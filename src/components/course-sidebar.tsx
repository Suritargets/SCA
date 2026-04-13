import { Clock, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

interface CourseSidebarProps {
  length: string;
  effort: string;
  exams: string;
  infoSheetLabel?: string;
}

export function CourseSidebar({
  length,
  effort,
  exams,
  infoSheetLabel,
}: CourseSidebarProps) {
  return (
    <div className="rounded-xl border bg-slate-50 p-6">
      <h3 className="mb-4 font-semibold text-sca-navy">Course Details</h3>
      <ul className="space-y-4 text-sm">
        <li className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-sca-orange" />
          <div>
            <p className="font-medium">Length</p>
            <p className="text-muted-foreground">{length}</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-sca-orange" />
          <div>
            <p className="font-medium">Effort</p>
            <p className="text-muted-foreground">{effort}</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-sca-orange" />
          <div>
            <p className="font-medium">Exams</p>
            <p className="text-muted-foreground">{exams}</p>
          </div>
        </li>
      </ul>
      <div className="mt-6 space-y-2">
        <Link
          href="/contact"
          className="block w-full rounded-md bg-sca-orange px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-sca-orange-dark"
        >
          Enrollment Form
        </Link>
      </div>
    </div>
  );
}
