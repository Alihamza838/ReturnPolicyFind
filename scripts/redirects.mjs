/**
 * Old URLs → new pages (301), so links and rankings from the previous version of the site carry
 * over. Used to write vercel.json and checked by verify-build (every destination must exist in
 * dist/, and no source may hide a live page).
 */
export const REDIRECTS = {
  // Store "topic" sub-pages from the old site
  "/stores/walmart/without-receipt": "/stores/walmart/",
  "/stores/target/opened-items": "/stores/target/",
  "/stores/amazon/after-30-days": "/stores/amazon/",
  // Old blog → store pages, verified lists and country pages
  "/blog": "/guides/",
  "/blog/walmart-return-policy-without-receipt": "/guides/return-without-receipt/",
  "/blog/target-return-policy-explained": "/stores/target/",
  "/blog/costco-electronics-return-policy": "/stores/costco/",
  "/blog/amazon-return-policy-guide": "/stores/amazon/",
  "/blog/best-buy-return-policy-open-box": "/stores/best-buy/",
  "/blog/nike-return-policy-worn-shoes": "/stores/nike/",
  "/blog/sephora-ulta-return-policy-compared": "/compare/sephora-vs-ulta/",
  "/blog/holiday-return-policy-2026": "/guides/holiday-return-deadlines-2026/",
  "/blog/store-credit-vs-refund-explained": "/guides/exchange-only-stores/",
  "/blog/final-sale-items-explained": "/guides/return-policy-cheat-sheet-2026/",
  "/blog/best-return-policies-2026": "/guides/stores-with-90-day-return-policy/",
  "/blog/return-policy-law-by-state": "/countries/united-states/",
  "/blog/walmart-us-vs-canada-return-policy": "/brands/walmart/",
  "/blog/target-us-vs-target-australia-different-companies": "/stores/target-au/",
  "/blog/sephora-us-vs-canada-return-policy": "/brands/sephora/",
  "/blog/international-shopper-guide-returns-across-borders": "/countries/",
  "/blog/credit-card-return-protection-guide": "/guides/return-policy-cheat-sheet-2026/",
  "/blog/eu-vs-us-online-shopping-cooling-off-rights": "/countries/",
  "/blog/sephora-return-blacklist-retail-equation-guide": "/stores/sephora/",
  "/blog/cosmetics-skincare-sanitization-testing-return-guide": "/category/beauty/",
  "/blog/electronics-serial-number-tracking-policy": "/category/electronics/",
  "/blog/dubai-e-commerce-return-policy-guide-2026": "/countries/uae/",
  "/blog/saudia-e-commerce-return-policy-guide-2026": "/countries/saudi-arabia/",
  "/blog/ebay-global-return-policy-all-countries-2026": "/stores/ebay/",
  "/blog/pakistan-daraz-refund-return-guide-2026": "/countries/pakistan/",
  "/blog/india-e-commerce-return-policy-battle-2026": "/countries/india/",
  "/blog/china-cross-border-ecommerce-return-guide-2026": "/compare/temu-vs-aliexpress/",
  "/blog/dsw-return-policy-complete-guide": "/stores/dsw/",
  "/blog/dsw-return-policy-without-receipt": "/stores/dsw/",
  "/blog/dsw-shoes-return-policy": "/stores/dsw/",
  "/blog/dsw-return-window-policy": "/stores/dsw/",
  "/blog/dsw-vs-nike-vs-target-vs-nordstrom-return-policy": "/compare/dsw-vs-nordstrom/",
  // Common guesses
  "/privacy-policy": "/privacy/",
  "/terms-of-use": "/terms/",
  "/tools": "/tools/return-deadline-calculator/",
  "/category": "/stores/",
};

/** Patterns (path-to-regexp) for whole old sections */
export const PATTERN_REDIRECTS = [{ source: "/blog/:slug", destination: "/guides/" }];
