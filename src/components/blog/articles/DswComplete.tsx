import * as React from "react";
import { Link } from "../../ui/Link";

export default function DswComplete() {
  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed">
        DSW (Designer Shoe Warehouse) offers an incredibly robust return policy, designed specifically with footwear shoppers in mind.
      </p>

      <div className="p-4 bg-teal-brand/5 border border-teal-brand/20 rounded-lg">
        <h3 className="font-display font-bold text-ink text-base mb-1">⏱️ DSW Return Summary</h3>
        <p className="text-sm text-ink-600 leading-relaxed">
          Standard customers receive a <strong>90-day return window</strong> for a full refund. DSW VIP members at the highest tier (Elite) get an extended <strong>365-day return window</strong>, alongside free return shipping.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Condition requirements</h3>
      <p className="text-ink-600 leading-relaxed">
        Shoes must be in unworn, brand-new condition, and returned inside their original shoebox. Footwear showing visible signs of outdoor wear or sole scuffs will generally be rejected or offered as a partial store credit.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">VIP Loyalty Program Extensions</h3>
      <p className="text-ink-600 leading-relaxed">
        DSW's free VIP program significantly enhances consumer return terms:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-ink-600">
        <li><strong>Club Members (Free)</strong>: 90 days with standard terms, but earns points.</li>
        <li><strong>Gold Members ($200+ spend)</strong>: 90 days with free online return shipping labels.</li>
        <li><strong>Elite Members ($500+ spend)</strong>: Full 365-day return window with free return shipping.</li>
      </ul>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">No receipt returns</h3>
      <p className="text-ink-600 leading-relaxed">
        If you don't have a receipt, DSW store associates can easily query your purchase history using your VIP member phone number, email, or original payment card details.
      </p>

      <div className="pt-4 border-t border-ink-100 flex flex-col gap-2">
        <p className="text-xs text-ink-400">Related Internal Links:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/stores/dsw" className="text-xs text-teal-brand font-medium hover:underline">
            View full DSW store profile →
          </Link>
          <Link href="/blog/nike-return-policy-worn-shoes" className="text-xs text-teal-brand font-medium hover:underline">
            Nike Worn Shoes Return Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
