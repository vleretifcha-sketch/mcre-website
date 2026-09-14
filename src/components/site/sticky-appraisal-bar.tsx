"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { CtaLink } from "./cta-button";

export function StickyAppraisalBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const appraisal = document.getElementById("appraisal");
      const footer = document.getElementById("site-footer");
      const pastHero = window.scrollY > 520;

      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 24
        : false;

      if (footerVisible) {
        setVisible(false);
        return;
      }

      if (!appraisal) {
        setVisible(pastHero);
        return;
      }

      const rect = appraisal.getBoundingClientRect();
      const appraisalInView = rect.top < window.innerHeight && rect.bottom > 80;
      setVisible(pastHero && !appraisalInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-paper/92 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3">
        <p className="font-ui text-[15px] text-charcoal">
          What&apos;s my property worth?
        </p>
        <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <CtaLink href="#appraisal" variant="primary" className="w-full sm:w-auto">
            Get an appraisal
          </CtaLink>
          <CtaLink
            href={site.phoneHref}
            variant="outline"
            arrow={false}
            className="w-full sm:w-auto"
          >
            {site.phone}
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
