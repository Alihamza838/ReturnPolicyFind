import { CalendarDays, Clock } from "lucide-react";
import { Link } from "../ui/Link";
import { MarkdownText } from "./MarkdownText";
import { FaqAccordion } from "../store/FaqAccordion";
import { StepGuide } from "../store/StepGuide";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { formatDate } from "../../lib/utils";
import { getRelatedGuides, formatReadingTime } from "./utils";
import type { ArticleGuide } from "../../types";
import { ArticleBanner } from "./ArticleBanner";
import { storesData } from "../../data/stores";
import { getArticleComponent } from "./articles";

export function ArticleShell({ guide }: { guide: ArticleGuide }) {
  const related = getRelatedGuides(guide);
  const ArticleComp = getArticleComponent(guide.slug);

  const relatedStores = (guide.relatedStores || [])
    .map((sSlug) => storesData.find((st) => st.slug === sSlug))
    .filter((st): st is typeof storesData[0] => Boolean(st));

  // Construct JSON-LD schemas for Search Engines and AI Crawlers (SEO/GEO/AEO)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": guide.title,
    "description": guide.description,
    "datePublished": guide.publishedAt,
    "dateModified": guide.updatedAt,
    "author": {
      "@type": "Organization",
      "name": guide.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReturnPolicyFind",
      "logo": {
        "@type": "ImageObject",
        "url": "https://returnpolicyfind.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://returnpolicyfind.com/blog/${guide.slug}`
    }
  };

  const faqSchema = guide.faqs && guide.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {/* JSON-LD injection for Crawler and Engine indexing */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <header className="mb-8">
        <Badge variant="outline" className="mb-4 capitalize bg-teal-light/20 border-teal-light text-teal-brand font-semibold shadow-2xs">
          {guide.category.replace("-", " ")}
        </Badge>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl tracking-tight">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg text-ink-600 leading-relaxed font-sans font-medium">
          {guide.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-ink-400 border-y border-ink-50 py-3">
          <span className="flex items-center gap-1.5 font-semibold text-ink-600">
            <CalendarDays className="h-4 w-4 text-teal-brand" />
            Updated {formatDate(guide.updatedAt)}
          </span>
          <span className="flex items-center gap-1.5 text-ink-600">
            <Clock className="h-4 w-4 text-teal-brand" />
            {formatReadingTime(guide.readingTime)}
          </span>
          <span className="text-ink-400">By {guide.author}</span>
        </div>
      </header>

      {/* 
        To use your custom image, place your file at `/public/images/guides/${guide.slug}.png`
        and uncomment the image code block below, commenting out the placeholder div.
      */}
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-dashed border-teal-brand/30 bg-[#FAF8F3] shadow-3xs mb-8 flex flex-col items-center justify-center p-6 text-center group">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14213D_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        <div className="relative space-y-1.5 max-w-md">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-teal-brand bg-teal-light/40 border border-teal-brand/20 px-2.5 py-0.5 rounded">
            Ready for /public/images/guides/{guide.slug}.png
          </span>
          <h4 className="text-sm font-display font-bold text-[#14213D]">{guide.title} Editorial Illustration</h4>
          <p className="text-[11px] text-[#14213D]/60">This high-contrast vector container is optimized for ultra-fast loading speed and perfect SEO performance. Place your custom asset here later!</p>
        </div>
        {/*
        <img
          src={`/public/images/guides/${guide.slug}.png`}
          alt={guide.title}
          className="absolute inset-0 w-full h-full object-cover transform scale-100 hover:scale-[1.01] transition-transform duration-500 ease-out"
        />
        */}
      </div>

      {/* AEO/GEO Executive Policy Summary Bento Box */}
      <div className="my-8 p-5 bg-[#FAF8F3] border-l-4 border-teal-brand rounded-r-xl shadow-3xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-teal-brand tracking-wider">Executive Policy Summary</span>
          <span className="text-[10px] bg-teal-brand/10 text-teal-brand px-1.5 py-0.2 rounded font-mono font-medium">AEO Verified</span>
        </div>
        <p className="text-xs md:text-sm text-ink-600 leading-relaxed font-medium">
          <strong>Key Takeaway:</strong> {guide.summary}
        </p>
      </div>

      {/* Main prose / Custom Article Component */}
      {ArticleComp ? (
        <div className="prose prose-neutral max-w-none text-ink-600 leading-relaxed text-sm md:text-base">
          <ArticleComp />
        </div>
      ) : guide.proseContent ? (
        <MarkdownText source={guide.proseContent} className="prose prose-neutral max-w-none text-ink-600 leading-relaxed text-sm md:text-base" />
      ) : (
        <p className="mb-8 text-base leading-relaxed text-ink-600 font-sans">{guide.summary}</p>
      )}

      {guide.steps && guide.steps.length > 0 && (
        <div className="my-10">
          <StepGuide title={`Steps covered in: ${guide.title}`} steps={guide.steps} />
        </div>
      )}

      {guide.faqs && guide.faqs.length > 0 && (
        <div className="my-10">
          <FaqAccordion faqs={guide.faqs} />
        </div>
      )}

      {relatedStores.length > 0 && (
        <div className="mt-10 bg-[#FAF8F3]/50 border border-ink-100 rounded-lg p-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#14213D] mb-3">
            🛍️ Related Retailers Audited
          </h3>
          <p className="text-xs text-ink-500 mb-4 leading-relaxed">
            Direct access to official return guidelines, step-by-step handbooks, and contact sheets for retailers reviewed in this guide:
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedStores.map((st) => (
              <Link key={st.slug} href={`/stores/${st.slug}`}>
                <Badge variant="outline" className="bg-white text-ink hover:text-teal-brand hover:border-teal-brand cursor-pointer text-xs py-1.5 px-3">
                  {st.brand} {st.country ? `(${st.country})` : "(US)"}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-12 border-t border-ink-100 pt-8">
          <h2 className="mb-5 font-display text-xl font-bold text-ink">Recommended Policy Guides</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                <Card className="h-full transition-all duration-200 group-hover:shadow-receipt group-hover:border-teal-brand group-hover:bg-teal-light/5">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                    <p className="text-sm font-bold text-ink group-hover:text-teal-brand transition-colors line-clamp-3">
                      {r.title}
                    </p>
                    <span className="text-[10px] font-mono text-ink-400 uppercase tracking-wider">{r.readingTime} read</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
