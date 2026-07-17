import { Card, CardContent } from "../ui/card";
import { Link } from "../ui/Link";
import type { StoreFrontmatter } from "../../types";
import { StaggerContainer, StaggerItem } from "../layout/PageTransition";
import { calculatePolicyGrade } from "../../lib/utils";

export function FeaturedStores({ stores }: { stores: StoreFrontmatter[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl tracking-tight">Popular Return Policies</h2>
          <p className="text-sm text-ink-400 mt-1">Direct access to verified 2026 consumer audit terms and refund windows.</p>
        </div>
        <Link href="/stores" className="text-sm font-semibold text-teal-brand hover:underline shrink-0">
          View all stores →
        </Link>
      </div>
      
      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => {
          const gradeInfo = calculatePolicyGrade(store.quickAnswer);
          return (
            <StaggerItem key={store.slug} className="h-full">
              <Link href={`/stores/${store.slug}`} className="group block h-full">
                <Card className="h-full border border-ink-100 hover:border-teal-brand bg-white hover:bg-teal-light/5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-out hover:shadow-receipt flex flex-col justify-between relative overflow-hidden">
                  <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                    {/* Header */}
                    <div>
                      <div className="flex justify-between items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase bg-teal-light/30 text-teal-dark px-2 py-0.5 rounded border border-teal-brand/20 font-bold">
                          ✓ Verified 2026
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono font-extrabold px-1.5 py-0.2 rounded border ${gradeInfo.colorClass} ${gradeInfo.bgClass}`} title={gradeInfo.label}>
                            Grade {gradeInfo.grade}
                          </span>
                          <span className="text-xs shrink-0 flex items-center gap-1 font-mono text-ink-400">
                            <span>{store.country || "US"}</span>
                            <span>
                              {(store.country === "CA" && "🇨🇦") ||
                               (store.country === "UK" && "🇬🇧") ||
                               (store.country === "AU" && "🇦🇺") ||
                               (store.country === "AE" && "🇦🇪") ||
                               (store.country === "SA" && "🇸🇦") ||
                               "🇺🇸"}
                            </span>
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-teal-brand transition-colors tracking-tight">
                        {store.brand}
                      </h3>
                    </div>

                {/* Return Fact Sheet */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-y border-ink-100 py-3 font-sans bg-slate-50/50 -mx-5 px-5">
                  <div>
                    <span className="block text-[9px] font-mono text-ink-400 uppercase tracking-wider">Return Window</span>
                    <span className="font-bold text-ink line-clamp-1 text-[11px]">{store.quickAnswer.returnWindow}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-ink-400 uppercase tracking-wider">Receipt Policy</span>
                    <span className="font-semibold text-ink-600 text-[11px]">
                      {store.quickAnswer.receiptRequired ? "⚠️ Mandatory" : "✓ Easy Lookup"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-ink-400 uppercase tracking-wider">Restocking Fee</span>
                    <span className={`font-semibold text-[11px] ${store.quickAnswer.restockingFee ? "text-amber-700" : "text-emerald-700"}`}>
                      {store.quickAnswer.restockingFee ? "Yes (Varies)" : "No ($0 Fee)"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-ink-400 uppercase tracking-wider">Refund Method</span>
                    <span className="text-ink-600 truncate block text-[11px]" title={store.quickAnswer.refundMethod}>
                      {store.quickAnswer.refundMethod.split(" or ")[0]}
                    </span>
                  </div>
                </div>

                {/* Badges / Micro Labels */}
                {store.badges && store.badges.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {store.badges.slice(0, 2).map((b, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm border ${
                          b.status === "yes"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : b.status === "warning"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-ink-50 text-ink-500 border-ink-100"
                        }`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="h-4"></div>
                )}

                {/* Categories */}
                <div className="text-[10px] text-ink-400 flex flex-wrap gap-1 border-t border-ink-100 pt-2.5">
                  {store.category.map((cat) => (
                    <span key={cat} className="capitalize text-[9px] bg-slate-100 text-ink-400 font-mono px-2 py-0.5 rounded-full">
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
    </section>
  );
}

