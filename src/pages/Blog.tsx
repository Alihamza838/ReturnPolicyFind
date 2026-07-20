import * as React from "react";
import { BookOpen } from "lucide-react";
import { Link } from "../components/ui/Link";
import { Card, CardContent } from "../components/ui/card";
import { guidesData } from "../data/guides";
import { formatDate } from "../lib/utils";
import { useSEO } from "../hooks/useSEO";

const CATEGORIES = ["all", "how-to", "comparison", "seasonal", "consumer-rights", "glossary"];

export function BlogPage() {
  const [selectedCat, setSelectedCat] = React.useState("all");

  useSEO({
    title: "Expert Retail Return Policy Guides — Consumer Resource Center",
    description: "Browse our expert library of return policy guides, consumer protection legal audits, worn items exchange rules, and holiday timelines.",
  });

  const filtered = selectedCat === "all"
    ? guidesData
    : guidesData.filter((g) => g.category === selectedCat);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 min-h-[70vh] fade-in space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Retail Return Policy Insights & Guides
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink-600 max-w-2xl font-medium">
          Expert guides decoding legal rights, fine print loopholes, and seasonal return extensions 
          for major retailers.
        </p>
      </div>

      {/* Category filters list */}
      <div className="flex flex-wrap gap-2 border-b border-ink-100 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize font-mono transition-all cursor-pointer ${
              selectedCat === cat
                ? "bg-teal-brand text-white shadow-sm"
                : "bg-white border border-ink-100 text-ink-600 hover:border-teal-brand hover:text-teal-brand"
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Guides Grid list */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((guide) => {
          return (
            <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group block">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-out hover:shadow-receipt hover:border-teal-brand bg-white border border-ink-100 flex flex-col">
                {/* 
                  To use your custom image, place your file at `/public/images/guides/${guide.slug}.png`
                  and uncomment the image code block below, commenting out the placeholder div.
                */}
                <div className="relative w-full h-44 bg-[#FAF8F3] border-b border-ink-50 overflow-hidden flex flex-col justify-center items-center text-center p-4">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14213D_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                  <div className="space-y-1 relative z-10">
                    <span className="inline-block text-[8px] font-mono font-bold uppercase tracking-widest text-teal-brand/80 bg-teal-light/40 border border-teal-brand/10 px-2 py-0.5 rounded">
                      /public/images/guides/{guide.slug}.png
                    </span>
                    <p className="text-[10px] font-display font-bold text-[#14213D] leading-tight line-clamp-1">
                      {guide.title} Visual
                    </p>
                  </div>
                  
                  <img
                    src={`/public/images/guides/${guide.slug}.png`}
                    alt={guide.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                 
                </div>
                <CardContent className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-brand font-bold bg-teal-light/50 border border-teal-light/80 px-2 py-0.5 rounded-full">
                    {guide.category.replace("-", " ")}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight text-ink group-hover:text-teal-brand transition-colors mt-3">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
                <div className="text-xs text-ink-400 font-medium flex items-center gap-1 border-t border-ink-50 pt-3">
                  <span>Updated {formatDate(guide.updatedAt)}</span>
                  <span>·</span>
                  <span>{guide.readingTime} read</span>
                </div>
              </CardContent>
            </Card>
          </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-ink-100 mx-auto mb-3" />
          <p className="text-ink-400 font-medium">No guides found under this category yet.</p>
        </div>
      )}
    </div>
  );
}
