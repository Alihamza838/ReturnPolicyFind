import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Link, navigate } from "../ui/Link";

export function HeroSection() {
  const [query, setQuery] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/stores?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="border-b border-ink-100 bg-gradient-to-b from-teal-light/40 to-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-teal-dark font-semibold">
          Verified Against Official Retailer Guidelines
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl tracking-tight">
          Can you return it? <br className="sm:hidden" />
          <span className="text-teal-brand font-extrabold italic">Find out in 10 seconds.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-600 leading-relaxed">
          Return windows, receipt rules, and refund methods for every major
          US store — no scrolling through fine print required.
        </p>

        <form onSubmit={handleSearchSubmit} className="mx-auto mt-8 flex max-w-md items-center gap-2 px-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a store, e.g. Target, Nike"
              className="w-full rounded-md border border-ink-100 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand transition-all"
            />
          </div>
          <Button type="submit" variant="teal" className="h-[42px]">
            Search
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-sm px-4">
          <span className="text-xs font-mono text-ink-400 uppercase tracking-wide mr-1">Popular:</span>
          {["Target", "Walmart", "DSW", "Amazon", "eBay", "Noon", "Shein", "Costco", "Best Buy"].map((b) => (
            <Link
              key={b}
              href={`/stores/${b.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-xs font-medium text-ink-600 hover:border-teal-brand hover:text-teal-brand transition-all shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
