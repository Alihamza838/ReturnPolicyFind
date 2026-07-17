import type { QuickAnswer } from "../../types";
import { formatDate } from "../../lib/utils";

export function QuickAnswerCard({ brand, data, lastVerified }: { brand: string; data: QuickAnswer; lastVerified?: string }) {
  const rows = [
    { label: "Return window", value: data.returnWindow },
    { label: "Receipt required", value: data.receiptRequired ? "Yes" : "No — lookup available" },
    { label: "Restocking fee", value: data.restockingFee ? "Yes, on some items" : "None" },
    { label: "Refund method", value: data.refundMethod },
    { label: "Online returns", value: data.onlineReturns ? "Accepted" : "Not accepted" },
    { label: "In-store returns", value: data.inStoreReturns ? "Accepted" : "Not accepted" },
  ];

  return (
    <div className="receipt-card px-6 pb-6 pt-6 font-mono">
      <p className="mb-4 text-xs uppercase tracking-widest text-ink-400">Quick Answer · {brand}</p>
      <dl className="space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink-100 pb-2">
            <dt className="text-ink-400 text-xs">{row.label}</dt>
            <dd className="text-right font-medium text-ink text-xs flex items-center gap-1.5">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {lastVerified && (
        <div className="mt-5 pt-4 border-t border-dashed border-ink-100 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] text-ink-400 uppercase tracking-widest mb-1 font-bold">Verification Stamp</p>
          <p className="text-[11px] font-bold text-teal-brand uppercase">
            Audited: {formatDate(lastVerified)}
          </p>
          {/* Authentic simulated receipt barcode */}
          <div className="mt-3.5 flex items-center justify-center h-6 gap-[1.5px] opacity-60 hover:opacity-90 transition-opacity" title="Verified Policy Barcode">
            {[1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2].map((w, idx) => (
              <span
                key={idx}
                className="bg-ink"
                style={{
                  width: `${w}px`,
                  height: "100%",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
          <span className="text-[8px] font-mono text-ink-400 mt-1 uppercase tracking-widest">
            * {brand.toUpperCase().replace(/\s+/g, "")}-2026-OK *
          </span>
        </div>
      )}
    </div>
  );
}
