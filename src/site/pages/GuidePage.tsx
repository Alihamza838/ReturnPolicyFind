import { Link, useParams } from "react-router-dom";
import Seo from "../Seo";
import { articleSchema, breadcrumbSchema, faqSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryChip, FaqList, Section, windowLabel } from "../ui";
import { ReadingProgress } from "../ScrollEffects";
import { GUIDES, getGuide } from "../guides";
import { countryOfPolicy } from "../../data/countries";
import { formatDate, guideImage, guideOg } from "../data";
import { EDITOR, href } from "../config";
import { NotFoundContent } from "./NotFoundPage";

export function Component() {
  const { slug } = useParams<{ slug: string }>();
  const g = getGuide(slug);
  if (!g) return <NotFoundContent />;
  const rows = g.rows();
  const path = `/guides/${g.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: g.h1, path },
  ];
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  return (
    <article>
      <ReadingProgress />
      <Seo
        title={g.title}
        description={g.description}
        path={path}
        image={guideOg(g.slug)}
        type="article"
        modified={g.updated}
        jsonLd={[
          articleSchema({ title: g.h1, description: g.description, path, image: guideOg(g.slug), published: g.published, modified: g.updated, author: EDITOR.name }),
          itemListSchema(g.rowsLabel, rows.map((r) => ({ name: `${r.p.name} return policy`, path: `/stores/${r.p.slug}` }))),
          faqSchema(g.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />
      <div className="border-b border-line bg-white">
        <Container className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-coral-700">{g.kicker}</p>
            <h1 className="mt-2 text-4xl text-ink sm:text-5xl">{g.h1}</h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-3">
              By {EDITOR.name} · updated {formatDate(g.updated)} · {rows.length} stores
            </p>
          </div>
          <img src={guideImage(g.slug)} alt={`${g.h1}: illustration`} width={800} height={420} fetchPriority="high" className="aspect-[40/21] w-full rounded-[22px] border border-line bg-cream-2 object-cover" />
        </Container>
      </div>
      <Container className="pb-8">
        <div className="prose-read mt-10">
          {g.intro.map((t) => (
            <p key={t} className="text-lg">
              {t}
            </p>
          ))}
        </div>

        <Section id="list" kicker={`${rows.length} stores`} title={g.rowsLabel}>
          <div className="overflow-x-auto rounded-[22px] border border-line bg-white">
            <table className="w-full min-w-[620px] text-left text-[15px]">
              <thead className="bg-navy font-mono text-xs uppercase tracking-wider text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">#</th>
                  <th scope="col" className="px-4 py-3">Store</th>
                  <th scope="col" className="px-4 py-3">Window</th>
                  <th scope="col" className="px-4 py-3">The rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line align-top">
                {rows.map((r, i) => {
                  const c = countryOfPolicy(r.p);
                  const w = windowLabel(r.p);
                  return (
                    <tr key={r.p.slug} className="hover:bg-cream">
                      <td className="px-4 py-3 font-mono text-ink-3">{String(i + 1).padStart(2, "0")}</td>
                      <th scope="row" className="px-4 py-3">
                        <Link to={href(`/stores/${r.p.slug}`)} className="inline-flex items-center gap-2 font-bold text-ink hover:text-coral-700 hover:underline">
                          {c && <CountryChip c={c} size="sm" />}
                          {r.p.name}
                        </Link>
                      </th>
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-coral-700">
                        {w.big} {w.unit}
                      </td>
                      <td className="px-4 py-3 text-ink-2">{r.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="tips" kicker="Tips" title="How to use this list">
          <ul className="grid gap-3 sm:grid-cols-2">
            {g.tips.map((t) => (
              <li key={t} className="rounded-2xl bg-cream-2 px-5 py-4 text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-ink-2">
            Want your exact last day? Use the <Link to="/tools/return-deadline-calculator/" className="font-bold text-coral-700 underline">return deadline calculator</Link>.
          </p>
        </Section>

        <Section id="faq" kicker="FAQ" title="Common questions">
          <FaqList faqs={g.faqs} />
        </Section>

        <nav aria-labelledby="more-guides" className="mt-14">
          <h2 id="more-guides" className="text-xl text-ink">
            More lists
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={href(`/guides/${o.slug}`)} className="block rounded-2xl border border-line bg-white px-5 py-4 font-semibold text-ink hover:border-coral-500 hover:text-coral-700">
                  {o.h1} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </article>
  );
}
