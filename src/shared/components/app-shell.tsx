"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { appRoutes } from "@/shared/constants/routes";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
        <header className="sticky top-0 z-30 border-b border-border-soft/80 bg-background/90 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-green text-sm font-black text-white">
                IP
              </span>
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
              className="hidden rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-green/20 transition hover:bg-brand-green-dark md:inline-flex"
            >
              Ver propostas
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-24 md:pb-10">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border-soft bg-surface-strong/94 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-16px_40px_rgba(31,37,34,0.08)] backdrop-blur-md md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
            {appRoutes.map((route) => {
              const Icon = route.icon;
              const isActive =
                pathname === route.href ||
                (route.href === "/" && pathname === "/");

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
