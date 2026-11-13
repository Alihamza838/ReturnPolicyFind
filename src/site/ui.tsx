/**
 * ui.tsx - the ReturnPolicyFind building blocks. The visual language is a shop receipt and a
 * ticket stub: monospace numbers, dotted leader lines, notched cards and a rubber stamp.
 */
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { PolicyFact, PolicyFaq, TimelinePoint, VerifiedPolicy } from "../data/policies";
import { countryOfPolicy, type Country } from "../data/countries";
import { formatDate } from "./data";
import { href } from "./config";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items, dark = false }: { items: { name: string; path: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`font-mono text-[13px] ${dark ? "text-slate-300" : "text-ink-3"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">›</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={dark ? "text-white" : "text-ink-2"}>
                {c.name}
              </span>
            ) : (
              <Link to={href(c.path)} className="underline-offset-2 hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The number people look for */
export function windowLabel(p: VerifiedPolicy): { big: string; unit: string; small: string } {
  if (p.windowDays === null && p.headline.startsWith("No change-of-mind")) return { big: "0", unit: "days", small: "no change-of-mind returns" };
  if (p.windowDays === null) return p.slug === "costco" ? { big: "∞", unit: "", small: "no set limit, most items" } : { big: "?", unit: "", small: "varies by item" };
  return { big: String(p.windowDays), unit: p.windowDays === 1 ? "day" : "days", small: "main return window" };
}

export function CountryChip({ c, size = "md" }: { c: Country; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "h-12 min-w-12 text-base" : size === "sm" ? "h-6 min-w-6 text-[10px]" : "h-8 min-w-8 text-xs";
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-md px-1 font-mono font-extrabold tracking-wider ${dims}`} style={{ backgroundColor: c.badge[0], color: c.badge[1] }}>
      {c.code}
    </span>
  );
}

export function Stamp({ children, tone = "mint" }: { children: ReactNode; tone?: "mint" | "coral" }) {
  return <span className={`stamp ${tone === "mint" ? "text-mint-700" : "text-coral-700"}`}>{children}</span>;
}

/** A store as a ticket: stub with the days on the left, details on the right */
export function StoreTicket({ p }: { p: VerifiedPolicy }) {
  const w = windowLabel(p);
  const c = countryOfPolicy(p);
  return (
    <Link to={href(`/stores/${p.slug}`)} className="lift group block rounded-[22px] drop-shadow-[0_1px_0_rgba(20,33,61,0.08)]">
      <span className="ticket flex h-full overflow-hidden border border-line" style={{ ["--notch" as string]: "50%" }}>
        <span className="flex w-[92px] shrink-0 flex-col items-center justify-center bg-navy px-2 py-4 text-center text-white">
          <span className="font-mono text-3xl font-extrabold leading-none text-coral-400">{w.big}</span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-300">{w.unit || "days"}</span>
        </span>
        <span className="w-0 border-l-2 border-dashed border-line" aria-hidden="true" />
        <span className="min-w-0 flex-1 p-4">
          <span className="flex items-center gap-2">
            {c && <CountryChip c={c} size="sm" />}
            <span className="truncate text-lg font-extrabold text-ink group-hover:text-coral-700">{p.name}</span>
          </span>
          <span className="mt-1 block text-sm leading-snug text-ink-2">{p.headline}</span>
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-wider text-ink-3">Checked {formatDate(p.checked)}</span>
        </span>
      </span>
    </Link>
  );
}

/** Facts as receipt lines: LABEL ........ value */
export function ReceiptLines({ facts }: { facts: PolicyFact[] }) {
  return (
    <dl className="space-y-3">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-wrap items-end gap-x-2 gap-y-0.5 sm:flex-nowrap">
          <dt className="font-mono text-[13px] font-semibold uppercase tracking-wider text-ink-3">{f.label}</dt>
          <span className="leader hidden sm:block" aria-hidden="true" />
          <dd className="w-full font-semibold text-ink sm:w-auto sm:max-w-[60%] sm:text-right">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Timeline({ points }: { points: TimelinePoint[] }) {
  if (points.length < 2) return null;
  const max = Math.max(...points.map((p) => p.day), 1);
  return (
    <div>
      <div className="relative mx-2 hidden h-16 sm:block" aria-hidden="true">
        <span className="absolute left-0 right-0 top-7 h-1.5 rounded-full bg-cream-2" />
        <span className="bar-grow absolute left-0 right-0 top-7 h-1.5 rounded-full bg-gradient-to-r from-coral-400 to-coral-700" />
        {points.map((pt) => (
          <span key={`${pt.day}-${pt.label}`} className="absolute top-4 -translate-x-1/2" style={{ left: `${Math.sqrt(pt.day / max) * 100}%` }}>
            <span className="block h-7 w-7 rounded-full border-4 border-white bg-navy shadow" />
          </span>
        ))}
      </div>
      <ol className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
        {points.map((pt) => (
          <li key={`${pt.day}-${pt.label}`} className="rounded-xl border border-line bg-card px-4 py-3">
            <span className="block font-mono text-sm font-bold text-coral-700">{pt.day === 0 ? "DAY 0" : `DAY ${pt.day}`}</span>
            <span className="block text-sm leading-snug text-ink-2">{pt.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: PolicyFaq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-line bg-card px-5 py-4 open:border-coral-200 open:bg-coral-50/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-bold tracking-normal text-ink">{f.q}</h3>
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-2 font-mono text-lg text-coral-700 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-2 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Section({ id, title, kicker, children, intro }: { id?: string; title: string; kicker?: string; children: ReactNode; intro?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className="mt-14">
      {kicker && <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-coral-700">{kicker}</p>}
      <h2 id={id ? `${id}-h` : undefined} data-reveal className="mt-1 text-2xl text-ink sm:text-[1.9rem]">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl text-ink-2">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function PillLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={href(to)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink-2 transition hover:border-coral-500 hover:text-coral-700">
      {children}
    </Link>
  );
}

export function TicketImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={420}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className="aspect-[40/21] w-full rounded-[22px] border border-line bg-cream-2 object-cover"
    />
  );
}
