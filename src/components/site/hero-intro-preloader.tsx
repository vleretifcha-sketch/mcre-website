"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { finalLines, heroImages, preloaderLines } from "@/lib/content";

type HeroIntroPreloaderProps = {
  onComplete?: () => void;
};

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function HeroIntroPreloader({ onComplete }: HeroIntroPreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      onComplete?.();
      document.body.style.overflow = "";
      return;
    }

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    const run = async () => {
      // Start as soon as the first frame is ready; load the rest during the sequence.
      const loaders = heroImages.map((image) => preload(image.src));
      await loaders[0];
      if (cancelled) return;
      void Promise.all(loaders);

      gsap.registerPlugin(CustomEase);
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

      ctx = gsap.context(() => {
        gsap.set(".text-line", { opacity: 0, color: "#4f4f4f" });
        gsap.set(".text-line-final", { opacity: 0 });
        gsap.set(".text-container-final", { opacity: 0 });
        gsap.set(wrappers, {
          visibility: "hidden",
          clipPath: "inset(100% 0 0 0)",
        });
        gsap.set(wrappers[0], { visibility: "visible" });
        gsap.set(imageContainer, {
          width: "min(360px, 68vw)",
          height: "min(460px, 54vh)",
          borderRadius: "16px",
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
          const shellW = root.clientWidth;
          const fontSizePx = Math.min(shellW * 0.1, 108);
          const textWidth = String(percentage).length * (fontSizePx * 0.55);
          const padding = 28;
          let leftPosition: string;
          if (percentage === 0) leftPosition = `${padding}px`;
          else if (percentage === 99)
            leftPosition = `${Math.max(padding, shellW - textWidth - padding)}px`;
          else {
            const availableWidth = Math.max(0, shellW - 2 * padding - textWidth);
            leftPosition = `${padding + (availableWidth * percentage) / 100}px`;
          }

          mainTl.add(`step${percentage}`, index * 0.8);
          mainTl.set(
            wrappers[index],
            { visibility: "visible" },
            `step${percentage}`,
          );
          mainTl.to(
            wrappers[index],
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.45,
              ease: "customEase",
            },
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
          {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          "expandFinal+=0.12",
        );
        mainTl.to(
          ".preloader-shell",
          {
            backgroundColor: "rgba(23,23,23,0.12)",
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

        mainTl.to(
          root,
          { opacity: 0, duration: 0.45, ease: "power2.out" },
          "expandFinal+=1.15",
        );
      }, root);
    };

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="preloader-shell noise-overlay absolute inset-x-4 top-3 bottom-3 z-30 flex items-center justify-center overflow-hidden rounded-[16px] bg-ink-black"
      aria-hidden
    >
      <div className="relative flex h-full w-full items-center justify-center px-0">
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
                alt=""
                className="h-full w-full object-cover"
                decoding="async"
                fetchPriority={image.id === "0" ? "high" : "low"}
              />
            </div>
          ))}
        </div>

        <div className="preloader-percentage absolute bottom-[5%] left-7 font-ui text-[clamp(3rem,9.5vw,6.5rem)] font-medium leading-none tracking-tight text-white [backface-visibility:hidden]">
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
  );
}
