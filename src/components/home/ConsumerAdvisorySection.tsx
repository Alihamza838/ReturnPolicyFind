import * as React from "react";
import { ShieldAlert, CheckCircle, Scale, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import { Link } from "../ui/Link";
import { Button } from "../ui/button";

export function ConsumerAdvisorySection() {
  const [hasReceipt, setHasReceipt] = React.useState<boolean | null>(null);
  const [withinWindow, setWithinWindow] = React.useState<boolean | null>(null);
  const [isOpened, setIsOpened] = React.useState<boolean | null>(null);

  const calculateScore = () => {
    if (hasReceipt === null || withinWindow === null || isOpened === null) return null;

    if (withinWindow === false) {
      return {
        status: "danger",
        title: "Very Low Success Likelihood",
        color: "text-red-500 border-red-200 bg-red-50/50",
        message: "Most retailers strictly enforce the return window cutoff. Your best option is a manufacturer warranty claim (if defective) or selling on a peer-to-peer marketplace.",
      };
    }

    if (hasReceipt === true && isOpened === false) {
      return {
        status: "success",
        title: "99% Refund Success Guaranteed",
        color: "text-emerald-600 border-emerald-200 bg-emerald-50/50",
        message: "You satisfy all criteria. You are fully eligible for a 100% cash or credit refund to your original payment method. Be sure to bring the card you paid with!",
      };
    }

    if (hasReceipt === true && isOpened === true) {
      return {
        status: "success-medium",
        title: "85% Refund Success",
        color: "text-teal-brand border-teal-brand/20 bg-teal-light/10",
        message: "While the item is opened, having the original receipt satisfies almost all stores (like Target, Walmart, and Nike). Bring original packaging if possible.",
      };
    }

    if (hasReceipt === false && isOpened === false) {
      return {
        status: "warning",
        title: "50% Exchange/Store Credit Success",
        color: "text-amber-brand border-amber-brand/20 bg-amber-light/10",
        message: "Without a receipt, stores must use photo ID verification. You will likely receive store credit for the lowest recent selling price rather than a cash refund.",
      };
    }

    return {
      status: "restricted",
      title: "Highly Restricted (Store Dependent)",
      color: "text-amber-700 border-amber-200 bg-amber-50/50",
      message: "An opened item with no receipt is the hardest return. Stores like Sephora can look it up with loyalty accounts; otherwise, you will likely face a manager rejection or restocking fee.",
    };
  };

  const scoreResult = calculateScore();

  return (
    <section className="border-t border-ink-100 bg-[#14213D] text-white py-16 relative overflow-hidden" id="consumer-advisory">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      ></div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Informative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#2A6F77]/20 border border-[#2A6F77]/40 rounded-full px-3 py-1 text-xs font-semibold text-teal-light">
              <Scale className="h-3.5 w-3.5" />
              <span>Consumer Protection Council</span>
            </div>
            
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl leading-tight tracking-tight text-white">
              Know Your Rights:<br />
              <span className="text-teal-light">The Consumer Refund Shield</span>
            </h2>
            
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl">
              Retail return policies aren't just polite favors — they are bound by strict state and international statutes. Under standard state guidelines, any store that fails to post its return terms conspicuously must legally offer full cash refunds within 30 days of purchase.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-teal-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Lookup Access</h4>
                  <p className="text-xs text-white/70 mt-1">
                    Major brands are legally mandated to allow purchase histories lookup using your card chip, loyalty ID, or payment tokens.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-teal-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Faulty Goods Guarantee</h4>
                  <p className="text-xs text-white/70 mt-1">
                    Defective merchandise operates outside of standard store windows. Federal laws protect you against structural product failures.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Link href="/blog/return-policy-law-by-state">
                <Button variant="teal" className="text-xs font-bold px-4 py-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Read State Refund Laws
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="text-xs font-bold px-4 py-2 border-white/20 text-white hover:bg-white/10">
                  Our Mission
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Scorecard */}
          <div className="lg:col-span-5">
            <div className="bg-white text-ink rounded-xl border border-white/10 p-6 shadow-xl space-y-6 relative">
              <div className="absolute top-4 right-4 text-[#2A6F77]/10">
                <ShieldAlert className="h-16 w-16" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#2A6F77] font-semibold tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Real-time Evaluator
                </span>
                <h3 className="font-display text-lg font-bold text-[#14213D]">Refund Success Calculator</h3>
                <p className="text-xs text-ink-600">
                  Verify the probability of getting your money back at any retailer instantly.
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-4 pt-2">
                {/* Q1 */}
                <div className="space-y-2">
                  <span className="block text-xs font-mono text-ink-400 uppercase tracking-wider">1. Do you have the receipt or original card?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHasReceipt(true)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        hasReceipt === true
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      Yes (or card)
                    </button>
                    <button
                      onClick={() => setHasReceipt(false)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        hasReceipt === false
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      No Receipt
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="space-y-2">
                  <span className="block text-xs font-mono text-ink-400 uppercase tracking-wider">2. Is it within the return window?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWithinWindow(true)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        withinWindow === true
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      Yes, within limits
                    </button>
                    <button
                      onClick={() => setWithinWindow(false)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        withinWindow === false
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      Expired/Over window
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="space-y-2">
                  <span className="block text-xs font-mono text-ink-400 uppercase tracking-wider">3. Has the item been opened or used?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpened(true)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        isOpened === true
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      Opened/Used
                    </button>
                    <button
                      onClick={() => setIsOpened(false)}
                      className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                        isOpened === false
                          ? "bg-[#2A6F77] text-white border-[#2A6F77]"
                          : "bg-white border-ink-100 hover:border-teal-brand text-ink"
                      }`}
                    >
                      Unopened/Brand New
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
              {scoreResult ? (
                <div className={`p-4 rounded-lg border flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200 ${scoreResult.color}`}>
                  <div className="flex items-center gap-2">
                    {scoreResult.status === "danger" ? (
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-[#2A6F77] shrink-0" />
                    )}
                    <span className="text-xs font-extrabold uppercase tracking-wider font-mono">{scoreResult.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-600">{scoreResult.message}</p>
                  <button
                    onClick={() => {
                      setHasReceipt(null);
                      setWithinWindow(null);
                      setIsOpened(null);
                    }}
                    className="mt-1 text-[10px] font-mono uppercase font-bold text-[#2A6F77] hover:underline text-left cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="h-2.5 w-2.5" /> Re-calculate likelihood
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-paper-muted/30 border border-ink-100 text-center">
                  <p className="text-xs text-ink-400 font-medium">Select all three fields above to calculate likelihood.</p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Trending Keywords & Search Clusters (GEO / AEO / SEO Multiplier) */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-teal-light animate-pulse" />
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              Trending Audits & High-Traffic Consumer Search Terms
            </h3>
          </div>
          <p className="text-xs text-white/70 max-w-2xl mb-8 leading-relaxed">
            Direct indexing of key legislative acts, secret store limits, and manufacturer loopholes queried across search platforms and Generative AI engines (ChatGPT, Grok, Perplexity):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Cat & Jack Baby Clothes Warranty", href: "/blog/target-return-policy-explained", tag: "Target 365 Days" },
              { label: "Walmart Receipt Lookup Tool", href: "/blog/walmart-return-policy-without-receipt", tag: "Debit/Credit Scan" },
              { label: "Costco 90-Day Electronics Cap", href: "/blog/costco-electronics-return-policy", tag: "Concierge Warranty" },
              { label: "Amazon Label-Free Whole Foods Return", href: "/blog/amazon-return-policy-guide", tag: "Unboxed QR Code" },
              { label: "Best Buy 15-Day Lock Restriction", href: "/blog/best-buy-return-policy-open-box", tag: "iCloud Reset" },
              { label: "Nike Run-Test Athlete Guarantee", href: "/blog/nike-return-policy-worn-shoes", tag: "Worn Shoe Policy" },
              { label: "California Civil Code § 1723", href: "/blog/return-policy-law-by-state", tag: "Refund Statutes" },
              { label: "New York General Business Law § 218-a", href: "/blog/return-policy-law-by-state", tag: "Conspicuous Posting" },
              { label: "The Retail Equation Consumer Score", href: "/blog/sephora-return-blacklist-retail-equation-guide", tag: "ID Ban History" },
              { label: "Sephora Opened Cosmetic Sanitation", href: "/blog/cosmetics-skincare-sanitization-testing-return-guide", tag: "Makeup Destruct" },
              { label: "Electronics Serial Number Tracking", href: "/blog/electronics-serial-number-tracking-policy", tag: "SNV Prevention" },
              { label: "Credit Card Refund Protections", href: "/blog/credit-card-return-protection-guide", tag: "Amex/Chase Shield" },
            ].map((keyword, idx) => (
              <Link key={idx} href={keyword.href} className="group block">
                <div className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-light rounded-lg transition-all duration-150 h-full flex flex-col justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-teal-light transition-colors line-clamp-2">
                    {keyword.label}
                  </span>
                  <span className="text-[9px] font-mono font-semibold text-white/40 group-hover:text-white/60 mt-2 block uppercase tracking-wide">
                    {keyword.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
