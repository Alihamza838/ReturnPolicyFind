import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryChip, StoreTicket } from "../ui";
import { POLICIES } from "../../data/policies";
import { COUNTRIES, countryOfPolicy } from "../../data/countries";
import { CATEGORIES, categoryOf } from "../data";
import { href } from "../config";

const SORTS = [
  ["az", "A–Z"],
  ["longest", "Longest window"],
  ["shortest", "Shortest window"],
] as const;

export function Component() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<(typeof SORTS)[number][0]>("az");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("q");
    if (v) setQ(v);
  }, []);
  const needle = q.trim().toLowerCase();
  const list = useMemo(() => {
    const out = POLICIES.filter(
      (p) =>
        (country === "all" || countryOfPolicy(p)?.slug === country || (country === "global" && p.region === "global")) &&
        (cat === "all" || categoryOf(p)?.slug === cat) &&
        (!needle || `${p.name} ${p.country} ${p.category} ${p.headline}`.toLowerCase().includes(needle)),
    );
    const w = (d: number | null) => d ?? 100000;
    if (sort === "az") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "longest") out.sort((a, b) => w(b.windowDays) - w(a.windowDays));
    if (sort === "shortest") out.sort((a, b) => w(a.windowDays) - w(b.windowDays));
    return out;
  }, [needle, country, cat, sort]);
  const letters = [...new Set(POLICIES.map((p) => p.name[0].toUpperCase()))].sort();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
  ];
  const select = "h-12 rounded-full border border-line bg-white px-4 font-semibold text-ink focus:border-coral-500 focus:outline-none";

  return (
    <>
      <Seo
        title={`Store Return Policies A–Z: ${POLICIES.length} Stores Checked`}
        description={`Return policies for ${POLICIES.length} stores, from Walmart and Amazon to Next, noon and Daraz: windows, receipts and refunds, checked on official sites.`}
        path="/stores"
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema("Store return policies", [...POLICIES].sort((a, b) => a.name.localeCompare(b.name)).map((p) => ({ name: `${p.name} return policy`, path: `/stores/${p.slug}` })))]}
      />
      <div className="border-b border-line bg-white">
        <Container className="py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 text-4xl text-ink sm:text-5xl">Store return policies, A to Z</h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-2">
            {POLICIES.length} stores in {COUNTRIES.length} countries. Each one is summarised from its own official returns page, with the date we checked it.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
            <label>
              <span className="sr-only">Filter by name</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Store name, e.g. Target or Sapphire" className={`${select} w-full font-normal placeholder:text-ink-3`} />
            </label>
            <label>
              <span className="sr-only">Country</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={select}>
                <option value="all">All countries</option>
                {COUNTRIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
                <option value="global">Global apps</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Category</span>
              <select value={cat} onChange={(e) => setCat(e.target.value)} className={select}>
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={select}>
                {SORTS.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <p className="font-mono text-sm text-ink-3" aria-live="polite">
          {list.length} of {POLICIES.length} stores
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <StoreTicket key={p.slug} p={p} />
          ))}
        </div>
        {!list.length && (
          <p className="mt-4 rounded-2xl border border-line bg-white p-6 text-ink-2">
            No store matches. <Link to="/contact/" className="font-bold text-coral-700 underline">Suggest a store</Link> and we will add it.
          </p>
        )}

        <section aria-labelledby="az" className="mt-14 rounded-[22px] border border-line bg-white p-6">
          <h2 id="az" className="text-xl text-ink">
            Every store by letter
          </h2>
          <div className="mt-4 space-y-4">
            {letters.map((L) => (
              <div key={L} className="flex gap-4">
                <span className="w-8 shrink-0 font-mono text-xl font-extrabold text-coral-700">{L}</span>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {POLICIES.filter((p) => p.name[0].toUpperCase() === L)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((p) => {
                      const c = countryOfPolicy(p);
                      return (
                        <li key={p.slug}>
                          <Link to={href(`/stores/${p.slug}`)} className="inline-flex items-center gap-1.5 py-1 text-ink-2 underline-offset-2 hover:text-coral-700 hover:underline">
                            {c && <CountryChip c={c} size="sm" />}
                            {p.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
