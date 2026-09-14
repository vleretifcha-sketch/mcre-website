"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PathCardProps = {
  id: string;
  href: string;
  title: string;
  body: string;
  cta: string;
  image: string;
  stat: string;
  statLabel: string;
};

export function PathCard({
  id,
  href,
  title,
  body,
  cta,
  image,
  stat,
  statLabel,
}: PathCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      ref={cardRef}
      id={id}
      href={href}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onPointerMove={onMove}
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-[16px] sm:aspect-[5/4] md:min-h-[380px] md:aspect-auto",
        "md:cursor-none",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={70}
        className={cn(
          "object-cover transition-[filter] duration-700 ease-out",
          hovering ? "blur-[10px]" : "blur-0",
        )}
      />

      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          hovering ? "bg-black/55" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
        )}
      />

      {/* Center stat — desktop hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 hidden flex-col items-center justify-center px-6 text-center transition-opacity duration-400 md:flex",
          hovering ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="font-ui text-[clamp(3.5rem,8vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
          {stat}
        </p>
        <p className="mt-3 max-w-[16ch] font-ui text-[12px] font-medium tracking-[0.14em] text-white/90 uppercase sm:text-[13px]">
          {statLabel}
        </p>
      </div>

      {/* Glass cursor follower — desktop */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-black/30 px-4 py-2.5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md transition-opacity duration-200 md:inline-flex",
          hovering ? "opacity-100" : "opacity-0",
        )}
        style={{ left: pos.x, top: pos.y }}
      >
        <span className="font-ui text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap">
          {cta}
        </span>
        <ArrowUpRight className="size-3.5 shrink-0" strokeWidth={2} />
      </span>

      {/* Resting content — hidden on desktop hover */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-5 transition-opacity duration-400 sm:p-7",
          hovering ? "md:opacity-0" : "opacity-100",
        )}
      >
        <h3 className="font-ui text-[clamp(1.45rem,2.2vw,1.85rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-md font-ui text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
          {body}
        </p>
        {/* Mobile CTA — no custom cursor on touch */}
        <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-2.5 font-ui text-[15px] font-medium text-white backdrop-blur-md md:hidden">
          {cta}
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
    </a>
  );
}
