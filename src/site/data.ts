/**
 * data.ts - categories, comparisons and image paths, all derived from the verified policies
 * (src/data/policies.ts). Lists, routes, the sitemap and the images use the same data.
 */
import { POLICIES, getPolicy, type VerifiedPolicy } from "../data/policies";

export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  match: string[];
}

/** Category URLs kept from the old site (/category/:slug) */
export const CATEGORIES: Category[] = [
  {
    slug: "department-stores",
    name: "Department stores",
    title: "Department Store Return Policies Compared (2026)",
    description: "Return windows at Target, Walmart, Kohl's, Macy's, Nordstrom, M&S, John Lewis, Myer and more, side by side and checked on each official site.",
    intro: "Department stores give the longest windows on everyday items and the shortest on electronics. The list puts the main window first, so you can see straight away which store is most forgiving.",
    match: ["Department store"],
  },
  {
    slug: "grocery-bigbox",
    name: "Big-box & warehouse",
    title: "Costco, Walmart & Big-Box Return Policies Compared",
    description: "Costco, Carrefour, Tesco and other big-box and warehouse store return policies: windows, receipt rules and the categories with shorter limits.",
    intro: "Warehouse clubs and hypermarkets sell everything from groceries to TVs, so their policies usually split into a generous general window and a short one for electronics.",
    match: ["Warehouse club", "Hypermarket"],
  },
  {
    slug: "clothing",
    name: "Clothing & fashion",
    title: "Clothing Store Return Policies: Days, Fees & Tag Rules",
    description: "Return windows, mail fees and tag rules for Zara, H&M, Gap, Next, ASOS, Primark, SHEIN, Khaadi, Sapphire and more fashion stores, checked officially.",
    intro: "Fashion returns hinge on three things: the window (often 14 to 30 days), whether tags are still on, and whether you return in a store or pay to post it back.",
    match: ["Clothing", "Off-price", "Online fashion"],
  },
  {
    slug: "activewear",
    name: "Shoes & activewear",
    title: "Shoe & Activewear Return Policies (DSW, Nike, JD Sports)",
    description: "DSW, Nike, adidas, Foot Locker, lululemon, JD Sports and Decathlon return policies: how long you get and whether worn shoes or kit can go back.",
    intro: "Shoes are hard to judge online, so these stores see a lot of returns. The big difference between them is whether items you have worn outside can still come back.",
    match: ["Shoes", "Shoes & sportswear", "Sportswear"],
  },
  {
    slug: "electronics",
    name: "Electronics & apps",
    title: "Electronics Return Policies: Best Buy, Apple, Currys & More",
    description: "Return windows and restocking fees for Best Buy, Apple, Currys, MediaMarkt, Croma, Sharaf DG, JB Hi-Fi and more, checked on each official site.",
    intro: "Electronics have the shortest windows and the most fees. Several stores charge a restocking fee once the box is opened, so check before you unwrap.",
    match: ["Electronics", "Subscription"],
  },
  {
    slug: "home-improvement",
    name: "Home improvement",
    title: "Home Depot vs Lowe's & DIY Store Return Policies",
    description: "Home Depot and Lowe's return policies compared: 90-day windows, major appliance limits and what changes when you pay with a store card.",
    intro: "DIY stores give long windows on most products, with special limits on big appliances and plants. Paying with a store card can change the window.",
    match: ["Home improvement"],
  },
  {
    slug: "furniture",
    name: "Furniture & home",
    title: "Furniture Return Policies: IKEA, Wayfair & More Compared",
    description: "IKEA in the US, UK and UAE and Wayfair return policies compared: windows for opened and assembled furniture, fees and mattress rules.",
    intro: "Furniture is expensive to send back, so the details matter: whether assembled items count, who pays for collection, and special mattress rules.",
    match: ["Furniture"],
  },
  {
    slug: "beauty",
    name: "Beauty",
    title: "Beauty Return Policies: Sephora, Ulta, Boots, Nykaa",
    description: "Sephora (US, Canada, UAE), Ulta, Boots and Nykaa return policies: refund windows, opened-product rules and receipts, checked on each official site.",
    intro: "Beauty stores differ most on opened products: some take back used items, others want them sealed. Here is how they compare.",
    match: ["Beauty"],
  },
  {
    slug: "marketplaces",
    name: "Online marketplaces",
    title: "Marketplace Return Policies: Amazon, eBay, Temu, Daraz",
    description: "How returns work on Amazon (7 countries), eBay, Etsy, Temu, AliExpress, noon, Daraz, Flipkart, Meesho and OTTO: platform rules vs seller rules.",
    intro: "On a marketplace the platform's rule and the seller's rule can differ. These pages show which applies, how long you have and what protection you get.",
    match: ["Online marketplace"],
  },
];

