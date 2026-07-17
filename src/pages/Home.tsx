import { HeroSection } from "../components/home/HeroSection";
import { FeaturedStores } from "../components/home/FeaturedStores";
import { PopularGuides } from "../components/home/PopularGuides";
import { ConsumerAdvisorySection } from "../components/home/ConsumerAdvisorySection";
import { storesData } from "../data/stores";
import { guidesData } from "../data/guides";
import { useSEO } from "../hooks/useSEO";

export function HomePage() {
  // Grab top stores and explicitly feature DSW
  const featuredStoreSlugs = ["target", "walmart", "dsw", "amazon", "nike", "costco"];
  const stores = featuredStoreSlugs
    .map(slug => storesData.find(s => s.slug === slug))
    .filter(Boolean) as typeof storesData;

  // Make sure if any featured stores are missing, we fall back to the first 6 stores
  const finalStores = stores.length > 0 ? stores : storesData.slice(0, 6);

  // Grab guides and put our new DSW guide at the absolute top of the homepage lists
  const dswGuide = guidesData.find(g => g.slug === "dsw-return-policy-complete-guide");
  const otherGuides = guidesData.filter(g => g.slug !== "dsw-return-policy-complete-guide").slice(0, 5);
  const finalGuides = dswGuide ? [dswGuide, ...otherGuides] : guidesData.slice(0, 6);

  useSEO({
    title: "ReturnPolicyFind — Verified Store Return & Refund Policies",
    description: "Search and compare verified return windows, receipt requirements, restocking fees, and return shipping rules for over 20+ major retailers worldwide.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ReturnPolicyFind",
      "url": "https://returnpolicyfind.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://returnpolicyfind.com/stores?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  });

  return (
    <div className="fade-in">
      <HeroSection />
      <FeaturedStores stores={finalStores} />
      <PopularGuides guides={finalGuides} />
      <ConsumerAdvisorySection />
    </div>
  );
}
