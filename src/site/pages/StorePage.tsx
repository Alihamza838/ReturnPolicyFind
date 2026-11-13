import { Link, useParams } from "react-router-dom";
import { getPolicy, type VerifiedPolicy } from "../../data/policies";
import { brandOfPolicy, brandStores, countryOfPolicy, inCountry } from "../../data/countries";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema } from "../schema";
import { Breadcrumbs, Container, CountryChip, FaqList, ReceiptLines, Section, Stamp, StoreTicket, TicketImage, Timeline, windowLabel } from "../ui";
import DeadlineCalculator from "../DeadlineCalculator";
import PolicyActions from "../PolicyActions";
import { ReadingProgress } from "../ScrollEffects";
import { categoryOf, clamp, formatDate, hostOf, monthYear, pairSlug, pairsFor, relatedStores, storeImage, storeOg } from "../data";
import { guidesForStore } from "../guides";
import { EDITOR, absoluteUrl, href } from "../config";
import { NotFoundContent } from "./NotFoundPage";

/** "Walmart Return Policy: 90 Days, Receipt & Refund Rules", kept within 60 characters */
export function storeTitle(p: VerifiedPolicy) {
  const n = p.windowDays;
  const options = [
    n ? `${p.name} Return Policy: ${n} Days, Receipts & Refunds` : "",
    n ? `${p.name} Return Policy: ${n}-Day Rules & Refunds` : "",
    n ? `${p.name} Return Policy (${n} Days) Explained` : "",
    `${p.name} Return Policy 2026: Rules, Receipts & Refunds`,
    `${p.name} Return Policy: Rules & Refunds`,
    `${p.name} Return Policy`,
  ].filter(Boolean);
  return options.find((t) => t.length <= 60) ?? `${p.name} Return Policy`;
}
export function storeDescription(p: VerifiedPolicy) {
  return clamp(`How long you have to return to ${p.name} and how refunds work: ${p.headline.charAt(0).toLowerCase()}${p.headline.slice(1)}. Checked ${monthYear(p.checked)} on ${hostOf(p.source)}.`);
}

