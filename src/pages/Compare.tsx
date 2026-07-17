import * as React from "react";
import { Link, navigate } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ComparisonDataTable } from "../components/store/ComparisonDataTable";
import { storesData } from "../data/stores";
import { useSEO } from "../hooks/useSEO";

const POPULAR_COMPARISONS = [
  { slugA: "target", slugB: "walmart", label: "Target vs Walmart" },
  { slugA: "sephora", slugB: "ulta", label: "Sephora vs Ulta Beauty" },
  { slugA: "costco", slugB: "best-buy", label: "Costco vs Best Buy" },
  { slugA: "noon", slugB: "amazon", label: "Noon vs Amazon" },
  { slugA: "ebay", slugB: "etsy", label: "eBay vs Etsy" },
  { slugA: "shein", slugB: "amazon", label: "Shein vs Amazon" },
  { slugA: "daraz", slugB: "amazon", label: "Daraz vs Amazon" },
  { slugA: "flipkart", slugB: "myntra", label: "Flipkart vs Myntra" },
  { slugA: "temu", slugB: "aliexpress", label: "Temu vs AliExpress" },
  { slugA: "shein", slugB: "myntra", label: "Shein vs Myntra" },
  { slugA: "shein", slugB: "temu", label: "Shein vs Temu" },
];

export function ComparePage() {
  const [storeA, setStoreA] = React.useState(storesData[0]?.slug || "");
  const [storeB, setStoreB] = React.useState(storesData[1]?.slug || "");

  useSEO({
    title: "Side-by-Side Store Return Policy Comparisons — 2026 Audit Tool",
    description: "Compare return guidelines, timelines, restocking fees, and receipt rules of any two retailers (e.g. Target vs Walmart, Flipkart vs Myntra, Temu vs AliExpress) side-by-side.",
  });

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storeA && storeB && storeA !== storeB) {
      navigate(`/compare/${storeA}-vs-${storeB}`);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 min-h-[70vh] fade-in space-y-12">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Side-by-Side Return Policy Comparisons
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink-600 leading-relaxed font-medium">
          Confused between two retailers? Select any two brands below to compare their return windows, 
          receipt lookup rules, and restocking fees side-by-side.
        </p>
      </div>

      {/* Selector box */}
      <Card className="max-w-2xl bg-gradient-to-r from-teal-light/20 to-paper">
        <CardContent className="p-6">
          <form onSubmit={handleCompareSubmit} className="grid gap-6 sm:grid-cols-3 items-end">
            <div>
              <label htmlFor="store-a-select" className="block text-xs font-mono font-semibold uppercase tracking-wider text-ink-400 mb-2">
                First Store
              </label>
              <select
                id="store-a-select"
                value={storeA}
                onChange={(e) => setStoreA(e.target.value)}
                className="w-full rounded-md border border-ink-100 bg-white px-3 py-2 text-sm focus:border-teal-brand focus:outline-none"
              >
                {storesData.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="store-b-select" className="block text-xs font-mono font-semibold uppercase tracking-wider text-ink-400 mb-2">
                Second Store
              </label>
              <select
                id="store-b-select"
                value={storeB}
                onChange={(e) => setStoreB(e.target.value)}
                className="w-full rounded-md border border-ink-100 bg-white px-3 py-2 text-sm focus:border-teal-brand focus:outline-none"
              >
                {storesData.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.brand}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="teal" disabled={storeA === storeB} className="w-full h-10">
              Compare Now
            </Button>
          </form>
          {storeA === storeB && (
            <p className="mt-2 text-xs text-signal-no font-medium">Please select two different stores to compare.</p>
          )}
        </CardContent>
      </Card>

      {/* Popular shortcuts */}
      <div className="space-y-4">
        <h3 className="font-display text-sm font-semibold text-ink-400 uppercase tracking-widest font-mono">Popular Comparisons</h3>
        <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
          {POPULAR_COMPARISONS.map((comp) => (
            <Link key={comp.label} href={`/compare/${comp.slugA}-vs-${comp.slugB}`} className="group block">
              <Card className="transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 transform ease-out hover:shadow-receipt hover:border-teal-brand bg-white border border-ink-100 text-center">
                <CardContent className="p-4">
                  <p className="text-sm font-bold text-ink group-hover:text-teal-brand transition-colors">
                    {comp.label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Comprehensive comparisons table */}
      <div className="space-y-4 border-t border-ink-100 pt-8">
        <div>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Retailer Summary Table</h2>
          <p className="text-sm text-ink-400 mt-1">Audit return policies for all stores in our index side-by-side.</p>
        </div>
        <ComparisonDataTable stores={storesData} />
      </div>
    </div>
  );
}
