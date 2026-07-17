import * as React from "react";

interface ComparisonRow {
  feature: string;
  valueA: string;
  valueB: string;
}

interface ComparisonMatrixProps {
  brandA: string;
  brandB: string;
  rows: ComparisonRow[];
}

export function ComparisonMatrix({ brandA, brandB, rows }: ComparisonMatrixProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-ink">Return Matrix Breakdown</h2>
      <div className="overflow-x-auto border border-ink-100 rounded-lg bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-ink-50 text-left border-b border-ink-100 text-ink-400 font-display uppercase tracking-wider text-xs font-semibold">
              <th className="px-4 py-3">Requirement</th>
              <th className="px-4 py-3">{brandA}</th>
              <th className="px-4 py-3">{brandB}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 text-ink-600">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-paper-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-semibold text-ink text-xs md:text-sm">{row.feature}</td>
                <td className="px-4 py-3.5 text-xs md:text-sm font-mono">{row.valueA}</td>
                <td className="px-4 py-3.5 text-xs md:text-sm font-mono">{row.valueB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
