/**
 * guides.ts - the guides and lists. Each one is built from the verified store data, so a
 * store's numbers on a list always match its own page. The text around each list is written
 * by hand; the rows are picked by a rule (window length, holiday rules, wording in the policy).
 */
import { POLICIES, type VerifiedPolicy } from "../data/policies";

export interface GuideRow {
  p: VerifiedPolicy;
  /** The rule shown next to the store, taken from its verified facts */
  note: string;
}
export interface Guide {
  slug: string;
  title: string;
  /** H1 (can be longer than the <title>) */
  h1: string;
  description: string;
  kicker: string;
  intro: string[];
  rowsLabel: string;
  rows: () => GuideRow[];
  tips: string[];
  faqs: { q: string; a: string }[];
  published: string;
  updated: string;
}

const byWindow = (a: VerifiedPolicy, b: VerifiedPolicy) => (b.windowDays ?? 10000) - (a.windowDays ?? 10000) || a.name.localeCompare(b.name);
const allText = (p: VerifiedPolicy) => [p.headline, ...p.facts.map((f) => `${f.label}: ${f.value}`), ...p.exceptions];
/** First fact/exception of a store that matches a pattern */
function firstMatch(p: VerifiedPolicy, re: RegExp) {
  return allText(p).find((t) => re.test(t));
}
function matching(re: RegExp, exclude?: RegExp) {
  return POLICIES.flatMap((p) => {
    const note = firstMatch(p, re);
    return note && !(exclude && exclude.test(note)) ? [{ p, note }] : [];
  }).sort((a, b) => byWindow(a.p, b.p));
}

