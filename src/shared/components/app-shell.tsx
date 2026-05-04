"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { appRoutes } from "@/shared/constants/routes";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<
    "inicio" | "propostas" | "chapa" | null
  >(null);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["inicio", "propostas", "chapa"] as const;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) {
      return;
    }

    const initialTimer = window.setTimeout(() => {
      const initialHash = window.location.hash.replace("#", "");
      if (
        initialHash === "inicio" ||
        initialHash === "propostas" ||
        initialHash === "chapa"
      ) {
        setActiveSection(initialHash);
      } else {
        setActiveSection("inicio");
      }
    }, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        const topEntry = visibleEntries[0];

        if (!topEntry) {
          return;
        }

        const id = topEntry.target.id;
        if (id === "inicio" || id === "propostas" || id === "chapa") {
          setActiveSection(id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-30% 0px -45% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
    return () => window.clearTimeout(initialTimer);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
        <header className="sticky top-0 z-30 border-b border-border-soft/80 bg-background/90 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Logo da chapa Integra Psi"
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full border border-border-soft object-cover shadow-sm"
                priority
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold uppercase tracking-[0.18em] text-brand-green-dark">
                  Integra Psi
                </span>
                <span className="block truncate text-xs text-neutral-muted">
                  CA Silvia Lane
                </span>
              </span>
            </Link>
            <Link
              href="/#propostas"
              className="hidden rounded-full bg-brand-green-dark px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-green/20 transition hover:bg-brand-green md:inline-flex"
            >
              Veja as propostas
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-24 md:pb-10">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border-soft bg-surface-strong/94 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-16px_40px_rgba(31,37,34,0.08)] backdrop-blur-md md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
            {appRoutes.map((route) => {
              const Icon = route.icon;
              const isActive =
                (route.href === "/" && pathname === "/" && activeSection === "inicio") ||
                (route.href === "/#propostas" && pathname === "/" && activeSection === "propostas") ||
                (route.href === "/#chapa" && pathname === "/" && activeSection === "chapa");

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  target={route.href.startsWith("http") ? "_blank" : undefined}
                  rel={route.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[0.68rem] font-semibold transition ${
                    isActive
                      ? "bg-brand-green-light text-brand-green-dark"
                      : "text-neutral-muted hover:bg-brand-green-light/60 hover:text-brand-green-dark"
                  }`}
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
                  <span>{route.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
