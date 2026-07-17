import React from "react";
import { Link } from "../../ui/Link";

export default function AmazonGuide() {
  return (
    <div className="space-y-6">
      <p className="text-ink-600 leading-relaxed">
        Amazon's return window varies by seller and category. Here's how standard, third-party Marketplace, and Prime-exclusive returns differ.
      </p>

      <div className="p-4 bg-teal-brand/5 border border-teal-brand/20 rounded-lg">
        <h3 className="font-display font-bold text-ink text-base mb-1">⏱️ Quick Summary</h3>
        <p className="text-sm text-ink-600 leading-relaxed">
          Amazon's own items typically allow returns within <strong>30 days</strong>, but items sold by third-party Marketplace sellers can carry their own separate windows and conditions set by the seller.
        </p>
      </div>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Standard 30-Day Policy</h3>
      <p className="text-ink-600 leading-relaxed">
        For items fulfilled by Amazon, you have 30 days from the date of delivery to return them. Return methods can include free drop-offs at Kohl's, Whole Foods, or UPS Stores, where no box or shipping label is required.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">Third-Party Marketplace Rules</h3>
      <p className="text-ink-600 leading-relaxed">
        While Amazon mandates third-party sellers to offer a policy at least as generous as their own, the return must be processed through the seller. In some cases, you may have to pay return shipping if the item was shipped directly by the seller.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink mt-6">The A-to-z Guarantee</h3>
      <p className="text-ink-600 leading-relaxed">
        Amazon's A-to-z Guarantee protects shoppers when purchasing from independent sellers. If a seller fails to approve a valid return or issue a refund within 48 hours of delivery, customers can appeal directly to Amazon for assistance.
      </p>

      <div className="pt-4 border-t border-ink-100 flex flex-col gap-2">
        <p className="text-xs text-ink-400">Related Internal Links:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/stores/amazon" className="text-xs text-teal-brand font-medium hover:underline">
            View full Amazon store profile →
          </Link>
          <Link href="/blog/final-sale-items-explained" className="text-xs text-teal-brand font-medium hover:underline">
            Final Sale Items Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
