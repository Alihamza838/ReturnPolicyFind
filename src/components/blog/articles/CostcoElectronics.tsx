import  React from "react";
import { Link } from "../../ui/Link";

export default function CostcoElectronics() {
  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed">
        Costco is famous for its generous return policies, but technology is the one major place where rules tighten.
      </p>

      <div className="p-4 bg-teal-brand/5 border border-teal-brand/20 rounded-lg">
        <h3 className="font-display font-bold text-ink text-base mb-1">⏱️ Quick Summary</h3>
        <p className="text-sm text-ink-600 leading-relaxed">
          Most Costco merchandise has no stated return deadline, but TVs, computers, cameras, and similar electronics are capped at <strong>90 days</strong> from purchase regardless of membership tenure.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">The general satisfaction guarantee</h3>
      <p className="text-ink-600 leading-relaxed">
        For 99% of items, Costco has an open-ended "satisfaction guarantee" with no time limit. You can bring a rug or a set of pans back years later if they did not meet expectations.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">The strict 90-day electronics cap</h3>
      <p className="text-ink-600 leading-relaxed">
        All consumer electronics have a strict 90-day return limit. This includes:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-ink-600">
        <li>Television sets and computer monitors</li>
        <li>Laptops, desktops, and tablet devices</li>
        <li>Digital cameras and camcorders</li>
        <li>Smartwatches and health trackers</li>
        <li>Smart home consoles and major soundbars</li>
      </ul>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Returning without packaging</h3>
      <p className="text-ink-600 leading-relaxed">
        Unlike standard retailers, Costco is extremely accommodating with open-box returns. They will accept electronics without the original retail box, provided you have all critical components (cords, remote, chargers) and can prove your membership.
      </p>

      <div className="pt-4 border-t border-ink-100 flex flex-col gap-2">
        <p className="text-xs text-ink-400">Related Internal Links:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/stores/costco" className="text-xs text-teal-brand font-medium hover:underline">
            View full Costco store profile →
          </Link>
          <Link href="/blog/best-buy-return-policy-open-box" className="text-xs text-teal-brand font-medium hover:underline">
            Best Buy Open Box Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
