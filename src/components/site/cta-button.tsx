import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group/cta inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl border px-5 py-2.5 font-ui text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-blue/40 focus-visible:ring-offset-2 active:scale-[0.98]";

const variants = {
  primary:
    "border-twilight bg-dusk text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_8px_24px_rgba(31,31,41,0.22)]",
  secondary:
    "border-signal-blue bg-transparent text-signal-blue hover:-translate-y-0.5 hover:bg-signal-blue/10 hover:shadow-[0_8px_24px_rgba(65,161,207,0.15)]",
  blur: "border-white/35 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/18 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]",
  outline:
    "border-twilight/30 bg-transparent text-twilight hover:-translate-y-0.5 hover:border-twilight hover:bg-linen hover:shadow-[0_8px_20px_rgba(40,40,52,0.08)]",
  inverse:
    "border-transparent bg-white text-zinc-950 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
} as const;

function CtaArrow() {
  return (
    <ArrowRight
      className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-0.5"
      strokeWidth={2}
      aria-hidden
    />
  );
}

type CtaLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  arrow?: boolean;
  children: ReactNode;
};

export function CtaLink({
  variant = "secondary",
  arrow,
  className,
  children,
  ...props
}: CtaLinkProps) {
  const showArrow = arrow ?? variant === "secondary";

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow ? <CtaArrow /> : null}
    </a>
  );
}

type CtaButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  arrow?: boolean;
  children: ReactNode;
};

export function CtaButton({
  variant = "outline",
  arrow = false,
  className,
  children,
  ...props
}: CtaButtonProps) {
  return (
    <button type="button" className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {arrow ? <CtaArrow /> : null}
    </button>
  );
}
