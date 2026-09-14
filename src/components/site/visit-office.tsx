"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const ACCENT = "#41a1cf";

export function VisitOfficeInteractive({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const mapSrc =
    "https://maps.google.com/maps?q=365%20Little%20Collins%20Street%20Melbourne&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <div
      id="office"
      className={cn(
        "flex w-full flex-col",
        embedded ? "h-full" : "items-center",
      )}
    >
      {!embedded && (
        <p className="font-ui text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
          Current location
        </p>
      )}

      <div
        className={cn(
          "w-full overflow-hidden bg-white",
          embedded
            ? "flex h-full flex-col rounded-2xl border border-zinc-200 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.2)] md:rounded-none md:border-0 md:border-l md:border-zinc-200 md:shadow-none"
            : "mt-5 rounded-2xl border border-zinc-200 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)]",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative block w-full flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-blue/40"
          aria-expanded={open}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden bg-[#f3f4f6]",
              embedded ? "h-[220px] sm:h-[260px] md:h-[280px]" : "h-[220px] sm:h-[240px]",
            )}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0,0,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.055) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />

            <div
              className="pointer-events-none absolute top-[42%] left-1/2 size-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-[42%] left-1/2 size-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-[42%] left-1/2 size-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
              aria-hidden
            />

            <span className="absolute top-[14%] left-[10%] h-11 w-16 rounded-xl bg-zinc-300/40" aria-hidden />
            <span className="absolute top-[22%] right-[14%] h-[4.5rem] w-14 rounded-xl bg-zinc-300/35" aria-hidden />
            <span className="absolute bottom-[38%] left-[18%] h-9 w-24 rounded-xl bg-zinc-300/30" aria-hidden />
            <span className="absolute right-[26%] bottom-[36%] h-14 w-12 rounded-xl bg-zinc-300/40" aria-hidden />
            <span className="absolute top-[38%] left-[42%] h-16 w-[4.5rem] rounded-xl bg-zinc-300/25" aria-hidden />

            {embedded && (
              <span className="absolute top-4 left-4 font-ui text-[10px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
                Current location
              </span>
            )}

            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 shadow-sm backdrop-blur-md">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
              />
              <span
                className="font-ui text-[10px] font-bold tracking-[0.14em] uppercase"
                style={{ color: ACCENT }}
              >
                Live
              </span>
            </span>

            <span
              className="absolute top-[42%] left-1/2 z-10 -translate-x-1/2 -translate-y-[70%]"
              style={{ filter: `drop-shadow(0 0 18px ${ACCENT}aa)` }}
            >
              <MapPin
                className="size-10 fill-current"
                style={{ color: ACCENT }}
                strokeWidth={1.25}
              />
              <span className="absolute top-[30%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white" />
            </span>
          </div>

          <div className="px-6 pt-5 pb-5">
            <p className="font-ui text-[1.25rem] font-semibold tracking-[-0.03em] text-zinc-950">
              Melbourne, VIC
            </p>
            <p className="mt-1 font-ui text-[13px] text-zinc-500">
              37.8136° S, 144.9631° E
            </p>
            <p className="mt-1 font-ui text-[13px] leading-snug text-zinc-500">
              {site.address}
            </p>
            <p className="mt-3 font-ui text-[12px] text-zinc-400">
              {open ? "Click to collapse map" : "Click to expand map"}
            </p>
          </div>
        </button>

        {open && (
          <div className="border-t border-zinc-100">
            <iframe
              title="Office map"
              src={mapSrc}
              className="h-[210px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
}
