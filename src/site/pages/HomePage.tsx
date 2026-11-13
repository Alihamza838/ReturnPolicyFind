import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../Seo";
import { faqSchema, organizationSchema, websiteSchema } from "../schema";
import { Container, CountryChip, FaqList, PillLink, Section, Stamp, StoreTicket, windowLabel } from "../ui";
import CountryPicker from "../CountryPicker";
import { POLICIES, getPolicy } from "../../data/policies";
import { BRANDS, COUNTRIES, brandStores, countryOfPolicy } from "../../data/countries";
import { CATEGORIES, COMPARE_PAIRS, formatDate, guideImage, latestChecked, pairSlug, storesInCategory } from "../data";
import { GUIDES } from "../guides";
import { href } from "../config";

const POPULAR = ["walmart", "target", "amazon", "costco", "dsw", "best-buy", "amazon-uk", "next", "noon", "amazon-in", "daraz", "khaadi"];

const HOME_FAQS = [
  {
    q: "Is ReturnPolicyFind run by a store?",
    a: "No. ReturnPolicyFind is independent and not affiliated with any retailer. We read each store's own public policy, summarise it in plain words and link to it.",
  },
  {
    q: "How current are the policies?",
    a: "Each store page shows the date we last checked the retailer's official returns page. When a store changes its rules, we update the page and the date.",
  },
  {
    q: "Which countries do you cover?",
    a: `${COUNTRIES.map((c) => c.name).join(", ")}, plus global apps such as Temu, SHEIN, AliExpress, eBay and Etsy.`,
  },
  {
    q: "What if a store tells me something different?",
    a: "The store's official policy always wins, and rules can change between our checks. Show them the official page linked on our store page, and tell us so we can update it.",
  },
];

