"use client";

import { ArrowUpRight, Ruler, Tag } from "lucide-react";

export type PropertyCardData = {
  title: string;
  suburb: string;
  type: string;
  address: string;
  area: string;
  priceHint: string;
  image: string;
  variant?: "overlay" | "split";
};

function ProgressiveBlurScrim() {
  const layers = [
    { blur: 2, stop: "100%" },
    { blur: 6, stop: "72%" },
    { blur: 12, stop: "48%" },
    { blur: 20, stop: "28%" },
    { blur: 28, stop: "14%" },
  ] as const;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[70%]"
      aria-hidden
    >
      {layers.map(({ blur, stop }) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to top, black 0%, black 8%, transparent ${stop})`,
            WebkitMaskImage: `linear-gradient(to top, black 0%, black 8%, transparent ${stop})`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
    </div>
  );
}

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <article className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[16px] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)] sm:min-h-[380px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={property.image}
        alt={property.address}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <ProgressiveBlurScrim />

      <a
        href="#contact"
        className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
        aria-label={`Contact about ${property.title}`}
      >
        <ArrowUpRight className="size-4" strokeWidth={1.75} />
      </a>

      <div className="relative z-10 mt-auto flex flex-col gap-3 p-5 pt-16">
        <div>
          <h3 className="font-ui text-[1.65rem] font-semibold leading-tight tracking-[-0.03em] text-white drop-shadow-sm">
            {property.title}
          </h3>
          <p className="mt-0.5 font-ui text-[14px] text-white/90">{property.type}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-ui text-[13px] text-white/95">
          <span className="inline-flex items-center gap-1.5">
            <Tag className="size-3.5 opacity-90" strokeWidth={1.75} />
            {property.priceHint}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-3.5 opacity-90" strokeWidth={1.75} />
            {property.area}
          </span>
        </div>
      </div>
    </article>
  );
}
