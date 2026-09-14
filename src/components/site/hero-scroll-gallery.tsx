"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/content";
import { CtaLink } from "@/components/site/cta-button";
import { HeroIntroPreloader } from "@/components/site/hero-intro-preloader";
import { cn } from "@/lib/utils";

const GAP = 16;
const PAD = 16;

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    alt: "Commercial office corridor",
    label: "Little Collins",
  },
  {
    src: "/hero/office-interior.jpg",
    alt: "Executive commercial office",
    label: "Melbourne CBD",
    hero: true,
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    alt: "Meeting room interior",
    label: "Queen Street",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    alt: "Glass office partitions",
    label: "Collins Street",
  },
  {
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
    alt: "Open plan workspace",
    label: "Bourke Street",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    alt: "CBD glass towers",
    label: "CBD skyline",
  },
];

const HERO_INDEX = GALLERY.findIndex((g) => g.hero);

export function HeroScrollGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [introDone, setIntroDone] = useState(false);
  const onIntroComplete = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    if (!introDone) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!root || !track || !copy) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const heroCard = cards[HERO_INDEX];
    if (!heroCard) return;
    const sideCards = cards.filter((_, i) => i !== HERO_INDEX);

    const isMobile = window.innerWidth < 768;
    const contentW = () => root.clientWidth - PAD * 2;

    /** Keep the hero card optically centered in the padded viewport. */
    const centerHeroX = () => {
      const heroCenter =
        heroCard.offsetLeft + heroCard.offsetWidth / 2;
      const viewCenter = contentW() / 2;
      return viewCenter - heroCenter;
    };

    const endScrollX = () => -Math.max(0, track.scrollWidth - contentW());

    const setSides = (show: boolean) => {
      sideCards.forEach((el) => {
        el.style.display = show ? "block" : "none";
      });
      if (!show) {
        gsap.set(track, { gap: 0 });
      }
    };

    const HEADER = () =>
      document.querySelector("header")?.getBoundingClientRect().height ?? 72;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(copy, { opacity: 0, pointerEvents: "none" });
        setSides(true);
        gsap.set(track, { x: 0, gap: GAP });
        document.body.style.overflow = "";
        return;
      }

      gsap.set(track, { x: 0, gap: 0 });
      setSides(false);
      gsap.set(copy, { opacity: 1, y: 0, clearProps: "pointerEvents" });
      gsap.set(heroCard, {
        width: contentW(),
        height: isMobile
          ? Math.min(window.innerHeight * 0.62, 520)
          : root.clientHeight - 24,
        borderRadius: 16,
      });

      const endW = () =>
        isMobile
          ? Math.min(root.clientWidth * 0.78, 340)
          : Math.min(root.clientWidth * 0.52, 720);
      const endH = () =>
        isMobile
          ? Math.min(window.innerHeight * 0.48, 380)
          : Math.min(window.innerHeight * 0.58, 480);
      const sideW = () =>
        isMobile
          ? Math.min(root.clientWidth * 0.78, 340)
          : Math.min(root.clientWidth * 0.22, 280);

      // Timeline beats (seconds) — used to derive progress thresholds.
      const tShrink = 0.48;
      const tSides = 0.42;
      const tScroll = 0.8;
      const shrinkAt = 0.02;
      const sidesAt = shrinkAt + tShrink * 0.55;
      const scrollAt = sidesAt + tSides;
      const total = scrollAt + tScroll;
      const sidesProgress = sidesAt / total;
      const scrollProgress = scrollAt / total;
      const copyGoneAt = 0.1;

      const fullHeroH = () =>
        isMobile
          ? Math.min(window.innerHeight * 0.62, 520)
          : root.clientHeight - 24;

      const resetResting = () => {
        setSides(false);
        gsap.set(track, { x: 0, gap: 0 });
        gsap.set(heroCard, {
          width: contentW(),
          height: fullHeroH(),
          borderRadius: 16,
        });
        gsap.set(copy, { opacity: 1, y: 0 });
      };

      const syncCopy = (progress: number) => {
        if (progress <= 0.001) {
          gsap.set(copy, { opacity: 1, y: 0 });
          return;
        }
        const t = Math.min(1, progress / copyGoneAt);
        gsap.set(copy, {
          opacity: 1 - t,
          y: t * (isMobile ? 20 : 36),
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-gallery",
          trigger: root,
          start: () => `top ${HEADER()}px`,
          end: () =>
            `+=${Math.round(window.innerHeight * (isMobile ? 2.2 : 2.8))}`,
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            if (self.pin) {
              (self.pin as HTMLElement).style.top = `${HEADER()}px`;
            }
            const raw = gsap.utils.clamp(
              0,
              1,
              (self.scroll() - self.start) / (self.end - self.start || 1),
            );
            if (raw <= 0.002) {
              self.animation?.progress(0);
              resetResting();
              return;
            }
            syncCopy(raw);
            if (raw >= shrinkAt / total && raw < scrollProgress) {
              gsap.set(track, { x: centerHeroX() });
            }
          },
          onUpdate: (self) => {
            if (self.pin && self.isActive) {
              (self.pin as HTMLElement).style.top = `${HEADER()}px`;
            }

            // Raw scroll (not scrubbed) — kills lag that left hero offset/faded.
            const raw = gsap.utils.clamp(
              0,
              1,
              (self.scroll() - self.start) / (self.end - self.start || 1),
            );

            if (raw <= 0.002) {
              self.animation?.progress(0);
              resetResting();
              return;
            }

            syncCopy(raw);

            const showSides = self.progress >= sidesProgress;
            setSides(showSides);
            if (showSides) {
              gsap.set(track, { gap: GAP });
            } else {
              gsap.set(track, { gap: 0 });
            }

            // Only re-center once the hero has started shrinking.
            if (
              self.progress >= shrinkAt / total &&
              self.progress < scrollProgress
            ) {
              gsap.set(track, { x: centerHeroX() });
            }
          },
        },
      });

      // 1) Hero shrinks toward center (sides still hidden)
      tl.to(
        heroCard,
        {
          width: endW,
          height: endH,
          duration: tShrink,
          ease: "power2.inOut",
        },
        shrinkAt,
      );

      // 2) Side cards bloom around the centered hero
      tl.fromTo(
        sideCards,
        { opacity: 0, width: 0, height: endH },
        {
          opacity: 1,
          width: sideW,
          height: endH,
          borderRadius: 16,
          duration: tSides,
          ease: "power2.out",
        },
        sidesAt,
      );

      // 3) Horizontal pan from the centered position
      tl.fromTo(
        track,
        { x: () => centerHeroX() },
        { x: () => endScrollX(), duration: tScroll, ease: "none" },
        scrollAt,
      );
    }, root);

    // Pin spacer first, lock scroll position, then unlock body — avoids the jump.
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);

    const unlock = window.setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "";
    }, 60);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(unlock);
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.getById("hero-gallery")?.kill();
      document.body.style.overflow = "";
    };
  }, [introDone]);

  const titleLines = ["Specialists in", "Melbourne CBD"];

  return (
    <div
      ref={rootRef}
      className="relative flex h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-parchment px-4"
    >
      <div
        ref={trackRef}
        className="flex w-max min-w-full shrink-0 items-center will-change-transform"
        style={{ gap: 0 }}
      >
        {GALLERY.map((item, i) => (
          <figure
            key={item.src + i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-[16px] bg-zinc-900",
                item.hero
                  ? "block h-[calc(100svh-4.5rem-24px)] w-full"
                  : "hidden h-[min(58vh,480px)] w-[min(22vw,280px)]",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
            {item.hero ? (
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25"
                aria-hidden
              />
            ) : (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 pt-12">
                <span className="font-ui text-[13px] font-medium tracking-[-0.01em] text-white/90">
                  {item.label}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <div
        ref={copyRef}
        className="pointer-events-none absolute inset-x-4 bottom-8 z-10 sm:bottom-10 lg:bottom-12"
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h1 className="max-w-[12ch] font-ui text-[clamp(3.15rem,9.5vw,5.25rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white uppercase drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="flex w-full flex-col sm:max-w-md lg:pb-1">
            <p className="font-ui text-[15px] leading-relaxed tracking-[-0.01em] text-white/85 drop-shadow">
              {site.tagline}. Mandates for owners. Clarity for buyers and
              tenants.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <CtaLink
                href="#appraisal"
                variant="inverse"
                className="w-full sm:w-auto"
              >
                Get an appraisal
              </CtaLink>
              <CtaLink
                href="#properties"
                variant="blur"
                arrow
                className="w-full sm:w-auto"
              >
                Browse properties
              </CtaLink>
            </div>
          </div>
        </div>
      </div>

      <HeroIntroPreloader onComplete={onIntroComplete} />
    </div>
  );
}
