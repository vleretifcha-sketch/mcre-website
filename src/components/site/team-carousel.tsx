"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { site, teamMembers } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, StaggerReveal } from "./reveal";

function TeamCard({
  person,
}: {
  person: (typeof teamMembers)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-200">
      <Image
        src={person.image}
        alt={person.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={70}
        className={cn(
          "object-cover object-[center_18%] transition-transform duration-700 ease-out",
          open && "scale-105",
        )}
      />

      {/* Resting caption — hides when open */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-16 transition-opacity duration-300",
          open ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <p className="font-ui text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
          {person.name}
        </p>
        <p className="mt-0.5 font-ui text-[13px] text-white/85">{person.role}</p>
      </div>

      {/* Info overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end bg-black/45 p-4 pt-14 backdrop-blur-md transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <p className="font-ui text-[1.15rem] font-semibold tracking-[-0.02em] text-white">
          {person.name}
        </p>
        <p className="mt-1 font-ui text-[13px] text-white/90">{person.role}</p>
        <p className="mt-3 font-ui text-[13px] leading-relaxed text-white/85">
          {person.bio}
        </p>
        <p className="mt-4 font-ui text-[12px] text-white/80">
          <a href={site.phoneHref} className="underline-offset-2 hover:underline">
            {person.phone}
          </a>
          <span className="mx-2 text-white/40">|</span>
          <a
            href={`mailto:${person.email}`}
            className="underline-offset-2 hover:underline"
          >
            Email Me
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="absolute top-3 right-3 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/20 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 active:scale-95"
        aria-expanded={open}
        aria-label={
          open
            ? `Hide details for ${person.name}`
            : `Show details for ${person.name}`
        }
      >
        {open ? (
          <Minus className="size-4" strokeWidth={2} />
        ) : (
          <Plus className="size-4" strokeWidth={2} />
        )}
      </button>
    </article>
  );
}

export function TeamCarousel() {
  return (
    <section id="team" className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2 className="font-ui text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
            Meet our team
          </h2>
        </Reveal>

        <StaggerReveal
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          stagger={0.12}
          y={36}
        >
          {teamMembers.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
