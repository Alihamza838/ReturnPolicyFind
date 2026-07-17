import * as React from "react";
import { RefreshCw } from "lucide-react";

interface StoreOption {
  slug: string;
  brand: string;
  country?: string;
}

interface QuickCompareWidgetProps {
  currentBrand: string;
  currentSlug: string;
  storesList: StoreOption[];
}

export function QuickCompareWidget({ currentBrand, currentSlug, storesList }: QuickCompareWidgetProps) {
  const options = storesList.filter((s) => s.slug !== currentSlug);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const secondSlug = e.target.value;
    if (secondSlug) {
      window.history.pushState({}, "", `/compare/${currentSlug}-vs-${secondSlug}`);
      const popEvent = new PopStateEvent("popstate");
      window.dispatchEvent(popEvent);
    }
  };

  return (
    <div className="bg-white border border-ink-100 rounded-lg p-5 space-y-4 shadow-2xs">
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-teal-brand animate-spin-hover" />
        <h4 className="font-display text-base font-bold text-ink">⚡ Quick Compare</h4>
      </div>
      <p className="text-xs text-ink-600 leading-relaxed">
        Instantly compare {currentBrand}'s guidelines side-by-side with another major retailer.
      </p>
      <div>
        <label className="block text-[10px] font-mono text-ink-400 uppercase mb-1">Select Store</label>
        <select
          className="w-full text-sm bg-white border border-ink-100 rounded-md p-2 focus:outline-none focus:border-teal-brand text-ink cursor-pointer"
          onChange={handleSelect}
          defaultValue=""
        >
          <option value="" disabled>
            -- Compare side-by-side --
          </option>
          {options.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.brand} {s.country ? `(${s.country})` : "(US)"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