export const storesInCategory = (c: Category) => POLICIES.filter((p) => c.match.includes(p.category));
export const categoryOf = (p: VerifiedPolicy) => CATEGORIES.find((c) => c.match.includes(p.category));
export function relatedStores(p: VerifiedPolicy, limit = 6) {
  const cat = categoryOf(p);
  const same = POLICIES.filter((x) => x.slug !== p.slug && cat?.match.includes(x.category));
  return [...new Set([...same.filter((x) => x.country === p.country), ...same])].slice(0, limit);
}

// ─── Comparisons (old URLs kept first) ────────────────────────────────────────
export const COMPARE_PAIRS: [string, string][] = [
  ["target", "walmart"],
  ["sephora", "ulta"],
  ["home-depot", "lowes"],
  ["walmart", "walmart-ca"],
  ["daraz", "amazon"],
  ["flipkart", "myntra"],
  ["temu", "aliexpress"],
  ["shein", "myntra"],
  ["shein", "temu"],
  ["costco", "walmart"],
  ["amazon", "walmart"],
  ["kohls", "macys"],
  ["nike", "adidas"],
  ["dsw", "nordstrom"],
  ["best-buy", "walmart"],
  ["zara", "hm"],
  ["gap", "old-navy"],
  ["ikea", "wayfair"],
  ["amazon", "ebay"],
  ["amazon-uk", "argos"],
  ["next", "marks-and-spencer"],
  ["asos", "zara-uk"],
  ["tesco", "argos"],
  ["currys", "argos"],
  ["noon", "amazon-ae"],
  ["namshi", "centrepoint"],
  ["extra", "jarir"],
  ["amazon-in", "flipkart"],
  ["nykaa", "myntra"],
  ["khaadi", "sapphire"],
  ["outfitters", "limelight"],
  ["zalando", "otto"],
  ["canadian-tire", "walmart-ca"],
  ["kmart-au", "target-au"],
];
export const pairSlug = (a: string, b: string) => `${a}-vs-${b}`;
export function parsePair(slug: string | undefined): [VerifiedPolicy, VerifiedPolicy] | undefined {
  const pair = COMPARE_PAIRS.find(([a, b]) => pairSlug(a, b) === slug);
  const a = pair && getPolicy(pair[0]);
  const b = pair && getPolicy(pair[1]);
  return a && b ? [a, b] : undefined;
}
export const pairsFor = (slug: string) => COMPARE_PAIRS.filter(([a, b]) => a === slug || b === slug);

// ─── Images (drawn by scripts/generate-images.tsx) ───────────────────────────
export const storeImage = (slug: string) => `/images/tickets/${slug}.webp`;
export const storeOg = (slug: string) => `/og/stores/${slug}.jpg`;
export const guideImage = (slug: string) => `/images/guides/${slug}.webp`;
export const guideOg = (slug: string) => `/og/guides/${slug}.jpg`;
export const compareOg = (slug: string) => `/og/compare/${slug}.jpg`;
export const countryOg = (slug: string) => `/og/countries/${slug}.jpg`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
export const monthYear = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
export const latestChecked = () => POLICIES.reduce((m, p) => (p.checked > m ? p.checked : m), "");

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\d?\./, "");
  } catch {
    return url;
  }
}

/** Shorten to a description length, cut at a word, "&" counted as "&amp;" */
export function clamp(text: string, max = 155) {
  max -= (text.slice(0, max).match(/&/g)?.length ?? 0) * 4;
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s—-]+$/, "") + ".";
}