export function Component() {
  const { slug } = useParams<{ slug: string }>();
  const p = getPolicy(slug);
  if (!p) return <NotFoundContent />;

  const path = `/stores/${p.slug}`;
  const cat = categoryOf(p);
  const country = countryOfPolicy(p);
  const brand = brandOfPolicy(p);
  const siblings = brand ? brandStores(brand) : [];
  const w = windowLabel(p);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    ...(country ? [{ name: country.name, path: `/countries/${country.slug}` }] : []),
    { name: `${p.name} return policy`, path },
  ];
  const guides = guidesForStore(p.slug).filter((g) => g.slug !== "return-policy-cheat-sheet-2026");
  const pairs = pairsFor(p.slug);
  const related = relatedStores(p);

  return (
    <article>
      <ReadingProgress />
      <Seo
        title={storeTitle(p)}
        description={storeDescription(p)}
        path={path}
        image={storeOg(p.slug)}
        type="article"
        modified={p.checked}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${p.name} return policy`,
            url: absoluteUrl(path),
            dateModified: p.checked,
            about: { "@type": "Organization", name: p.name, url: p.source },
            author: { "@type": "Person", name: EDITOR.name, url: absoluteUrl("/about") },
            primaryImageOfPage: absoluteUrl(storeOg(p.slug)),
          },
          faqSchema(p.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero band */}
      <div className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="blob pointer-events-none absolute -right-24 -top-24 h-80 w-80 bg-navy-2" />
        <Container className="relative grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center">
          <div>
            <Breadcrumbs items={crumbs} dark />
            <p className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral-400">
              {country && <CountryChip c={country} size="sm" />}
              {p.country} · {cat?.name ?? p.category}
            </p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">{p.name} return policy</h1>
            <p className="mt-4 text-xl font-semibold text-coral-100">{p.headline}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-300">
              <span>
                Checked {formatDate(p.checked)} by{" "}
                <Link to="/about/" className="font-semibold text-white underline underline-offset-2">
                  {EDITOR.name}
                </Link>{" "}
                on{" "}
                <a href={p.source} target="_blank" rel="noopener nofollow" className="font-semibold text-white underline underline-offset-2">
                  {hostOf(p.source)}
                </a>
              </span>
            </p>
          </div>
          <div className="ticket mx-auto w-full max-w-xs bg-white p-6 text-center text-ink" style={{ ["--notch" as string]: "62%" }}>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink-3">You have</p>
            <p className="mt-1 font-mono text-7xl font-extrabold leading-none text-coral-700">{w.big}</p>
            <p className="mt-1 font-mono text-sm font-bold uppercase tracking-widest text-ink-2">{w.unit}</p>
            <p className="mt-1 text-sm text-ink-3">{w.small}</p>
            <hr className="perf my-4" />
            <Stamp>Verified {formatDate(p.checked)}</Stamp>
          </div>
        </Container>
      </div>

      <Container className="pb-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-3">Updated {formatDate(p.checked)}</p>
              <PolicyActions title={`${p.name} return policy`} />
            </div>

            <Section id="short" kicker="Quick answer" title={`${p.name} returns in 20 seconds`}>
              <p className="text-lg text-ink-2">{p.summary}</p>
              {p.holiday && (
                <aside className="mt-5 flex gap-4 rounded-2xl border-2 border-dashed border-coral-400 bg-coral-50 p-5" aria-label="Holiday rules">
                  <span className="font-mono text-2xl" aria-hidden="true">
                    ★
                  </span>
                  <span>
                    <span className="block font-mono text-xs font-bold uppercase tracking-widest text-coral-800">Holiday 2026</span>
                    <span className="mt-1 block font-semibold text-ink">{p.holiday}</span>
                  </span>
                </aside>
              )}
            </Section>

            <Section id="receipt" kicker="The rules" title={`${p.name} return policy at a glance`}>
              <div className="receipt rounded-t-[22px] border border-b-0 border-line px-6 pt-6">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink-3">{p.name} · returns</p>
                <hr className="perf my-4" />
                <ReceiptLines facts={p.facts} />
                <hr className="perf my-4" />
                <p className="font-mono text-xs text-ink-3">Source: {hostOf(p.source)} · {formatDate(p.checked)}</p>
              </div>
            </Section>

            <TicketImage
              src={storeImage(p.slug)}
              alt={`${p.name} return timeline: ${p.timeline.map((t) => (t.day === 0 ? t.label : `day ${t.day} ${t.label.toLowerCase()}`)).join(", ")}`}
            />

            {p.timeline.length > 1 && (
              <Section id="deadline" kicker="Your dates" title="When is your last day?" intro="Each milestone counts from the day the window starts (purchase or delivery, as shown above).">
                <Timeline points={p.timeline} />
                <div className="mt-6">
                  <DeadlineCalculator p={p} />
                </div>
              </Section>
            )}

            <Section id="exceptions" kicker="Fine print" title="What can't be returned (or has other rules)">
              <ul className="space-y-3">
                {p.exceptions.map((e) => (
                  <li key={e} className="flex gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-ink-2">
                    <span aria-hidden="true" className="mt-0.5 font-mono font-extrabold text-coral-700">
                      ✕
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="steps" kicker="Step by step" title={`How to return to ${p.name}`}>
              <ol className="relative space-y-4 border-l-2 border-dashed border-coral-200 pl-8">
                {p.steps.map((s, i) => (
                  <li key={s} className="relative">
                    <span className="absolute -left-[51px] flex h-9 w-9 items-center justify-center rounded-full bg-navy font-mono text-sm font-bold text-white">{i + 1}</span>
                    <p className="rounded-2xl bg-white px-5 py-3 text-ink-2 ring-1 ring-line">{s}</p>
                  </li>
                ))}
              </ol>
            </Section>

            {p.tips.length > 0 && (
              <Section id="tips" kicker="Save the return" title="Tips from the policy">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.tips.map((t) => (
                    <li key={t} className="rounded-2xl bg-cream-2 px-5 py-4 text-ink-2">
                      <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-mint-700">Tip</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section id="faq" kicker="FAQ" title={`${p.name} return policy questions`}>
              <FaqList faqs={p.faqs} />
            </Section>

            <section className="mt-12 rounded-[22px] border border-line bg-white p-6 text-sm text-ink-2" aria-label="Source">
              <p>
                <strong className="text-ink">Official source:</strong>{" "}
                <a href={p.source} target="_blank" rel="noopener nofollow" className="break-all font-semibold text-coral-700 underline">
                  {p.source}
                </a>{" "}
                (checked {formatDate(p.checked)}).
              </p>
              {p.unconfirmed && (
                <p className="mt-2">
                  <strong className="text-ink">Not confirmed:</strong> {p.unconfirmed}
                </p>
              )}
              <p className="mt-2">
                ReturnPolicyFind is independent and not {p.name}'s official policy. Rules can change at any time, so confirm the details on the official page. Seen a change?{" "}
                <Link to="/contact/" className="font-semibold text-coral-700 underline">
                  Tell us
                </Link>
                .
              </p>
            </section>
          </div>

          <aside className="mt-12 space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="Related">
            <nav aria-label="On this page" className="hidden rounded-[22px] border border-line bg-white p-5 lg:block">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  ["short", "Quick answer"],
                  ["receipt", "Rules at a glance"],
                  ...(p.timeline.length > 1 ? [["deadline", "Deadline calculator"]] : []),
                  ["exceptions", "Exceptions"],
                  ["steps", "How to return"],
                  ["faq", "Questions"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-ink-2 hover:text-coral-700 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {brand && siblings.length > 1 && (
              <div className="rounded-[22px] border border-line bg-white p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">{brand.name} in other countries</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {siblings.map((s) => {
                    const c = countryOfPolicy(s);
                    const sw = windowLabel(s);
                    return (
                      <li key={s.slug}>
                        <Link
                          to={href(`/stores/${s.slug}`)}
                          aria-current={s.slug === p.slug ? "page" : undefined}
                          className={`flex items-center gap-2 rounded-xl px-2 py-1.5 ${s.slug === p.slug ? "bg-navy text-white" : "text-ink-2 hover:bg-cream-2"}`}
                        >
                          {c && <CountryChip c={c} size="sm" />}
                          <span className="flex-1">{c?.name ?? s.country}</span>
                          <span className="font-mono font-bold">
                            {sw.big} {sw.unit}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link to={href(`/brands/${brand.slug}`)} className="mt-3 inline-block py-1 text-sm font-bold text-coral-700 underline">
                  Compare {brand.name} by country
                </Link>
              </div>
            )}
            {pairs.length > 0 && (
              <div className="rounded-[22px] border border-line bg-white p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">Compare {p.name}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {pairs.map(([a, b]) => (
                    <li key={pairSlug(a, b)}>
                      <Link to={href(`/compare/${pairSlug(a, b)}`)} className="font-semibold text-coral-700 hover:underline">
                        {getPolicy(a)?.name} vs {getPolicy(b)?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {country && (
              <Link to={href(`/countries/${country.slug}`)} className="lift flex items-center gap-3 rounded-[22px] border border-line bg-white p-5">
                <CountryChip c={country} />
                <span className="text-sm">
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-ink-3">Shopping in {inCountry(country)}?</span>
                  <span className="font-bold text-ink">All local stores & your legal rights →</span>
                </span>
              </Link>
            )}
            {guides.length > 0 && (
              <div className="rounded-[22px] border border-line bg-white p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">{p.name} appears in</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link to={href(`/guides/${g.slug}`)} className="text-ink-2 hover:text-coral-700 hover:underline">
                        {g.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <Section kicker="Similar" title={cat ? `More ${cat.name.toLowerCase()} return policies` : "Similar stores"}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {related.map((r) => (
                <StoreTicket key={r.slug} p={r} />
              ))}
            </div>
          </Section>
        )}
      </Container>
    </article>
  );
}
