import { ArrowLeft } from "lucide-react";
import { Link } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { ArticleShell } from "../components/blog/ArticleShell";
import { getGuideBySlug } from "../components/blog/utils";
import { useSEO } from "../hooks/useSEO";

export function BlogDetailPage({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-2xl font-bold text-ink">Guide Article Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          The requested return guidelines article doesn&apos;t exist or has been relocated.
        </p>
        <Link href="/blog" className="mt-6">
          <Button variant="teal">Browse All Guides</Button>
        </Link>
      </div>
    );
  }

  // Generate deep BlogPosting structured schema for Google Rich Snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": guide.title,
    "description": guide.description,
    "author": {
      "@type": "Person",
      "name": guide.author || "ReturnPolicyFind Editorial Team"
    },
    "datePublished": guide.updatedAt,
    "dateModified": guide.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReturnPolicyFind",
      "logo": {
        "@type": "ImageObject",
        "url": "https://returnpolicyfind.com/logos/target.svg" // or static site icon representation
      }
    }
  };

  useSEO({
    title: `${guide.title} — Verified Shopper Guide`,
    description: guide.description || `In-depth expert review of ${guide.title}. Explore legal consumer rights, refund instructions, timelines, and verified loopholes in 2026.`,
    jsonLd: articleSchema,
  });

  return (
    <div className="fade-in">
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <p className="text-xs font-mono">
          <Link href="/blog" className="text-teal-brand font-semibold hover:underline flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all guides</span>
          </Link>
        </p>
      </div>
      <ArticleShell guide={guide} />
    </div>
  );
}
