import type { ReactNode } from "react";
import Image from "next/image";
import { properties, site } from "@/lib/content";
import { CtaLink } from "./cta-button";
import { PathCard } from "./path-card";
import { PropertyCard } from "./property-card";
import { Reveal, StaggerReveal } from "./reveal";
import { VisitOfficeInteractive } from "./visit-office";

function Shell({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 sm:py-20 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}

export function TrustMetricsBento() {
  return (
    <Shell id="appraisal" className="!py-12 sm:!py-16">
      <StaggerReveal
        className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-14"
        stagger={0.16}
        y={32}
      >
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=65"
            alt="Melbourne CBD commercial towers"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={70}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/55 via-transparent to-ink-black/20" />
          <p className="absolute bottom-5 left-5 font-ui text-[12px] font-medium tracking-[0.14em] text-white/80 uppercase sm:bottom-6 sm:left-6">
            Melbourne CBD · 15+ years
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-ui text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
            What’s your property worth?
          </h2>
          <p className="mt-5 max-w-md font-ui text-[16px] leading-relaxed text-charcoal">
            {site.trustLine} Start with a clear appraisal — not a form maze.
          </p>

          <div className="mt-8 flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <CtaLink href="#contact" variant="primary" className="w-full sm:w-auto">
              Get an appraisal
            </CtaLink>
            <CtaLink
              href={site.phoneHref}
              variant="outline"
              arrow={false}
              className="w-full sm:w-auto"
            >
              Call {site.phone}
            </CtaLink>
          </div>

          <p className="mt-8 border-t border-mist pt-5 font-ui text-[13px] tracking-[-0.01em] text-ash">
            Sales · Leasing · Management
          </p>
        </div>
      </StaggerReveal>
    </Shell>
  );
}

export function FeatureSplit({
  id,
  title,
  body,
  cta,
  href,
  image,
  reverse = false,
}: {
  id: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <Shell id={id} className="!py-14">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="font-ui text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
            {title}
          </h2>
          <p className="mt-5 max-w-md font-ui text-[16px] leading-relaxed text-charcoal">
            {body}
          </p>
          <CtaLink href={href} variant="secondary" className="mt-8 w-full sm:w-auto">
            {cta}
          </CtaLink>
        </div>
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={70}
            className="object-cover"
          />
        </div>
      </div>
    </Shell>
  );
}

export function ServicesSection() {
  const paths = [
    {
      id: "services-sell",
      href: "#appraisal",
      title: "Sell with us",
      body: "Timing, positioning, and a campaign built for CBD buyers — not a generic listing dump.",
      cta: "View sales",
      stat: "15+",
      statLabel: "Years CBD sales focus",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=65",
    },
    {
      id: "services-lease",
      href: "#appraisal",
      title: "Management & leasing",
      body: "Protect income and occupancy with leasing strategy and day-to-day care for Melbourne CBD assets.",
      cta: "View leasing",
      stat: "16+",
      statLabel: "Commercial projects done",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=65",
    },
  ] as const;

  return (
    <Shell id="sell" className="!py-12 sm:!py-16">
      <Reveal>
        <h2 className="font-ui text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
          Two paths
        </h2>
        <p className="mt-3 max-w-xl font-ui text-[15px] leading-relaxed text-charcoal">
          One CBD focus — sales, leasing &amp; management for Melbourne assets.
        </p>
      </Reveal>

      <StaggerReveal className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.14}>
        {paths.map((path) => (
          <PathCard key={path.id} {...path} />
        ))}
      </StaggerReveal>
    </Shell>
  );
}

export function PropertiesSection() {
  return (
    <Shell id="properties">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-ui text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
            A selection of favourite properties
          </h2>
          <CtaLink href="#contact" variant="secondary" className="w-full sm:w-auto">
            View all listings
          </CtaLink>
        </div>
      </Reveal>
      <StaggerReveal
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.12}
        y={36}
      >
        {properties.map((property) => (
          <PropertyCard key={property.address} property={property} />
        ))}
      </StaggerReveal>
    </Shell>
  );
}

