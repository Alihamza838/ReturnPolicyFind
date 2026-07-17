import * as React from "react";
import { AlertCircle } from "lucide-react";

interface ComparisonVerdictProps {
  brandA: string;
  countryNameA?: string;
  brandB: string;
  countryNameB?: string;
  returnWindowA: string;
  returnWindowB: string;
  onlineReturnsA?: boolean;
  receiptRequiredA?: boolean;
  restockingFeeB?: boolean;
}

export function ComparisonVerdict({
  brandA,
  countryNameA,
  brandB,
  countryNameB,
  returnWindowA,
  returnWindowB,
  onlineReturnsA,
  receiptRequiredA,
  restockingFeeB,
}: ComparisonVerdictProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-6 border border-ink-100 shadow-2xs space-y-3">
      <h3 className="font-display text-lg font-bold text-ink mb-1 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-teal-brand" />
        The Editorial Verdict
      </h3>
      <p className="text-sm text-ink-600 leading-relaxed font-sans font-medium">
        Comparing <strong className="text-ink">{brandA}</strong> (operating in{" "}
        <span className="font-mono text-xs font-semibold">{countryNameA || "United States"}</span>) and{" "}
        <strong className="text-ink">{brandB}</strong> (operating in{" "}
        <span className="font-mono text-xs font-semibold">{countryNameB || "United States"}</span>):
      </p>
      <div className="grid gap-4 sm:grid-cols-2 text-xs font-sans mt-2">
        <div className="p-3 bg-white border border-ink-100 rounded">
          <h4 className="font-bold text-ink mb-1">⏱️ Window & Remorse Advantage</h4>
          <p className="text-ink-600">
            <strong>{brandA}</strong> offers a <strong>{returnWindowA}</strong> window, while{" "}
            <strong>{brandB}</strong> limits or extends to <strong>{returnWindowB}</strong>.{" "}
            {onlineReturnsA && "Online returns are supported with convenient domestic label generation."}
          </p>
        </div>
        <div className="p-3 bg-white border border-ink-100 rounded">
          <h4 className="font-bold text-ink mb-1">📋 Proof & Fee Risk</h4>
          <p className="text-ink-600">
            {receiptRequiredA
              ? `⚠️ Note that ${brandA} strictly mandates receipt verification.`
              : `✓ ${brandA} has easier credit card lookup or soft verification.`}{" "}
            {restockingFeeB
              ? `Additionally, be aware that ${brandB} may charge restocking fees on specific electronics/apparel.`
              : `${brandB} operates with $0 restocking fees for returned merchandise.`}
          </p>
        </div>
      </div>
      <p className="text-xs text-ink-400 font-mono mt-2 leading-relaxed">
        Consumer Tip: Always pack your return in original shipping bags or manufacturer boxes. For cross-border
        platforms like{" "}
        {brandA === "Temu" || brandA === "AliExpress" || brandB === "Temu"
          ? "Temu and AliExpress"
          : "international sites"}
        , drop-offs can be processed for free at local country logistics hubs without paying international post to
        China.
      </p>
    </div>
  );
}
