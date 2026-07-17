import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "../components/ui/Link";
import { FaqAccordion } from "../components/store/FaqAccordion";
import { StepGuide } from "../components/store/StepGuide";
import { LastVerifiedBadge } from "../components/store/LastVerifiedBadge";
import { MarkdownText } from "../components/blog/MarkdownText";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { topicsData } from "../data/topics";

export function StoreTopicPage({ brandSlug, topic }: { brandSlug: string; topic: string }) {
  const data = topicsData.find((t) => t.brandSlug === brandSlug && t.topic === topic);

  if (!data) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-2xl font-bold text-ink">Topic Guide Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          We haven't compiled the return topic for "{brandSlug}/{topic}" yet. Check out the main store guidelines.
        </p>
        <Link href={`/stores/${brandSlug}`} className="mt-6">
          <Button variant="teal">View {brandSlug} Return Policy</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 fade-in">
      {/* Back link to brand */}
      <p className="mb-4 text-xs font-mono">
        <Link href={`/stores/${brandSlug}`} className="text-teal-brand font-semibold hover:underline flex items-center gap-1.5">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to {data.brand} Return Policy</span>
        </Link>
      </p>

      {/* Main header block */}
      <header className="mb-8 border-b border-ink-100 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink leading-tight sm:text-4xl">
          {data.title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-ink-600 leading-relaxed font-medium">
          {data.metaDescription}
        </p>
        <div className="mt-6">
          <LastVerifiedBadge date={data.lastVerified} />
        </div>
      </header>

      {/* Grid splits */}
      <div className="space-y-8">
        {/* Quick Answer callout */}
        <div className="bg-teal-light/20 border border-teal-light/50 rounded-lg p-5">
          <h3 className="font-display text-sm font-semibold text-teal-dark uppercase tracking-wide mb-2 flex items-center gap-1.5 font-mono">
            <BookOpen className="h-4 w-4 shrink-0" />
            Quick Answer Highlight
          </h3>
          <p className="text-sm md:text-base text-ink-600 font-semibold leading-relaxed">
            {data.quickAnswer}
          </p>
        </div>

        {/* Markdown detail prose */}
        {data.proseContent && (
          <div className="bg-white border border-ink-100 rounded-lg p-6 md:p-8 shadow-2xs">
            <MarkdownText source={data.proseContent} className="prose prose-neutral max-w-none text-ink-600 text-sm md:text-base" />
          </div>
        )}

        {/* Steps and FAQ blocks */}
        {data.steps && data.steps.length > 0 && (
          <StepGuide steps={data.steps} title={`Step-by-step instructions: Return policy without a receipt`} />
        )}

        {data.faqs && data.faqs.length > 0 && (
          <FaqAccordion faqs={data.faqs} />
        )}

        {/* Footer links */}
        <div className="border-t border-ink-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ink-400 font-mono">
          <p>Need more details about store specific terms?</p>
          <Link href={`/stores/${brandSlug}`}>
            <Button variant="outline" size="sm">
              View Full {data.brand} policy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