function InstantFinder() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const hits = useMemo(
    () => (needle.length < 1 ? [] : POLICIES.filter((p) => `${p.name} ${p.country}`.toLowerCase().includes(needle)).slice(0, 6)),
    [needle],
  );
  return (
    <div className="relative">
      <form role="search" action="/stores/" method="get" onSubmit={(e) => {
          e.preventDefault();
          navigate(hits[0] ? href(`/stores/${hits[0].slug}`) : needle ? `/stores/?q=${encodeURIComponent(q.trim())}` : "/stores/");
        }}>
        <label className="block">
          <span className="sr-only">Store name</span>
          <span className="flex items-center gap-2 rounded-full border-2 border-navy bg-white p-1.5 pl-5 shadow-[6px_6px_0_#14213d]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
              placeholder="Type a store: Walmart, Zara, noon…"
              aria-controls="finder-results"
              className="h-12 min-w-0 flex-1 bg-transparent text-lg text-ink placeholder:text-ink-3 focus:outline-none"
            />
            <button type="submit" className="h-12 shrink-0 rounded-full bg-coral-700 px-6 text-base font-bold text-white hover:bg-coral-800">
              Find
            </button>
          </span>
        </label>
      </form>
      <ul id="finder-results" aria-live="polite" className={`${hits.length ? "mt-3" : ""} space-y-2`}>
        {hits.map((p) => {
          const c = countryOfPolicy(p);
          const w = windowLabel(p);
          return (
            <li key={p.slug}>
              <Link to={href(`/stores/${p.slug}`)} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 hover:border-coral-500">
                {c && <CountryChip c={c} size="sm" />}
                <span className="min-w-0 flex-1 truncate font-semibold text-ink">{p.name}</span>
                <span className="font-mono text-sm font-bold text-coral-700">
                  {w.big} {w.unit}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Component() {
  const walmart = getPolicy("walmart")!;
  const checked = latestChecked();
  return (
    <>
      <Seo
        title="ReturnPolicyFind: Store Return Policies, Checked 2026"
        description={`Find any store's return policy in seconds: ${POLICIES.length} stores in ${COUNTRIES.length} countries with return windows, receipt rules and refund times, each checked on the official site.`}
        path="/"
        image="/og/default.jpg"
        jsonLd={[organizationSchema(), websiteSchema(), faqSchema(HOME_FAQS)]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden="true" className="blob pointer-events-none absolute -right-28 -top-20 h-[420px] w-[420px] bg-coral-100 opacity-70" />
        <div aria-hidden="true" className="blob pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 bg-cream-2" />
        <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div>
            <Stamp tone="coral">Checked {formatDate(checked)}</Stamp>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
              Find any store's <span className="text-coral-700">return policy</span> in seconds.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              How many days you have, what you need to bring and when the money comes back, for {POLICIES.length} stores in {COUNTRIES.length} countries. Every answer is read on the store's own website and dated.
            </p>
            <div className="mt-8 max-w-xl">
              <InstantFinder />
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-3">
              Popular:
              {["walmart", "amazon", "target", "zara", "ikea-uk", "noon"].map((s) => (
                <Link key={s} to={href(`/stores/${s}`)} className="rounded-full bg-white px-3 py-1.5 font-semibold text-ink-2 ring-1 ring-line hover:text-coral-700">
                  {getPolicy(s)!.name}
                </Link>
              ))}
            </p>
          </div>

          {/* A real receipt from the data */}
          <div className="relative mx-auto w-full max-w-sm" aria-label="Example: Walmart return policy at a glance">
            <div className="float-b absolute -left-6 top-10 hidden h-40 w-28 rotate-[-10deg] rounded-2xl bg-navy sm:block" aria-hidden="true" />
            <Link to={href("/stores/walmart")} className="float-a receipt relative block rounded-t-2xl px-6 pt-6 shadow-[0_30px_60px_-30px_rgba(20,33,61,0.5)]">
              <p className="text-center font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink-3">Return receipt</p>
              <p className="mt-1 text-center text-2xl font-extrabold text-ink">{walmart.name}</p>
              <hr className="perf my-4" />
              <p className="text-center font-mono text-6xl font-extrabold text-coral-700">{walmart.windowDays}</p>
              <p className="text-center font-mono text-xs uppercase tracking-widest text-ink-3">days for most items</p>
              <hr className="perf my-4" />
              <dl className="space-y-1.5 font-mono text-[13px]">
                {walmart.facts.slice(1, 5).map((f) => (
                  <div key={f.label} className="flex justify-between gap-3">
                    <dt className="text-ink-3">{f.label}</dt>
                    <dd className="text-right font-semibold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="barcode mt-5" aria-hidden="true" />
              <p className="mt-3 text-center text-sm font-bold text-coral-700">Open the full Walmart policy →</p>
            </Link>
          </div>
        </Container>
      </section>

      {/* Numbers band */}
      <section aria-label="Coverage" className="bg-navy text-white">
        <Container className="grid grid-cols-2 gap-6 py-9 md:grid-cols-4">
          {[
            [POLICIES.length, "stores, each read on its official site"],
            [COUNTRIES.length, "countries, with local legal rights"],
            [COMPARE_PAIRS.length, "head-to-head comparisons"],
            [GUIDES.length, "lists built from the verified data"],
          ].map(([n, label]) => (
            <div key={String(label)} data-reveal>
              <p className="font-mono text-4xl font-extrabold text-coral-400 sm:text-5xl">
                <span data-count={n}>{n}</span>
              </p>
              <p className="mt-1 text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container>
        <Section id="countries" kicker="Step 1" title="Where are you shopping?" intro="Rules change at the border. Pick your country for local stores, legal rights and the official place to complain.">
          <CountryPicker />
        </Section>

        <Section id="popular" kicker="Most searched" title="Popular store return policies">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {POPULAR.map((s) => (
              <StoreTicket key={s} p={getPolicy(s)!} />
            ))}
          </div>
          <p className="mt-6">
            <Link to="/stores/" className="inline-flex min-h-[48px] items-center rounded-full bg-navy px-6 font-bold text-white hover:bg-navy-2">
              Browse all {POLICIES.length} stores →
            </Link>
          </p>
        </Section>

        <Section id="how" kicker="How it works" title="Three checks before you go back to the shop">
          <ol className="grid gap-4 md:grid-cols-3" data-stagger>
            {[
              ["Find your store", "Search above or browse by country. Every page starts with the number of days you have."],
              ["Read the exceptions", "Electronics, sale items and worn shoes often have different rules. They are listed on each page."],
              ["Save your deadline", "Enter your purchase date and add the last day to your calendar, with a reminder."],
            ].map(([t, d], i) => (
              <li key={t} className="ticket border border-line bg-card p-6" style={{ ["--notch" as string]: "28px" }}>
                <span className="font-mono text-4xl font-extrabold text-coral-200">0{i + 1}</span>
                <h3 className="mt-2 text-xl text-ink">{t}</h3>
                <p className="mt-1 text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="guides" kicker="Lists & guides" title="Answers people search for most">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" data-stagger>
            {GUIDES.slice(0, 8).map((g) => (
              <li key={g.slug}>
                <Link to={href(`/guides/${g.slug}`)} className="lift group block h-full overflow-hidden rounded-[22px] border border-line bg-card">
                  <img src={guideImage(g.slug)} alt="" width={800} height={420} loading="lazy" decoding="async" className="aspect-[40/21] w-full bg-cream-2 object-cover" />
                  <span className="block p-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-coral-700">{g.kicker}</span>
                    <span className="mt-1 block font-bold leading-snug text-ink group-hover:text-coral-700">{g.h1}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="brands" kicker="Across borders" title="Same brand, different rules" intro="The same name can mean a completely different return policy in another country.">
          <div className="grid gap-4 md:grid-cols-3" data-stagger>
            {BRANDS.slice(0, 3).map((b) => (
              <Link key={b.slug} to={href(`/brands/${b.slug}`)} className="lift block rounded-[22px] border border-line bg-card p-5">
                <span className="text-xl font-extrabold text-ink">{b.name}</span>
                <span className="mt-3 grid gap-1.5">
                  {brandStores(b).map((p) => {
                    const c = countryOfPolicy(p);
                    const w = windowLabel(p);
                    return (
                      <span key={p.slug} className="flex items-center gap-2 text-sm">
                        {c && <CountryChip c={c} size="sm" />}
                        <span className="min-w-0 flex-1 text-ink-2">{c?.name ?? p.country}</span>
                        <span className="font-mono font-bold text-ink">
                          {w.big} {w.unit}
                        </span>
                      </span>
                    );
                  })}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5">
            <Link to="/brands/" className="inline-block py-2 font-bold text-coral-700 underline underline-offset-4">
              All {BRANDS.length} brands by country
            </Link>
          </p>
        </Section>

        <Section id="categories" kicker="Browse" title="Compare by category">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={href(`/category/${c.slug}`)} className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-card px-5 py-4 hover:border-coral-500">
                  <span>
                    <span className="block font-bold text-ink group-hover:text-coral-700">{c.name}</span>
                    <span className="block text-sm text-ink-3">{storesInCategory(c).length} stores</span>
                  </span>
                  <span aria-hidden="true" className="font-mono text-xl text-coral-700 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="compare" kicker="Head to head" title="Popular comparisons">
          <div className="flex flex-wrap gap-2">
            {COMPARE_PAIRS.slice(0, 14).map(([a, b]) => (
              <PillLink key={pairSlug(a, b)} to={`/compare/${pairSlug(a, b)}`}>
                {getPolicy(a)?.name} <span className="text-ink-3">vs</span> {getPolicy(b)?.name}
              </PillLink>
            ))}
          </div>
        </Section>

        <Section id="faq" title="About ReturnPolicyFind">
          <FaqList faqs={HOME_FAQS} />
        </Section>
      </Container>
    </>
  );
}
