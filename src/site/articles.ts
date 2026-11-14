/**
 * articles.ts - long-form articles from src/content/articles/*.md (frontmatter + Markdown).
 * Facts in an article must match the verified store data; every store named is linked.
 */
import { getPolicy, type VerifiedPolicy } from "../data/policies";
import { parseArticle, type Article } from "./article-parse";

export type { Article };
const files = import.meta.glob("../content/articles/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
export const ARTICLES: Article[] = Object.entries(files)
  .map(([f, raw]) => parseArticle(raw, f))
  .sort((a, b) => a.title.localeCompare(b.title));
const BY_SLUG = new Map(ARTICLES.map((a) => [a.slug, a]));
export const getArticle = (slug: string | undefined) => (slug ? BY_SLUG.get(slug) : undefined);
export const articleStores = (a: Article) => a.stores.map((s) => getPolicy(s)).filter((p): p is VerifiedPolicy => Boolean(p));
export const articlesForStore = (slug: string) => ARTICLES.filter((a) => a.stores.includes(slug));