export const GUIDES: Guide[] = [
  {
    slug: "return-policy-cheat-sheet-2026",
    title: "Return Policy Cheat Sheet 2026: Every Store's Window",
    h1: "Return policy cheat sheet 2026: every store's window on one page",
    description: "Every store's return window on one page, from the longest to the shortest: US, UK, Europe, Canada, Australia, the Gulf, India and Pakistan, checked.",
    kicker: "Cheat sheet",
    intro: [
      "Bookmark this page. It lists the main return window for every store we cover, longest first, so you can see in a few seconds how long you have, wherever you shop.",
      "The number is each store's main window. Electronics, sale items and member perks often change it, so tap the store for its exceptions before you head back to the shop.",
    ],
    rowsLabel: "Every store, longest window first",
    rows: () => [...POLICIES].sort(byWindow).map((p) => ({ p, note: p.headline })),
    tips: [
      "Check what the clock starts from: purchase date in store, often delivery date online.",
      "Electronics nearly always have a shorter window than the rest of the store.",
      "Holiday purchases often get extra time: see the holiday deadlines list.",
    ],
    faqs: [
      { q: "Which store has the longest return window?", a: "Costco, with no set limit on most items. Several stores give a full year, including IKEA US (unopened), IKEA UK, Decathlon France with an account, and Kmart and Target Australia for OnePass members." },
      { q: "Which store has the shortest return window?", a: "Among the stores we cover, J. (Junaid Jamshed) gives 3 days to claim a return, Jarir 3 days for returns, and Apple India accepts no change-of-mind returns at all." },
      { q: "How often is the cheat sheet updated?", a: "Every row comes from the store's own page on this site, which shows the date we last checked the official policy." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "stores-with-90-day-return-policy",
    title: "Stores With a 90-Day (or Longer) Return Policy in 2026",
    h1: "Stores with a 90-day or longer return policy",
    description: "Every store we cover that gives at least 90 days to return most items, from Walmart and Target to IKEA, Canadian Tire and Kmart, with the exceptions.",
    kicker: "List",
    intro: [
      "Ninety days is the gold standard for return windows: long enough to try something properly, or to return a gift after the holidays. These stores give at least that on most items.",
      "Read the note next to each store. Many 90-day stores cut electronics to 30 days or less, and some extra time only applies to members or cardholders.",
    ],
    rowsLabel: "Stores with 90 days or more",
    rows: () =>
      POLICIES.filter((p) => (p.windowDays ?? (p.slug === "costco" ? 10000 : 0)) >= 90)
        .sort(byWindow)
        .map((p) => ({ p, note: p.headline })),
    tips: ["Keep electronics boxes for 30 days even at a 90-day store.", "Pay by card: many long-window stores can look up a purchase without the receipt."],
    faqs: [
      { q: "Does Walmart have a 90-day return policy?", a: "Yes, for most items. Most electronics have 30 days and wireless phones 14 days." },
      { q: "Is Target's return policy 90 days?", a: "Yes, for most new, unopened items. Target Owned Brands get a year with a receipt, and electronics have 30 days." },
      { q: "Which stores give more than 90 days?", a: "Costco (no set limit for most items), IKEA US and IKEA UK (365 days), Home Depot with a store card, and Kmart and Target Australia for OnePass members." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "shortest-return-windows-2026",
    title: "Shortest Return Windows 2026: Stores With 15 Days or Less",
    h1: "Stores with the shortest return windows (15 days or less)",
    description: "Stores that give 15 days or less to return, from Apple and Best Buy to Jarir, J. and Limelight. Know the short deadlines before you buy.",
    kicker: "Watch out",
    intro: [
      "A short window is easy to miss, especially when a parcel sits unopened for a week. These stores give 15 days or less on their main window, and a few give only 3.",
      "If you buy from one of them, open the box the day it arrives and decide quickly. Use the deadline calculator on each store page to see your exact last day.",
    ],
    rowsLabel: "Stores with 15 days or less",
    rows: () =>
      POLICIES.filter((p) => (p.windowDays !== null && p.windowDays <= 15) || p.headline.startsWith("No change-of-mind"))
        .sort((a, b) => (a.windowDays ?? -1) - (b.windowDays ?? -1) || a.name.localeCompare(b.name))
        .map((p) => ({ p, note: p.headline })),
    tips: ["Open and check the parcel on the day it arrives.", "Put the deadline in your calendar straight away: each store page can create the reminder for you."],
    faqs: [
      { q: "Why do electronics stores have short return windows?", a: "Opened electronics lose value quickly, so stores like Apple (14 days) and Best Buy (15 days for most products) keep windows short and sometimes charge restocking fees." },
      { q: "Which Pakistani brands have short windows?", a: "J. gives 3 days from delivery, Limelight 7 working days, and Gul Ahmed asks you to notify them within 3 days." },
      { q: "What if I miss a short window?", a: "Ask the store anyway, politely, but expect a refusal or store credit. Faulty products are covered by consumer law separately." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "holiday-return-deadlines-2026",
    title: "Holiday Return Deadlines 2026: Extended Dates by Store",
    h1: "Holiday return deadlines 2026: every extended date we found",
    description: "Christmas and holiday return extensions for 2026, store by store: Amazon, Walmart, Target, Best Buy, John Lewis, Argos, Myer, OTTO, Fnac and more.",
    kicker: "Seasonal",
    intro: [
      "Many stores stretch their return windows for holiday shopping, so gifts bought in November can still go back in January. Each store sets its own dates, and some only cover certain products or members.",
      "These are the 2026 holiday rules published on each store's official site. Anything bought outside the dates follows the normal policy.",
    ],
    rowsLabel: "Stores with 2026 holiday rules",
    rows: () => POLICIES.filter((p) => p.holiday).map((p) => ({ p, note: p.holiday as string })),
    tips: ["Ask for a gift receipt so the person receiving the gift can return it.", "Holiday extensions change the date, not the condition rules: tags and boxes still matter."],
    faqs: [
      { q: "When do most holiday return windows end?", a: "Most extended windows end in January 2027: many US stores on January 31, Best Buy Canada on January 10, Fnac on January 15 and John Lewis on January 23." },
      { q: "Do holiday extensions cover electronics?", a: "Not always. Some stores exclude phones, TVs or large appliances, and Fnac's extension excludes marketplace items, large appliances and TVs." },
      { q: "Do I need a receipt for a holiday return?", a: "Usually yes, or a gift receipt. Check the receipt rule on the store's page." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "return-without-receipt",
    title: "Return Without a Receipt: What Each Store Asks For",
    h1: "Can you return without a receipt? What each store asks for",
    description: "What each store says about receipts and proof of purchase: card lookups, loyalty accounts, gift receipts and store credit, quoted from official policies.",
    kicker: "How-to",
    intro: [
      "Lost the receipt? Many stores can still help, but the result is often store credit instead of your money back. The difference usually comes down to whether the store can find your purchase.",
      "Below is what each store's own policy says about receipts and proof of purchase. Paying by card or scanning a loyalty card is the closest thing to a receipt you never lose.",
    ],
    rowsLabel: "What the policy says about receipts",
    rows: () => matching(/receipt|proof of purchase|look ?up|lookup|Clubcard/i),
    tips: ["Search your email for the order confirmation: it counts as proof for online orders.", "Bring the card you paid with; many stores can find the sale from it.", "Expect store credit, often at the lowest recent price, when nothing can be found."],
    faqs: [
      { q: "Which stores accept returns without a receipt?", a: "Several can look up purchases instead: Canadian Tire finds card purchases for 90 days, Tesco uses your Clubcard for 30 days, and Kohl's gives credit at the lowest recent price." },
      { q: "Do I get cash back without a receipt?", a: "Usually not. Without proof of purchase, stores typically offer an exchange or store credit." },
      { q: "Is an email confirmation a receipt?", a: "For online orders, yes: the order confirmation or packing slip is normally accepted as proof of purchase." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "restocking-fees-by-store",
    title: "Restocking Fees by Store 2026: Who Charges and How Much",
    h1: "Restocking fees by store: who charges for opened items",
    description: "Which stores charge a restocking fee or deduction on returned items, and how much: Best Buy, JB Hi-Fi, eXtra, Sharaf DG, Namshi and more.",
    kicker: "Fees",
    intro: [
      "A restocking fee is money a store keeps when you return something it can't sell as new, usually an opened electronic. It can be a flat amount or a percentage of the price.",
      "These are the stores whose official policies mention a restocking fee or a deduction. Most only apply it to opened items, so deciding before you unwrap avoids it.",
    ],
    rowsLabel: "Stores that mention a fee or deduction",
    rows: () => matching(/restocking|deduct|deduction/i),
    tips: ["Inspect the box and decide before opening if you can.", "Faulty items are not charged restocking fees under consumer law in most countries."],
    faqs: [
      { q: "Is a restocking fee legal?", a: "Generally yes, if the store discloses it in its policy. It normally can't be charged on faulty products." },
      { q: "How much is Best Buy's restocking fee?", a: "Best Buy US charges $45 on activatable devices and 15% on some items like drones and cameras; Best Buy Canada charges 15% on some opened cameras, drones, lenses and projectors." },
      { q: "Do fashion stores charge restocking fees?", a: "Rarely, but some deduct for damage: Namshi can deduct up to 30% if the security tag is removed." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "free-returns-stores",
    title: "Free Returns 2026: Stores That Don't Charge to Return",
    h1: "Stores with free returns (and where you still pay)",
    description: "Which stores offer free returns, in store or by post, and where a mail return fee applies: Zalando, OTTO, Namshi, H&M, Zara, ASOS, Gap and more.",
    kicker: "Fees",
    intro: [
      "Free returns usually come with a condition: free in store but not by post, free for members, or free only on some orders. These are the stores whose policies mention free returns, with the exact rule.",
      "If a store charges for mail returns, a nearby shop is almost always the free option.",
    ],
    rowsLabel: "Stores whose policies mention free returns",
    rows: () => matching(/free/i, /free-?standing|free of cost/i),
    tips: ["Create an account if the store gives members free returns (Gap, ASOS).", "Return in store when you can: no fee and often an instant refund."],
    faqs: [
      { q: "Which online stores have completely free returns?", a: "Zalando and OTTO in Germany give 30 free days, Namshi in the UAE 14 free days, and H&M India 15 free days." },
      { q: "Why do stores charge for returns now?", a: "Postage and handling are expensive, so many stores now charge for mail returns while keeping store returns free." },
      { q: "Is returning in store always free?", a: "At most stores we cover, yes. Check the store's page for exceptions." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
  {
    slug: "exchange-only-stores",
    title: "Exchange-Only Stores: No Cash Refund Policies Explained",
    h1: "Stores that give exchanges or credit instead of refunds",
    description: "Stores whose policies give exchanges, vouchers or store credit instead of cash refunds, including Outfitters, Limelight, Gul Ahmed, Sapphire and Al-Fatah.",
    kicker: "Know before you buy",
    intro: [
      "Some stores, especially fashion brands in Pakistan, don't give your money back for a change of mind. They offer an exchange, a voucher or a credit note instead.",
      "That's not necessarily bad, but it matters before you buy: if you aren't sure about a size or colour, a no-refund store ties your money to that brand.",
    ],
    rowsLabel: "Stores that refund as exchange or credit",
    rows: () => matching(/no refund|no cash refund|exchange only|credit note|store credit|voucher|exchange within/i),
    tips: ["Check the size chart twice before ordering.", "Ask whether a defective item can be refunded: several no-refund stores still refund defects."],
    faqs: [
      { q: "Is a no-refund policy legal?", a: "For change-of-mind returns, generally yes, if it's stated clearly. Defective products are covered by consumer law." },
      { q: "Do Pakistani clothing brands give refunds?", a: "Mostly not: Outfitters, Limelight and Gul Ahmed give exchanges or credit, and Sapphire usually gives store credit." },
      { q: "Does store credit expire?", a: "It depends on the store: Centrepoint credit notes last 6 months and Sephora UAE store credit 1 year, for example." },
    ],
    published: "2026-11-13",
    updated: "2026-11-13",
  },
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));
export const getGuide = (slug: string | undefined) => (slug ? BY_SLUG.get(slug) : undefined);
export const guidesForStore = (slug: string) => GUIDES.filter((g) => g.rows().some((r) => r.p.slug === slug));
