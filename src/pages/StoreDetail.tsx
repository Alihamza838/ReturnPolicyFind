import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "../components/ui/Link";
import { QuickAnswerCard } from "../components/store/QuickAnswerCard";
import { PolicyBadgeRow } from "../components/store/PolicyBadgeRow";
import { PolicyTable } from "../components/store/PolicyTable";
import { StepGuide } from "../components/store/StepGuide";
import { FaqAccordion } from "../components/store/FaqAccordion";
import { LastVerifiedBadge } from "../components/store/LastVerifiedBadge";
import { RelatedBrands } from "../components/store/RelatedBrands";
import { MarkdownText } from "../components/blog/MarkdownText";
import { Button } from "../components/ui/button";
import { storesData } from "../data/stores";
import { guidesData } from "../data/guides";
import { useSEO } from "../hooks/useSEO";
import { InternationalCounterpartsCallout } from "../components/store/InternationalCounterpartsCallout";
import { QuickCompareWidget } from "../components/store/QuickCompareWidget";
import { ReceiptLossHackWidget } from "../components/store/ReceiptLossHackWidget";
import { RelatedGuidesWidget } from "../components/store/RelatedGuidesWidget";

export function StoreDetailPage({ slug }: { slug: string }) {
  const store = storesData.find((s) => s.slug === slug);

  if (!store) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-2xl font-bold text-ink">Retailer Guidelines Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          We haven't compiled the return policy for "{slug}" yet. Check out other popular stores in our index.
        </p>
        <Link href="/stores" className="mt-6">
          <Button variant="teal">Browse All Stores</Button>
        </Link>
      </div>
    );
  }

  // Dynamic FAQ JSON-LD Schema for incredible rich search result rendering
  const faqJsonLd = store.faqs && store.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": store.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : undefined;

  useSEO({
    title: `${store.brand} Return Policy: ${store.quickAnswer.returnWindow} (Verified 2026)`,
    description: store.metaDescription || `Full breakdown of ${store.brand} return policy in 2026: return windows, refund rules, online/in-store steps, and receipt lookup guidelines.`,
    jsonLd: faqJsonLd,
  });

  // Find related editorial guides
  const relatedGuides = guidesData.filter((g) => g.relatedStores?.includes(store.slug));

  // Find international versions of the same brand
  const internationalCounterparts = storesData.filter((s) => {
    if (s.slug === store.slug) return false;
    const getRootBrand = (str: string) => {
      if (str.startsWith("walmart")) return "walmart";
      if (str.startsWith("target")) return "target";
      if (str.startsWith("sephora")) return "sephora";
      if (str.startsWith("nike")) return "nike";
      if (str.startsWith("amazon")) return "amazon";
      return str;
    };
    return getRootBrand(s.slug) === getRootBrand(store.slug);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 fade-in">
      {/* Back link */}
      <p className="mb-4 text-xs font-mono">
        <Link href="/stores" className="text-teal-brand font-semibold hover:underline flex items-center gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all stores</span>
        </Link>
      </p>

      {/* Header meta */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start border-b border-ink-100 pb-8 mb-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="font-display text-4xl font-extrabold text-ink tracking-tight">
            {store.brand} Return Policy Explained {store.countryName && <span className="text-lg font-mono text-teal-brand font-semibold border border-teal-brand/30 rounded px-2 py-0.5 ml-2 bg-teal-light/20">{store.countryName}</span>}
          </h1>
          <p className="text-sm md:text-base text-ink-600 leading-relaxed font-medium">
            {store.metaDescription}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 items-center">
            <LastVerifiedBadge date={store.lastVerified} />
            <a
              href={store.officialPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-brand hover:text-teal-dark underline underline-offset-2 ml-1"
            >
              <span>Official Guidelines</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Answer receipt block */}
        <div className="w-full md:max-w-xs shrink-0 shadow-sm">
          <QuickAnswerCard brand={store.brand} data={store.quickAnswer} lastVerified={store.lastVerified} />
        </div>
      </div>

      {/* International Counterparts Callout Banner */}
      <InternationalCounterpartsCallout
        currentBrand={store.brand}
        currentSlug={store.slug}
        counterparts={internationalCounterparts}
      />

      {/* Main split details content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left main guidelines section */}
        <div className="lg:col-span-2 space-y-10">
          {/* Status badge row */}
          <div className="bg-white rounded-lg border border-ink-100 p-5 shadow-2xs space-y-3">
            <h3 className="font-display text-base font-bold text-ink">Policy Status Summary</h3>
            <PolicyBadgeRow badges={store.badges} />
          </div>

          {/* Table exceptions details */}
          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ink">Window Guidelines & Exceptions</h2>
            <p className="text-xs text-ink-400">Different departments might carry distinct window deadlines.</p>
            <PolicyTable rows={store.policyTable} />
          </div>

          {/* Step guide */}
          <StepGuide steps={store.steps} title={`How to return items to ${store.brand}`} />

          {/* Rich content prose */}
          {store.proseContent && (
            <div className="bg-white border border-ink-100 rounded-lg p-6 md:p-8 shadow-2xs">
              <MarkdownText source={store.proseContent} className="prose prose-neutral max-w-none text-ink-600 text-sm md:text-base leading-relaxed" />
            </div>
          )}

          {/* Faqs accordion */}
          <FaqAccordion faqs={store.faqs} />
        </div>

        {/* Right side links layout */}
        <div className="space-y-8 lg:sticky lg:top-24">
          {/* Quick Compare Dropdown Widget */}
          <QuickCompareWidget
            currentBrand={store.brand}
            currentSlug={store.slug}
            storesList={storesData}
          />

          {/* Receipt Loss Hack Widget */}
          <ReceiptLossHackWidget brand={store.brand} />

          {/* Related Guides Widget */}
          <RelatedGuidesWidget brand={store.brand} guides={relatedGuides} />

          <RelatedBrands slugs={store.relatedBrands} currentSlug={store.slug} />
        </div>
      </div>
    </div>
  );
}
