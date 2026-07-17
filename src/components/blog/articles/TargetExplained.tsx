import * as React from "react";
import { Link } from "../../ui/Link";

export default function TargetExplained() {
  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed">
        Target runs one of the more layered return policies among major department stores — the window you get depends on what you bought and how you're shopping.
      </p>

      <div className="p-4 bg-teal-brand/5 border border-teal-brand/20 rounded-lg">
        <h3 className="font-display font-bold text-ink text-base mb-1">⏱️ Quick Summary</h3>
        <p className="text-sm text-ink-600 leading-relaxed">
          Target gives <strong>90 days</strong> on most items and a generous <strong>365 days</strong> on Target-owned brands (such as Cat & Jack, Good & Gather, and Threshold), with Circle members getting an extra 30 days on top of either window.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Two windows, not one</h3>
      <p className="text-ink-600 leading-relaxed">
        Most general merchandise gets a 90-day return window. Target's own private-label brands — All in Motion, Cat & Jack, Universal Thread, and others — get a full 365 days with a receipt, a rare policy for basics that most shoppers wear out and replace anyway.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Loyalty tiers stack on top</h3>
      <p className="text-ink-600 leading-relaxed">
        Target Circle 360 members receive an additional 30 days layered onto both windows, pushing the standard window to 120 days and the Target-brand window close to 395 days. RedCard holders get a similar, smaller bump.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">No receipt isn't a dead end</h3>
      <p className="text-ink-600 leading-relaxed">
        If you're signed into your Target account and used a linked card or the RedCard, Target can typically look up the purchase without a physical receipt. Where that's not possible, expect the return to be handled as store credit rather than a refund to your original payment method.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Holiday purchases get more room</h3>
      <p className="text-ink-600 leading-relaxed">
        Electronics and entertainment items bought between October 1 and December 25 typically have their 90-day clock reset to start on December 26 — effectively extending the window well past the standard cutoff for holiday gifting.
      </p>

      <div className="pt-4 border-t border-ink-100 flex flex-col gap-2">
        <p className="text-xs text-ink-400">Related Internal Links:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/stores/target" className="text-xs text-teal-brand font-medium hover:underline">
            View full Target store profile →
          </Link>
          <Link href="/blog/walmart-return-policy-without-receipt" className="text-xs text-teal-brand font-medium hover:underline">
            Walmart No-Receipt Return Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
