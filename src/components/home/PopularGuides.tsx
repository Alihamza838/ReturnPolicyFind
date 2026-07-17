import { Card, CardContent } from "../ui/card";
import { Link } from "../ui/Link";
import type { ArticleGuide } from "../../types";
import { StaggerContainer, StaggerItem } from "../layout/PageTransition";

export function PopularGuides({ guides }: { guides: ArticleGuide[] }) {
  return (
    <section className="border-t border-ink-100 bg-paper-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl tracking-tight">Expert Policy Guides</h2>
            <p className="text-sm text-ink-400 mt-1">Deep dives into consumer rights, retail terminology, and hacks.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-teal-brand hover:underline shrink-0">
            View all guides →
          </Link>
        </div>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <StaggerItem key={guide.slug} className="h-full">
              <Link href={`/blog/${guide.slug}`} className="group block h-full">
                <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-out hover:shadow-receipt hover:border-teal-brand bg-white border border-ink-100 flex flex-col justify-between">
                  <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-teal-brand font-bold px-2 py-0.5 rounded-full bg-teal-light/50 border border-teal-light">
                          {guide.category.replace("-", " ")}
                        </span>
                        <span className="text-[10px] font-mono text-ink-400">
                          Updated {new Date(guide.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-teal-brand transition-colors mt-3 tracking-tight">
                        {guide.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                      {guide.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono bg-ink-50 text-ink-600 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-ink-400 font-medium flex items-center gap-1 border-t border-ink-50 pt-3">
                      <span className="font-semibold text-ink-600">By {guide.author.split(" ")[0]} Team</span>
                      <span>·</span>
                      <span className="font-mono text-[10px] text-teal-brand uppercase font-semibold">{guide.readingTime} read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
