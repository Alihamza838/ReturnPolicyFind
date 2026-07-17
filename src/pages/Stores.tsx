import * as React from "react";
import { Search } from "lucide-react";
import { storesData } from "../data/stores";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "../components/ui/Link";
import { useSEO } from "../hooks/useSEO";
import { StaggerContainer, StaggerItem } from "../components/layout/PageTransition";
import { calculatePolicyGrade } from "../lib/utils";

export function StoresPage() {
  const [searchVal, setSearchVal] = React.useState("");
  const [currentQuery, setCurrentQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("All");

  useSEO({
    title: "All Retailer Return Policies Directory — Global 2026 Index",
    description: "Browse our comprehensive directory of 2026 verified store return, refund, and exchange policies. Search and filter across major international platforms in the US, India, Pakistan, Canada, and China.",
  });

  // Read search query from URL search parameters on popstate / load
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("q") || "";
    setSearchVal(queryParam);
    setCurrentQuery(queryParam.toLowerCase().trim());

    // Setup an event listener for popstate to sync URL search with input state
    const handlePopState = () => {
      const liveParams = new URLSearchParams(window.location.search);
      const liveQuery = liveParams.get("q") || "";
      setSearchVal(liveQuery);
      setCurrentQuery(liveQuery.toLowerCase().trim());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchVal.trim();
    if (cleanQuery) {
      window.history.pushState({}, "", `/stores?q=${encodeURIComponent(cleanQuery)}`);
    } else {
      window.history.pushState({}, "", "/stores");
    }
    const popEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popEvent);
  };

  const filtered = storesData.filter((s) => {
    const matchesSearch = currentQuery ? s.brand.toLowerCase().includes(currentQuery) : true;
    const storeCountry = s.country || "US";
    const matchesCountry = selectedCountry === "All" ? true : storeCountry === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 min-h-[60vh] fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">All Store Return Policies</h1>
        <p className="mt-2 max-w-2xl text-ink-600 text-sm md:text-base leading-relaxed">
          Browse verified return, refund, and exchange guidelines for major US and international retailers. 
          Every directory page is double-checked against official policy terms.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-sm flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search a store..."
              className="w-full rounded-md border border-ink-100 bg-white py-2 pl-9 pr-3 text-sm shadow-2xs focus:border-teal-brand focus:outline-none"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-ink text-white font-medium text-sm rounded-md hover:bg-ink-600 transition-colors cursor-pointer">
            Filter
          </button>
        </form>

        {/* Country Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { code: "All", name: "All", flag: "🌐" },
            { code: "US", name: "United States", flag: "🇺🇸" },
            { code: "CA", name: "Canada", flag: "🇨🇦" },
            { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
            { code: "AU", name: "Australia", flag: "🇦🇺" },
            { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
            { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
            { code: "PK", name: "Pakistan", flag: "🇵🇰" },
            { code: "IN", name: "India", flag: "🇮🇳" },
            { code: "CN", name: "China", flag: "🇨🇳" },
          ].map((cty) => {
            const count = storesData.filter((s) => (cty.code === "All" ? true : (s.country || "US") === cty.code)).length;
            const active = selectedCountry === cty.code;
            return (
              <button
                key={cty.code}
                onClick={() => setSelectedCountry(cty.code)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  active
                    ? "bg-teal-brand text-white shadow-2xs"
                    : "bg-white border border-ink-100 text-ink-600 hover:border-teal-brand hover:text-teal-brand"
                }`}
              >
                <span>{cty.flag}</span>
                <span className="hidden sm:inline">{cty.name}</span>
                <span className={`text-[10px] font-mono font-medium rounded-full px-1.5 py-0.2 ${active ? "bg-white/20 text-white" : "bg-ink-50 text-ink-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {/* Dynamic Search Route Guides (GEO/AEO friendly) */}
        {(currentQuery.includes("dubai") || currentQuery.includes("uae") || currentQuery.includes("saudi") || currentQuery.includes("ksa") || currentQuery.includes("noon") || currentQuery.includes("shein") || currentQuery.includes("middle")) && (
          <div className="mb-6 p-4 rounded-lg border border-teal-brand/20 bg-teal-light/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase bg-teal-brand text-white px-2 py-0.5 rounded tracking-wide">Featured 2026 Guide</span>
              <h4 className="font-bold text-[#14213D] text-sm sm:text-base mt-1.5">Dubai & Saudi Arabia E-Commerce Returns Showdown</h4>
              <p className="text-xs text-ink-600 mt-1">Read our deep-dives on Amazon, Noon, eBay, Etsy, and Shein returns in Dubai (UAE) and Saudi Arabia (KSA).</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/blog/dubai-e-commerce-return-policy-guide-2026">
                <button className="px-3 py-1.5 bg-teal-brand text-white text-xs font-semibold rounded hover:bg-teal-dark transition-colors cursor-pointer">
                  Dubai 🇦🇪 Guide
                </button>
              </Link>
              <Link href="/blog/saudia-e-commerce-return-policy-guide-2026">
                <button className="px-3 py-1.5 bg-teal-brand text-white text-xs font-semibold rounded hover:bg-teal-dark transition-colors cursor-pointer">
                  Saudi 🇸🇦 Guide
                </button>
              </Link>
            </div>
          </div>
        )}

        {(currentQuery.includes("ebay") || currentQuery.includes("global") || currentQuery.includes("international") || currentQuery.includes("country")) && (
          <div className="mb-6 p-4 rounded-lg border border-teal-brand/20 bg-teal-light/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase bg-teal-brand text-white px-2 py-0.5 rounded tracking-wide">Featured 2026 Guide</span>
              <h4 className="font-bold text-[#14213D] text-sm sm:text-base mt-1.5">eBay Global Return Policy & Guarantee</h4>
              <p className="text-xs text-ink-600 mt-1">Get the complete country-by-country breakdown of eBay's return regulations (US, UK, CA, AU, UAE, KSA).</p>
            </div>
            <Link href="/blog/ebay-global-return-policy-all-countries-2026" className="shrink-0">
              <button className="px-3 py-1.5 bg-teal-brand text-white text-xs font-semibold rounded hover:bg-teal-dark transition-colors cursor-pointer">
                Read Global Guide 🌐
              </button>
            </Link>
          </div>
        )}

        <p className="text-xs font-mono text-ink-400 uppercase tracking-wider mb-4">
          {filtered.length} verified {filtered.length === 1 ? "policy" : "policies"} 
          {currentQuery ? ` found matching "${searchVal}"` : " loaded"}
        </p>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => {
            const gradeInfo = calculatePolicyGrade(store.quickAnswer);
            return (
              <StaggerItem key={store.slug} className="h-full">
                <Link href={`/stores/${store.slug}`} className="group block h-full">
                  <Card className="h-full border border-ink-100 hover:border-teal-brand bg-white hover:bg-teal-light/5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-out hover:shadow-receipt flex flex-col justify-between relative overflow-hidden">
                    <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                      {/* Card Header */}
                      <div>
                        <div className="flex justify-between items-center gap-2 mb-2">
                          <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2 py-0.5 rounded border border-[#2A6F77]/20">
                            ✓ Verified {store.lastVerified.split("-")[1]}/{store.lastVerified.split("-")[0]}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-mono font-extrabold px-1.5 py-0.2 rounded border ${gradeInfo.colorClass} ${gradeInfo.bgClass}`} title={gradeInfo.label}>
                              Grade {gradeInfo.grade}
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
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#14213D] group-hover:text-teal-brand transition-colors tracking-tight">
                          {store.brand}
                        </h3>
                      </div>

                      {/* Fact Sheet Grid (GEO/AEO friendly) */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-y border-ink-50 py-3 font-sans">
                        <div>
                          <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Return Window</span>
                          <span className="font-bold text-[#14213D] line-clamp-1">{store.quickAnswer.returnWindow}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Receipt Required</span>
                          <span className="font-semibold text-ink-600">
                            {store.quickAnswer.receiptRequired ? "⚠️ Mandatory" : "✓ No / Lookup"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Restocking Fee</span>
                          <span className={`font-semibold ${store.quickAnswer.restockingFee ? "text-amber-brand" : "text-emerald-600"}`}>
                            {store.quickAnswer.restockingFee ? "Yes (Applicable)" : "No (0$ Fee)"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-ink-400 uppercase tracking-wider">Refund Method</span>
                          <span className="text-ink-500 truncate block">{store.quickAnswer.refundMethod.split(" or ")[0]}</span>
                        </div>
                      </div>

                      {/* Badges / Exclusions Summary */}
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
                      <div className="text-xs text-ink-400 flex flex-wrap gap-1 border-t border-ink-50 pt-2.5">
                        {store.category.map((cat) => (
                          <span key={cat} className="capitalize text-[9px] bg-ink-50/50 text-ink-400 font-mono px-2 py-0.5 rounded-full">
                            #{cat.replace("-", "")}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="text-center py-12 border border-dashed border-ink-100 rounded-lg bg-white mt-4">
            <p className="text-ink-400 font-medium text-sm">No matching retailers found in our directory.</p>
            <button
              onClick={() => {
                setSearchVal("");
                window.history.pushState({}, "", "/stores");
                const popEvent = new PopStateEvent("popstate");
                window.dispatchEvent(popEvent);
              }}
              className="mt-3 text-teal-brand hover:underline font-semibold text-xs cursor-pointer"
            >
              Clear filter and view all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
