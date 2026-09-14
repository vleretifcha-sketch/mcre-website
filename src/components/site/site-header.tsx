"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { CtaLink } from "./cta-button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-parchment/95 backdrop-blur-md transition-shadow",
        mounted && scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.06)]",
      )}
    >
      {/* Same inset as hero (mx-4) so logo / Contact flush with hero edges */}
      <div className="relative flex items-center justify-between px-4 py-4">
        <a
          href="#top"
          className="relative z-10 shrink-0"
          aria-label={site.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={site.name}
            width={181}
            height={30}
            className="h-5 w-auto sm:h-6"
          />
        </a>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
          {navItems.map((item) => {
            const hasMenu = item.items.length > 1;

            if (!hasMenu) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 font-ui text-[15px] font-medium tracking-[-0.01em] text-charcoal transition hover:text-graphite"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-1 px-3 font-ui text-[15px] font-medium tracking-[-0.01em] text-charcoal transition hover:text-graphite"
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </button>

                {openMenu === item.label && (
                  <div className="absolute top-full left-1/2 pt-2 -translate-x-1/2">
                    <div className="min-w-[240px] overflow-hidden rounded-2xl border border-mist bg-paper p-2 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                      {item.items.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-linen"
                        >
                          <span className="block font-ui text-[14px] font-medium text-graphite">
                            {sub.label}
                          </span>
                          <span className="mt-0.5 block font-ui text-[13px] text-ash">
                            {sub.benefit}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <CtaLink
            href="#contact"
            variant="primary"
            arrow={false}
            className="hidden !min-h-10 !rounded-xl !px-4 !py-2 !text-[14px] sm:inline-flex"
          >
            Contact
          </CtaLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-graphite md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-mist px-4 pb-4 md:hidden">
          {navItems.map((item) =>
            item.items.length <= 1 ? (
              <a
                key={item.label}
                href={item.href}
                className="block border-b border-mist py-3 font-ui text-[15px] font-medium text-graphite last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <div key={item.label} className="border-b border-mist py-3 last:border-0">
                <p className="px-1 font-ui text-[13px] font-medium text-ash">
                  {item.label}
                </p>
                <div className="mt-1">
                  {item.items.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="block rounded-xl px-2 py-2.5 font-ui text-[15px] text-graphite"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            ),
          )}
          <CtaLink
            href="#contact"
            variant="primary"
            arrow={false}
            className="mt-3 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </CtaLink>
        </div>
      )}
    </header>
  );
}
