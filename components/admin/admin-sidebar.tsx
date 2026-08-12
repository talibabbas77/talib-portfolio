"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";
import { signOutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-content";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/case-studies", label: "Case studies", icon: BookOpen },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
] as const;

type AdminSidebarProps = {
  email?: string | null;
  mobileOpen?: boolean;
  onNavigate?: () => void;
};

export function AdminSidebar({
  email,
  mobileOpen = false,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass-panel fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(100%,16rem)] flex-col overflow-hidden border-r border-border/60 p-4 transition-transform duration-200 ease-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        "@[56rem]/admin:translate-x-0"
      )}
    >
      <div className="mb-6 shrink-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-brand">
          Admin
        </p>
        <p className="mt-1 text-lg font-bold">{siteConfig.name}</p>
        {email ? (
          <p className="mt-1 truncate text-xs font-medium text-muted-foreground">
            {email}
          </p>
        ) : null}
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain">
        {NAV.map((item) => {
          const active =
            "exact" in item && item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
                active
                  ? "bg-accent-brand/15 text-foreground"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 shrink-0 space-y-2 border-t border-border/60 pt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        >
          <Users className="h-4 w-4 shrink-0" />
          View site
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
