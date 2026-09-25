"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Clock,
  Briefcase,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/kalender", label: "Kalender", icon: CalendarDays },
  { href: "/admin/afspraken", label: "Afspraken", icon: ClipboardList },
  { href: "/admin/beschikbaarheid", label: "Beschikbaarheid", icon: Clock },
  { href: "/admin/diensten", label: "Diensten", icon: Briefcase },
  { href: "/admin/paginas", label: "Pagina's", icon: FileText },
  { href: "/admin/blog", label: "Blog & nieuws", icon: Newspaper },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/contact", label: "Contact", icon: Inbox },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sca-orange/10 text-sca-orange"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
