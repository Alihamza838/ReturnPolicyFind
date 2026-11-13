import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container } from "../ui";
import { GUIDES } from "../guides";
import { guideImage } from "../data";
import { href } from "../config";

export function Component() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];
  return (
    <>
      <Seo
        title="Return Policy Guides & Lists 2026"
        description="Cheat sheets and lists built from verified store data: 90-day stores, shortest windows, holiday deadlines, no-receipt rules, restocking fees and free returns."
        path="/guides"
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema("Return policy guides", GUIDES.map((g) => ({ name: g.h1, path: `/guides/${g.slug}` })))]}
      />
      <div className="border-b border-line bg-white">
        <Container className="py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 text-4xl text-ink sm:text-5xl">Return policy guides & lists</h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-2">
            Every list is built from the same verified store records as the store pages, so the numbers always match. Pick the question you have.
          </p>
        </Container>
      </div>
      <Container className="py-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link to={href(`/guides/${g.slug}`)} className="lift group block h-full overflow-hidden rounded-[22px] border border-line bg-white">
                <img src={guideImage(g.slug)} alt="" width={800} height={420} loading="lazy" decoding="async" className="aspect-[40/21] w-full bg-cream-2 object-cover" />
                <span className="block p-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-coral-700">
                    {g.kicker} · {g.rows().length} stores
                  </span>
                  <span className="mt-1 block text-lg font-extrabold leading-snug text-ink group-hover:text-coral-700">{g.h1}</span>
                  <span className="mt-2 block text-sm text-ink-2">{g.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
