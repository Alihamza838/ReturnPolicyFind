import { ArrowLeft } from "lucide-react";
import { Link } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { storesData } from "../data/stores";
import { useSEO } from "../hooks/useSEO";
import { ComparisonCard } from "../components/compare/ComparisonCard";
import { ComparisonMatrix } from "../components/compare/ComparisonMatrix";
import { ComparisonVerdict } from "../components/compare/ComparisonVerdict";

export function CompareDetailPage({ brandA, brandB }: { brandA: string; brandB: string }) {
  const storeA = storesData.find((s) => s.slug === brandA);
  const storeB = storesData.find((s) => s.slug === brandB);

  if (!storeA || !storeB) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-2xl font-bold text-ink">Comparison Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          One or both of the brands selected for comparison are not in our database yet.
        </p>
        <Link href="/compare" className="mt-6">
          <Button variant="teal">Back to Comparison Center</Button>
        </Link>
      </div>
    );
  }

  useSEO({
    title: `${storeA.brand} vs ${storeB.brand} Return Policy: Which is Better? (2026)`,
    description: `Side-by-side comparison between ${storeA.brand} and ${storeB.brand} return policies. Review their return windows (${storeA.quickAnswer.returnWindow} vs ${storeB.quickAnswer.returnWindow}), receipt mandates, restocking fees, and online shipping labels.`,
  });

  const comparisonRows = [
    {
      feature: "Standard Return Window",
      valueA: storeA.quickAnswer.returnWindow,
      valueB: storeB.quickAnswer.returnWindow,
    },
    {
      feature: "Receipt Requirement",
      valueA: storeA.quickAnswer.receiptRequired ? "Strict Receipt Required" : "No — Card lookup available",
      valueB: storeB.quickAnswer.receiptRequired ? "Strict Receipt Required" : "No — Card lookup available",
    },
    {
      feature: "Restocking Fee",
      valueA: storeA.quickAnswer.restockingFee ? "Charged on select items" : "No restocking fees",
      valueB: storeB.quickAnswer.restockingFee ? "Charged on select items" : "No restocking fees",
    },
    {
      feature: "Refund Settle Method",
      valueA: storeA.quickAnswer.refundMethod,
      valueB: storeB.quickAnswer.refundMethod,
    },
    {
      feature: "In-Store Drop-offs",
      valueA: storeA.quickAnswer.inStoreReturns ? "Yes — instant refunds" : "No",
      valueB: storeB.quickAnswer.inStoreReturns ? "Yes — instant refunds" : "No",
    },
    {
      feature: "Online Postal Mail",
      valueA: storeA.quickAnswer.onlineReturns ? "Yes — prepaid label available" : "No",
      valueB: storeB.quickAnswer.onlineReturns ? "Yes — prepaid label available" : "No",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 fade-in space-y-10">
      {/* Back link */}
      <p className="text-xs font-mono">
        <Link href="/compare" className="text-teal-brand font-semibold hover:underline flex items-center gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Comparison Center</span>
        </Link>
      </p>

      {/* Header */}
      <div className="border-b border-ink-100 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink tracking-tight sm:text-4xl md:text-5xl text-center">
          {storeA.brand} vs {storeB.brand}
        </h1>
        <p className="mt-3 text-center text-sm md:text-base text-ink-600 max-w-2xl mx-auto font-medium">
          Which store makes returns easier? Let&apos;s compare the refund policy rules, 
          lookup capabilities, and return deadlines side-by-side.
        </p>
      </div>

      {/* Grid Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <ComparisonCard
          brand={storeA.brand}
          slug={storeA.slug}
          lastVerified={storeA.lastVerified}
          returnWindow={storeA.quickAnswer.returnWindow}
          badges={storeA.badges}
          borderClass="border-t-teal-brand"
          bgClass="bg-teal-light/20"
          textClass="text-teal-dark"
        />

        <ComparisonCard
          brand={storeB.brand}
          slug={storeB.slug}
          lastVerified={storeB.lastVerified}
          returnWindow={storeB.quickAnswer.returnWindow}
          badges={storeB.badges}
          borderClass="border-t-teal-dark"
          bgClass="bg-teal-dark/10"
          textClass="text-teal-brand"
        />
      </div>

      {/* Side by Side Matrix */}
      <ComparisonMatrix brandA={storeA.brand} brandB={storeB.brand} rows={comparisonRows} />

      {/* Bottom Insights */}
      <ComparisonVerdict
        brandA={storeA.brand}
        countryNameA={storeA.countryName}
        brandB={storeB.brand}
        countryNameB={storeB.countryName}
        returnWindowA={storeA.quickAnswer.returnWindow}
        returnWindowB={storeB.quickAnswer.returnWindow}
        onlineReturnsA={storeA.quickAnswer.onlineReturns}
        receiptRequiredA={storeA.quickAnswer.receiptRequired}
        restockingFeeB={storeB.quickAnswer.restockingFee}
      />
    </div>
  );
}
