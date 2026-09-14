"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger between each direct child (seconds) */
  stagger?: number;
  /** Y offset in px */
  y?: number;
  /** Animation duration */
  duration?: number;
  /** How much of the trigger must be visible (0–1) */
  start?: string;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  y = 28,
  duration = 0.7,
  start = "top 88%",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y, duration, start]);

  return (
    <div ref={ref} className={cn("[&>*]:opacity-0", className)}>
      {children}
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/** Single-block fade/slide-up on scroll */
export function Reveal({
  children,
  className,
  y = 24,
  duration = 0.75,
  delay = 0,
  start = "top 90%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}
