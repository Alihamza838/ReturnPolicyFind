import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema } from "../schema";
import { Breadcrumbs, Container, FaqList, Section } from "../ui";
import DeadlineCalculator from "../DeadlineCalculator";
import { POLICIES, getPolicy, type VerifiedPolicy } from "../../data/policies";
import { href } from "../config";

const FAQS = [
  { q: "How do I work out my return deadline?", a: "Add the store's return window to the date the window starts. In stores that is usually the purchase date; online it is often the delivery date. The calculator does this for every rule the store has." },
  { q: "Do return windows count weekends?", a: "Most store policies count calendar days, including weekends. A few, such as Limelight's 7 working days, count business days, which the store page points out." },
  { q: "What if the last day falls on a holiday?", a: "Stores usually don't move the deadline for holidays, so return before the date shown. Online returns can often be started on the website on the last day." },
  { q: "Is my data sent anywhere?", a: "No. The calculation and the calendar file are made in your browser." },
];

export function Component() {
  const sorted = useMemo(() => [...POLICIES].filter((p) => p.timeline.some((t) => t.day > 0)).sort((a, b) => a.name.localeCompare(b.name)), []);
  const [slug, setSlug] = useState("custom");
  const [days, setDays] = useState(30);
  const custom: VerifiedPolicy = {
    ...POLICIES[0],
    slug: "custom",
    name: "Your store",
    timeline: [
      { day: 0, label: "Start" },
      { day: Math.max(1, days), label: `${Math.max(1, days)}-day window ends` },
    ],
    source: "https://returnpolicyfind.com/",
  };
  const p = slug === "custom" ? custom : (getPolicy(slug) ?? custom);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Return deadline calculator", path: "/tools/return-deadline-calculator" },
  ];
  return (
    <>
      <Seo
        title="Return Deadline Calculator: How Many Days Left?"
        description="Work out the last day to return something: pick a store or enter any return window, add your purchase date and save the deadline to your calendar."
        path="/tools/return-deadline-calculator"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Return deadline calculator",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          faqSchema(FAQS),
          breadcrumbSchema(crumbs),
        ]}
      />
      <div className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="blob pointer-events-none absolute -right-24 -top-24 h-80 w-80 bg-navy-2" />
        <Container className="relative py-12">
          <Breadcrumbs items={crumbs} dark />
          <h1 className="mt-5 text-4xl text-white sm:text-5xl">Return deadline calculator</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            How many days do you have left? Pick one of {sorted.length} stores to use its real rules, or type any return window.
          </p>
        </Container>
      </div>
      <Container className="py-10">
        <div className="receipt mx-auto max-w-2xl rounded-t-[22px] border border-b-0 border-line px-6 pt-6">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
            <label className="block">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">Store</span>
              <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 h-12 w-full rounded-full border border-line bg-white px-4 font-semibold text-ink">
                <option value="custom">Any store (enter the days)</option>
                {sorted.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name} ({s.country})
                  </option>
                ))}
              </select>
            </label>
            {slug === "custom" && (
              <label className="block">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">Return window (days)</span>
                <input type="number" min={1} max={730} value={days} onChange={(e) => setDays(Number(e.target.value) || 1)} className="mt-1 h-12 w-full rounded-full border border-line bg-white px-4 font-mono font-bold text-ink" />
              </label>
            )}
          </div>
          {slug !== "custom" && (
            <p className="mt-3 text-sm text-ink-2">
              Rules from the <Link to={href(`/stores/${p.slug}`)} className="font-bold text-coral-700 underline">{p.name} return policy</Link>: {p.headline}.
            </p>
          )}
          <div className="mt-5">
            <DeadlineCalculator key={p.slug + days} p={p} />
          </div>
        </div>

        <Section id="how" kicker="How it works" title="How return deadlines are counted">
          <div className="prose-read">
            <p>
              A return window is a number of days that starts on a specific date. For purchases in a shop, that is nearly always the day you paid. For online orders, many stores
              start counting when the parcel is delivered, and a few (such as Zara) from the day it ships. Each store page says which one applies.
            </p>
            <p>
              Many stores also have more than one deadline: a shorter one for electronics or sale items, a longer one for members, or a holiday extension. When you pick a store
              above, the calculator shows every one of them, with the days left.
            </p>
          </div>
        </Section>

        <Section id="faq" kicker="FAQ" title="Questions about return deadlines">
          <FaqList faqs={FAQS} />
        </Section>
      </Container>
    </>
  );
}
