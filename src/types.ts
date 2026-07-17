export type BadgeStatus = "yes" | "no" | "warning";

export interface PolicyBadge {
  label: string;
  status: BadgeStatus;
  note?: string;
}

export interface QuickAnswer {
  returnWindow: string;
  receiptRequired: boolean;
  restockingFee: boolean;
  refundMethod: string;
  onlineReturns: boolean;
  inStoreReturns: boolean;
}

export interface PolicyTableRow {
  category: string;
  window: string;
  condition: string;
  fee: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface StoreFrontmatter {
  brand: string;
  slug: string;
  country?: string; // "US", "CA", "UK", "AU", etc.
  countryName?: string; // "United States", "Canada", "United Kingdom", "Australia", etc.
  category: string[];
  logo?: string;
  lastVerified: string;
  officialPolicyUrl: string;
  metaDescription: string;
  quickAnswer: QuickAnswer;
  badges: PolicyBadge[];
  policyTable: PolicyTableRow[];
  steps: Step[];
  faqs: Faq[];
  relatedBrands?: string[];
  proseContent?: string; // Built-in markdown text
}

export interface StoreTopicFrontmatter {
  brand: string;
  brandSlug: string;
  topic: string;
  title: string;
  metaDescription: string;
  lastVerified: string;
  quickAnswer: string;
  faqs: Faq[];
  steps: Step[];
  proseContent?: string;
}

export type ArticleCategory =
  | "how-to"
  | "comparison"
  | "consumer-rights"
  | "seasonal"
  | "glossary";

export interface ArticleGuide {
  title: string;
  slug: string;
  description: string;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  heroImage?: string;
  author: string;
  relatedStores: string[];
  relatedArticles: string[];
  summary: string;
  faqs: Faq[];
  steps: Step[];
  proseContent?: string;
}
