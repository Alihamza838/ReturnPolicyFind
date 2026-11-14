/** ArticleView.tsx - renders a long-form article with a sticky contents list and related stores. */
import { Children, isValidElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Seo from "./Seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "./schema";
import { Breadcrumbs, Container, FaqList, Section, StoreTicket } from "./ui";
import { ReadingProgress } from "./ScrollEffects";
import TocNav from "./TocNav";
import { ARTICLES, articleStores, type Article } from "./articles";
import { slugify } from "./article-parse";
import { formatDate, guideImage, guideOg } from "./data";
import { EDITOR, href } from "./config";

function text(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement<{ children?: ReactNode }>(c) ? text(c.props.children) : ""))
    .join("");
}

export default function ArticleView({ a }: { a: Article }) {
  const path = `/guides/${a.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: a.title.split(":")[0], path },
  ];
  const minutes = Math.max(2, Math.round(a.words / 220));
  const stores = articleStores(a).slice(0, 6);
  const more = ARTICLES.filter((x) => x.slug !== a.slug);
  return (
    <article>
      <ReadingProgress />
      <Seo
        title={a.title}
        description={a.description}
        path={path}
        image={guideOg(a.slug)}
        type="article"
        modified={a.updated}
        jsonLd={[
          articleSchema({ title: a.title, description: a.description, path, image: guideOg(a.slug), published: a.date, modified: a.updated, author: EDITOR.name }),
          ...(a.faqs.length ? [faqSchema(a.faqs)] : []),
          breadcrumbSchema(crumbs),
        ]}
      />
      <div className="border-b border-line bg-white">
        <Container className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-coral-700">{a.kicker}</p>
            <h1 className="mt-2 text-4xl text-ink sm:text-5xl">{a.title}</h1>
            <p className="mt-4 text-lg text-ink-2">{a.description}</p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-widest text-ink-3">
              <span>By {EDITOR.name}</span>
              <span>Updated {formatDate(a.updated)}</span>
              <span>{minutes} min read</span>
            </p>
          </div>
          <img src={guideImage(a.slug)} alt={`${a.title.split(":")[0]}: illustration`} width={800} height={420} fetchPriority="high" className="aspect-[40/21] w-full rounded-[22px] border border-line bg-cream-2 object-cover" />
        </Container>
      </div>
      <Container className="pb-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <div className="prose-read mt-10 text-[17.5px] [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-2xl [&_table]:text-[15px] [&_td]:border-t [&_td]:border-line [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_th]:bg-navy [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-white [&_tr:nth-child(even)_td]:bg-cream">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 id={slugify(text(children))} data-reveal>
                    {children}
                  </h2>
                ),
                a: ({ href: to, children }) =>
                  to && to.startsWith("/") ? (
                    <Link to={href(to)}>{children}</Link>
                  ) : (
                    <a href={to} target="_blank" rel="noopener">
                      {children}
                    </a>
                  ),
                table: ({ children }) => (
                  <div className="overflow-x-auto rounded-2xl border border-line bg-white">
                    <table className="min-w-[560px]">{children}</table>
                  </div>
                ),
              }}
            >
              {a.body}
            </ReactMarkdown>
          </div>
          <aside className="mt-10 hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <TocNav items={[...a.headings, ...(a.faqs.length ? [{ id: "faq", text: "Questions" }] : [])]} />
          </aside>
        </div>

        {a.faqs.length > 0 && (
          <Section id="faq" kicker="FAQ" title="Frequently asked questions">
            <FaqList faqs={a.faqs} />
          </Section>
        )}

        {stores.length > 0 && (
          <Section kicker="Stores in this article" title="Check the full policies">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {stores.map((p) => (
                <StoreTicket key={p.slug} p={p} />
              ))}
            </div>
          </Section>
        )}

        <nav aria-labelledby="more-articles" className="mt-14">
          <h2 id="more-articles" className="text-xl text-ink">
            Keep reading
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {more.map((o) => (
              <li key={o.slug}>
                <Link to={href(`/guides/${o.slug}`)} className="block rounded-2xl border border-line bg-white px-5 py-4 font-semibold text-ink hover:border-coral-500 hover:text-coral-700">
                  {o.title} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </article>
  );
}