export function ContactSection() {
  return (
    <Shell id="contact" className="!py-12 sm:!py-16">
      <Reveal>
        <div className="mx-auto max-w-[960px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 md:grid md:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
          <h2 className="font-ui text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.1] tracking-[-0.02em] text-graphite">
            Contact us
          </h2>
          <p className="mt-4 max-w-sm font-ui text-[15px] leading-relaxed text-charcoal">
            Buying, leasing, selling, or management advice — start with a conversation, not a form maze.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="block rounded-xl border border-zinc-200/80 bg-white px-4 py-3.5 transition hover:bg-white/80"
            >
              <p className="font-ui text-[11px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                Email
              </p>
              <p className="mt-0.5 font-ui text-[14px] font-medium tracking-[-0.01em] text-zinc-950">
                {site.email}
              </p>
            </a>
            <a
              href={site.phoneHref}
              className="block rounded-xl border border-zinc-200/80 bg-white px-4 py-3.5 transition hover:bg-white/80"
            >
              <p className="font-ui text-[11px] font-medium tracking-[0.12em] text-zinc-400 uppercase">
                Call
              </p>
              <p className="mt-0.5 font-ui text-[14px] font-medium tracking-[-0.01em] text-zinc-950">
                {site.phone}
              </p>
            </a>
          </div>

          <p className="mt-6 font-ui text-[13px] leading-snug text-ash">
            {site.address}
          </p>
        </div>

        <div className="p-4 pt-0 md:border-l md:border-zinc-200 md:p-0">
          <VisitOfficeInteractive embedded />
        </div>
      </div>
      </Reveal>
    </Shell>
  );
}

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-mist bg-paper px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <a href="#top" className="inline-block" aria-label={site.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={site.name}
            width={181}
            height={30}
            className="h-6 w-auto sm:h-7"
          />
        </a>
        <p className="mt-8 max-w-2xl font-ui text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-graphite">
          Commercial real estate, handled with editorial clarity.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-ui text-[15px] font-medium text-graphite">Leasing</h3>
            <ul className="mt-4 space-y-2 font-ui text-[14px] text-ash">
              <li><a href="#services-lease" className="hover:text-graphite">Lease with us</a></li>
              <li><a href="#properties" className="hover:text-graphite">Lease listings</a></li>
              <li><a href="#appraisal" className="hover:text-graphite">Request appraisal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-ui text-[15px] font-medium text-graphite">Sell</h3>
            <ul className="mt-4 space-y-2 font-ui text-[14px] text-ash">
              <li><a href="#services-sell" className="hover:text-graphite">Sell with us</a></li>
              <li><a href="#properties" className="hover:text-graphite">Favourite properties</a></li>
              <li><a href="#appraisal" className="hover:text-graphite">Request appraisal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-ui text-[15px] font-medium text-graphite">More</h3>
            <ul className="mt-4 space-y-2 font-ui text-[14px] text-ash">
              <li><a href="#about" className="hover:text-graphite">About us</a></li>
              <li><a href="#team" className="hover:text-graphite">Our team</a></li>
              <li><a href="#contact" className="hover:text-graphite">Get in touch</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-ui text-[15px] text-graphite">What&apos;s my property worth?</p>
            <CtaLink href="#appraisal" variant="primary" className="w-full">
              Get an appraisal
            </CtaLink>
            <CtaLink href={site.phoneHref} variant="outline" arrow={false} className="w-full">
              {site.phone}
            </CtaLink>
          </div>
        </div>
        <p className="mt-12 border-t border-mist pt-6 font-ui text-[13px] text-ash">
          © Melbourne CBD Real Estate Pty Ltd 2026 · Privacy · Disclaimer
        </p>
      </div>
    </footer>
  );
}
