/** article-parse.ts - parses an article file (frontmatter + Markdown). No I/O, so scripts can use it too. */

export interface Article {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  date: string;
  updated: string;
  stores: string[];
  body: string;
  faqs: { q: string; a: string }[];
  headings: { id: string; text: string }[];
  words: number;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function parseArticle(raw: string, file: string): Article {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  let body = m[2].trim();
  const faqs: Article["faqs"] = [];
  const fi = body.indexOf("## Frequently asked questions");
  if (fi >= 0) {
    const faqPart = body.slice(fi);
    body = body.slice(0, fi).trim();
    for (const block of faqPart.split(/\n### /).slice(1)) {
      const [q, ...rest] = block.split("\n");
      faqs.push({ q: q.trim(), a: rest.join(" ").trim() });
    }
  }
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => ({ id: slugify(h[1]), text: h[1] }));
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    kicker: meta.kicker ?? "Guide",
    date: meta.date,
    updated: meta.updated ?? meta.date,
    stores: (meta.stores ?? "").split(",").map((s) => s.trim()).filter(Boolean),
    body,
    faqs,
    headings,
    words: (body + faqs.map((f) => f.q + f.a).join(" ")).split(/\s+/).length,
  };
}

