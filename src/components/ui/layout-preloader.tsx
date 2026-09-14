"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import {
  finalLines,
  heroImages,
  preloaderLines,
  site,
} from "@/lib/content";
import { CtaLink } from "@/components/site/cta-button";

gsap.registerPlugin(CustomEase);

type LayoutPreloaderProps = {
  onComplete?: () => void;
  /** Skip intro animation (e.g. for reduced-motion preference) */
  skipIntro?: boolean;
};

function ColumnGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[3] flex justify-between px-[4vw]"
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-full w-px bg-white/[0.12]"
        />
      ))}
    </div>
  );
}

export function LayoutPreloader({
  onComplete,
  skipIntro = false,
}: LayoutPreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(skipIntro);

  useEffect(() => {
    if (skipIntro) {
      onComplete?.();
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      onComplete?.();
      return;
    }

    CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
    CustomEase.create("blurEase", "0.25, 0.1, 0.25, 1");
    CustomEase.create("counterEase", "0.35, 0.0, 0.15, 1");
    CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1");

    const root = rootRef.current;
    if (!root) return;

    const percentageElement = root.querySelector<HTMLElement>(
      ".preloader-percentage",
    );
    const imageContainer = root.querySelector<HTMLElement>(".image-container");
    const wrappers = heroImages.map((img) =>
      root.querySelector<HTMLElement>(`#image-${img.id}`),
    );
    const finalImage = wrappers[wrappers.length - 1]?.querySelector("img");
    if (!percentageElement || !imageContainer || !finalImage) return;

    gsap.set(".hero-settle", { opacity: 0 });
    gsap.set(".hero-title-line", { y: "110%", opacity: 0 });
    gsap.set(".hero-meta", { opacity: 0, y: 12 });
    gsap.set(".hero-ctas", { opacity: 0, y: 16 });
    gsap.set(".hero-grid-lines", { opacity: 0 });
    gsap.set(".text-line", { opacity: 0, color: "#4f4f4f" });
    gsap.set(".text-line-final", { opacity: 0 });
    gsap.set(".text-container-final", { opacity: 0 });
    gsap.set(wrappers, { visibility: "hidden", clipPath: "inset(100% 0 0 0)" });
    gsap.set(wrappers[0], { visibility: "visible" });
    gsap.set(imageContainer, {
      width: "min(360px, 68vw)",
      height: "min(460px, 54vh)",
      borderRadius: "4px",
    });
    gsap.set(".image-wrapper img", {
      scale: 1.2,
      transformOrigin: "center center",
    });

    const percentages = [0, 20, 60, 80, 99];
    const mainTl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete?.();
        document.body.style.overflow = "";
      },
    });
    document.body.style.overflow = "hidden";

    mainTl.to(
      ".text-line",
      { opacity: 1, duration: 0.12, stagger: 0.05, ease: "gentleIn" },
      0.25,
    );
    mainTl.to(
      ".text-line",
      { color: "#fff", duration: 0.12, stagger: 0.05, ease: "blurEase" },
      "+=0.2",
    );

    percentages.forEach((percentage, index) => {
      const windowWidth = window.innerWidth;
      const fontSizePx = Math.min(windowWidth * 0.1, 108);
      const textWidth = String(percentage).length * (fontSizePx * 0.55);
      const padding = 28;
      let leftPosition: string;
      if (percentage === 0) leftPosition = `${padding}px`;
      else if (percentage === 99)
        leftPosition = `${windowWidth - textWidth - padding}px`;
      else {
        const availableWidth = windowWidth - 2 * padding - textWidth;
        leftPosition = `${padding + (availableWidth * percentage) / 100}px`;
      }

      mainTl.add(`step${percentage}`, index * 0.8);
      mainTl.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);
      mainTl.to(
        wrappers[index],
        { clipPath: "inset(0% 0 0 0)", duration: 0.45, ease: "customEase" },
        `step${percentage}`,
      );
      mainTl.to(
        percentageElement,
        {
          innerText: `${percentage}`,
          left: leftPosition,
          duration: 0.45,
          ease: "counterEase",
          snap: { innerText: 1 },
          onStart: () => {
            gsap.fromTo(
              percentageElement,
              { filter: "blur(8px)" },
              { filter: "blur(0px)", duration: 0.3, ease: "power2.inOut" },
            );
          },
        },
        `step${percentage}`,
      );
      if (index > 0) {
        mainTl.to(
          wrappers[index - 1],
          {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.3,
            ease: "customEase",
            onComplete: () =>
              gsap.set(wrappers[index - 1], { visibility: "hidden" }),
          },
          `step${percentage}+=0.08`,
        );
      }
    });

    mainTl.to(
      ".text-line",
      { opacity: 0, duration: 0.09, stagger: 0.03, ease: "counterEase" },
      "step99+=0.4",
    );

    mainTl.add("expandFinal", ">");
    mainTl.to(
      imageContainer,
      {
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        duration: 0.95,
        ease: "gentleIn",
      },
      "expandFinal+=0.12",
    );
    mainTl.to(
      finalImage,
      { scale: 1, duration: 0.95, ease: "gentleIn" },
      "expandFinal+=0.12",
    );
    mainTl.to(
      percentageElement,
      { opacity: 0, filter: "blur(10px)", duration: 0.28, ease: "power2.out" },
      "expandFinal+=0.12",
    );
    mainTl.to(
      ".preloader-shell",
      {
        backgroundColor: "rgba(23,23,23,0.15)",
        duration: 0.35,
        ease: "customEase",
      },
      "expandFinal+=0.28",
    );
    mainTl.to(
      ".text-container-final",
      { opacity: 1, duration: 0.08 },
      "expandFinal+=0.55",
    );
    mainTl.to(
      ".text-line-final",
      {
        opacity: 1,
        color: "#fff",
        duration: 0.09,
        stagger: 0.03,
        ease: "gentleIn",
      },
      "expandFinal+=0.6",
    );

    mainTl.to(".hero-settle", { opacity: 1, duration: 0.01 }, "expandFinal+=0.75");
    mainTl.to(
      ".hero-grid-lines",
      { opacity: 1, duration: 0.6, ease: "gentleIn" },
      "expandFinal+=0.78",
    );
    mainTl.to(
      ".hero-title-line",
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power4.out",
      },
      "expandFinal+=0.85",
    );
    mainTl.to(
      ".hero-meta",
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "customEase" },
      "expandFinal+=1.15",
    );
    mainTl.to(
      ".hero-ctas",
      { opacity: 1, y: 0, duration: 0.5, ease: "customEase" },
      "expandFinal+=1.25",
    );

    return () => {
      mainTl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete, skipIntro]);

  const titleLines = ["Specialists in", "Melbourne CBD"];

  return (
    <section
      ref={rootRef}
      className="relative isolate mx-4 mb-4 h-[min(72svh,calc(100svh-5.5rem-16px))] overflow-hidden rounded-2xl bg-ink-black sm:h-[calc(100svh-5.75rem-16px)]"
      aria-label="Hero"
    >
      {/* ── Preloader layer ── */}
      <div
        className={`preloader-shell noise-overlay absolute inset-0 z-20 flex items-center justify-center bg-ink-black transition-opacity duration-500 ${
          done ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="image-container relative overflow-hidden">
            {heroImages.map((image) => (
              <div
                key={image.id}
                id={`image-${image.id}`}
                className="image-wrapper absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="preloader-percentage absolute bottom-[5%] left-7 font-ui text-[clamp(3rem,9.5vw,6.5rem)] font-medium leading-none tracking-tight text-white">
            0
          </div>

          <div className="absolute top-1/2 right-6 hidden max-w-[220px] -translate-y-1/2 text-right md:block lg:right-10">
            {preloaderLines.map((line) => (
              <p
                key={line}
                className="text-line py-1 font-ui text-[11px] tracking-[0.06em] text-[#4f4f4f] uppercase"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="text-container-final absolute top-1/2 right-6 hidden max-w-[220px] -translate-y-1/2 text-right opacity-0 md:block lg:right-10">
            {finalLines.map((line) => (
              <p
                key={line}
                className="text-line-final py-1 font-ui text-[11px] tracking-[0.06em] text-[#4f4f4f] uppercase"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Settled cinematic hero ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImages[4].src}
          alt={heroImages[4].alt}
          className="h-full w-full scale-[1.02] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-ink-black/25 to-ink-black/30" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      <div className="hero-grid-lines absolute inset-0 z-[3] opacity-0">
        <ColumnGrid />
      </div>

      <div className="hero-settle relative z-10 flex h-full min-h-0 flex-col justify-end px-5 pb-8 sm:px-8 sm:pb-10 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h1 className="max-w-[12ch] font-ui text-[clamp(3.15rem,9.5vw,5.25rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white uppercase">
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span className="hero-title-line block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="flex w-full flex-col sm:max-w-md lg:items-start lg:pb-1">
            <p className="hero-meta font-ui text-[15px] leading-relaxed tracking-[-0.01em] text-white/80">
              {site.tagline}. Mandates for owners. Clarity for buyers and tenants.
            </p>
            <div className="hero-ctas mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <CtaLink href="#appraisal" variant="inverse" className="w-full sm:w-auto">
                Get an appraisal
              </CtaLink>
              <CtaLink href="#properties" variant="blur" arrow className="w-full sm:w-auto">
                Browse properties
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LayoutPreloader;
