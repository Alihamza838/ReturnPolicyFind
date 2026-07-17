import * as React from "react";
import { Link } from "../../ui/Link";

export default function WalmartNoReceipt() {
  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed">
        Losing a Walmart receipt doesn't automatically end a return — it just moves you onto a narrower path with its own rules.
      </p>

      <div className="p-4 bg-teal-brand/5 border border-teal-brand/20 rounded-lg">
        <h3 className="font-display font-bold text-ink text-base mb-1">⏱️ Quick Takeaway</h3>
        <p className="text-sm text-ink-600 leading-relaxed">
          Walmart accepts no-receipt in-store returns if your valid government-issued photo ID matches its purchase records. From there, you're typically offered an exchange, a Walmart gift card, or a manufacturer-repair referral — not cash back to your original payment method.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Check digital proof before you assume it's gone</h3>
      <p className="text-ink-600 leading-relaxed">
        Before treating a return as a true no-receipt case, check two key places:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-ink-600">
        <li>
          <strong>Purchase History</strong> in your Walmart account, which can capture in-store purchases made with a saved card, Walmart Pay, or app-scanned receipts.
        </li>
        <li>
          <strong>Receipt Lookup</strong>, which can reconstruct a receipt from the store location, purchase date, total, and the last four digits of your card.
        </li>
      </ul>

      <p className="text-ink-600 leading-relaxed">
        Either path turns a "no receipt" return into a normal receipted return, with more refund flexibility.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">The return window still applies</h3>
      <p className="text-ink-600 leading-relaxed">
        A missing receipt doesn't extend your time limit. Most items follow Walmart's standard 90-day window, but electronics are capped at 30 days and wireless phones at just 14 days. Check the category window before assuming ID alone will get a return approved.
      </p>

      <div className="my-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
        <h4 className="font-bold text-ink text-sm">⚠️ ID Scan Limit warning</h4>
        <p className="text-xs text-ink-600 mt-1">
          Walmart limits you to <strong>three (3) receiptless returns</strong> in a rolling 45-day window. If you exceed this limit, your return will be automatically rejected.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">What to expect at the register</h3>
      <p className="text-ink-600 leading-relaxed">
        If Purchase History and Receipt Lookup both come up empty, bring the item and your ID to the store. Walmart's system will attempt to verify the return against its database; approved no-receipt returns are generally settled as an exchange or store gift card rather than a refund to your card.
      </p>

      <div className="pt-4 border-t border-ink-100 flex flex-col gap-2">
        <p className="text-xs text-ink-400">Related Internal Links:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/stores/walmart" className="text-xs text-teal-brand font-medium hover:underline">
            View full Walmart store profile →
          </Link>
          <Link href="/blog/store-credit-vs-refund-explained" className="text-xs text-teal-brand font-medium hover:underline">
            Refund vs Store Credit Explained →
          </Link>
        </div>
      </div>
    </div>
  );
}
