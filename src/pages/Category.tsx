import { storesData } from "../data/stores";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { CATEGORIES } from "../constants";
import { useSEO } from "../hooks/useSEO";

const CATEGORY_NAMES: Record<string, { title: string; desc: string; image: string }> = {
  "department-stores": {
    title: "Department Store Return Policies",
    desc: "Compare return windows and receipt regulations across top US multi-category department stores.",
    image: "/public/images/category/department-stores.png",
  },
  "electronics": {
    title: "Consumer Electronics Return Policies",
    desc: "Be careful with tech — electronics usually carry tighter windows (15 to 90 days) and restocking fees.",
    image: "/public/images/category/electronics.png",
  },
  "activewear": {
    title: "Activewear & Sporting Goods Policies",
    desc: "Guides for worn shoe exchanges, brand satisfaction guarantees, and specialized sportswear policies.",
    image: "/public/images/category/activewear.png",
  },
  "beauty": {
    title: "Beauty & Cosmetics Return Policies",
    desc: "Can you return swatched or opened makeup? Find out which stores allow product testing.",
    image: "/public/images/category/beauty.png",
  },
  "marketplaces": {
    title: "Online Marketplaces Return Policies",
    desc: "Return frameworks for large digital marketplaces with multiple third-party merchants.",
    image: "/public/images/category/marketplaces.png",
  },
};

export function CategoryPage({ slug }: { slug: string }) {
  const catMeta = CATEGORY_NAMES[slug] || {
    title: `${slug.replace("-", " ")} Return Policies`,
    desc: `Curated return policy guidelines for retailers belonging to the ${slug.replace("-", " ")} category.`,
    image: `/public/images/category/${slug}.png`,
  };

  const filtered = storesData.filter((s) => s.category.includes(slug));

  useSEO({
    title: `${catMeta.title} — Verified 2026 Directory`,
    description: `${catMeta.desc} Review timeline windows, original receipt rules, and holiday extensions.`,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 min-h-[60vh] fade-in">
      <div className="mb-8 border-b border-ink-100 pb-6">
        <h1 className="font-display text-3xl font-extrabold capitalize text-ink sm:text-4xl">
          {catMeta.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm md:text-base text-ink-600 leading-relaxed font-medium">
          {catMeta.desc}
        </p>
        
        {/*
          To use a custom image, save it at `/public/images/category/${slug}.png` and uncomment the <img> tag inside.
          Currently displaying an elegant, ultra-fast CSS-based responsive placeholder container as requested.
        */}
        <div className="mt-6 relative overflow-hidden rounded-xl border border-dashed border-teal-brand/30 bg-[#FAF8F3] h-40 sm:h-48 md:h-56 w-full shadow-3xs flex flex-col items-center justify-center p-6 text-center group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14213D_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          <div className="relative space-y-1.5 max-w-md">
            <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-teal-brand bg-teal-light/40 border border-teal-brand/20 px-2.5 py-0.5 rounded">
              Ready for /public/images/category/{slug}.png
            </span>
            <h4 className="text-sm font-display font-bold text-[#14213D]">{catMeta.title} Visual Space</h4>
            <p className="text-[11px] text-[#14213D]/60">This high-contrast container is optimized for ultra-fast loading speeds and core web vitals. Place your custom asset here later!</p>
          </div>
          {/*
          <img 
            src={`/public/images/category/${slug}.png`} 
            alt={catMeta.title} 
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 hover:scale-[1.01] transition-transform duration-500 ease-out"
          />
          */}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => (
            <Link key={store.slug} href={`/stores/${store.slug}`} className="group block">
              <Card className="h-full border border-ink-100 hover:border-teal-brand bg-white hover:bg-teal-light/5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-out hover:shadow-receipt flex flex-col justify-between">
                <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                  {/* Card Header */}
                  <div>
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2 py-0.5 rounded border border-[#2A6F77]/20">
                        ✓ Verified {store.lastVerified.split("-")[1]}/{store.lastVerified.split("-")[0]}
                      </span>
                      <span className="text-sm shrink-0 flex items-center gap-1" title={store.countryName || "United States"}>
                        <span className="text-xs text-ink-400 font-mono font-medium">{store.country || "US"}</span>
                        <span>
                          {(store.country === "CA" && "🇨🇦") ||
                           (store.country === "UK" && "🇬🇧") ||
                           (store.country === "AU" && "🇦🇺") ||
                           (store.country === "AE" && "🇦🇪") ||
                           (store.country === "SA" && "🇸🇦") ||
                           (store.country === "PK" && "🇵🇰") ||
                           (store.country === "IN" && "🇮🇳") ||
                           (store.country === "CN" && "🇨🇳") ||
                           "🇺🇸"}
                        </span>
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-ink group-hover:text-teal-brand transition-colors tracking-tight">
                      {store.brand}
                    </h3>
                  </div>

                  {/* Fact Sheet Grid (GEO/AEO friendly) */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-y border-ink-100 py-3 font-sans">
                    <div>
                      <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Return Window</span>
                      <span className="font-bold text-ink line-clamp-1">{store.quickAnswer.returnWindow}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Receipt Required</span>
                      <span className="font-semibold text-ink-600">
                        {store.quickAnswer.receiptRequired ? "⚠️ Mandatory" : "✓ No / Lookup"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Restocking Fee</span>
                      <span className={`font-semibold ${store.quickAnswer.restockingFee ? "text-amber-brand" : "text-[#1E7B57]"}`}>
                        {store.quickAnswer.restockingFee ? "Yes (Applicable)" : "No (0$ Fee)"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Refund Method</span>
                      <span className="text-ink-600 truncate block">{store.quickAnswer.refundMethod.split(" or ")[0]}</span>
                    </div>
                  </div>

                  {/* Exclusions / Badges */}
                  {store.badges && store.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {store.badges.slice(0, 2).map((b, idx) => (
                        <span
                          key={idx}
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                            b.status === "yes"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : b.status === "warning"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-ink-50 text-ink-500 border-ink-200"
                          }`}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer categories */}
                  <div className="text-xs text-ink-400 flex flex-wrap gap-1 border-t border-ink-100 pt-2.5">
                    {store.category.map((cat) => (
                      <span key={cat} className="capitalize text-[9px] bg-slate-100 text-ink-400 font-mono px-2 py-0.5 rounded-full">
                        #{cat.replace("-", "")}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-ink-100 rounded-lg bg-white">
          <p className="text-ink-400 font-medium text-sm">No retailers found under this category.</p>
          <Link href="/stores" className="mt-4 inline-block">
            <Button variant="teal">Browse All Stores</Button>
          </Link>
        </div>
      )}

      {/* Silo Recirculation: Other Categories */}
      <div className="mt-16 border-t border-ink-100 pt-10">
        <h2 className="font-display text-lg font-bold text-[#14213D] mb-4">
          Browse by Department / Sector
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}>
              <Button
                variant={slug === cat.slug ? "teal" : "outline"}
                className={`text-xs py-1.5 px-3.5 font-sans font-medium cursor-pointer ${
                  slug === cat.slug
                    ? "bg-[#2A6F77] text-white"
                    : "bg-white text-ink border-ink-100 hover:border-teal-brand hover:text-teal-brand"
                }`}
              >
                {cat.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
