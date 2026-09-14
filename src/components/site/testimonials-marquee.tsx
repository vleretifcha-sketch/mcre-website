import { testimonials } from "@/lib/content";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-3.5 fill-[#F4B400]"
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function TestimonialCard({
  name,
  initial,
  color,
  title,
  quote,
}: (typeof testimonials)[number]) {
  return (
    <figure className="flex w-[min(340px,78vw)] shrink-0 flex-col rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:w-[360px] sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full font-ui text-[15px] font-semibold text-white"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <figcaption className="truncate font-ui text-[14px] font-semibold tracking-[-0.01em] text-zinc-950">
            {name}
          </figcaption>
          <div className="mt-1 flex items-center gap-2">
            <Stars />
            <span className="inline-flex items-center gap-1 font-ui text-[11px] text-zinc-400">
              <GoogleMark />
              Google
            </span>
          </div>
        </div>
      </div>
      {title ? (
        <p className="mt-4 font-ui text-[14px] font-semibold tracking-[-0.01em] text-zinc-900">
          {title}
        </p>
      ) : null}
      <blockquote
        className={`font-ui text-[13.5px] leading-relaxed text-zinc-600 ${
          title ? "mt-2" : "mt-4"
        }`}
      >
        “{quote}”
      </blockquote>
    </figure>
  );
}

export function TestimonialsMarquee() {
  const row = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="overflow-hidden border-y border-zinc-100 bg-parchment py-8 sm:py-10"
      aria-label="Client testimonials"
    >
      <div className="testimonials-marquee-mask">
        <div className="testimonials-marquee-track gap-4 sm:gap-5">
          {row.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
