import * as React from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
// Optimized Lazy Loaded Page Components for ultra-fast load times
const HomePage = React.lazy(() => import("./pages/Home").then((m) => ({ default: m.HomePage })));
const StoresPage = React.lazy(() => import("./pages/Stores").then((m) => ({ default: m.StoresPage })));
const StoreDetailPage = React.lazy(() => import("./pages/StoreDetail").then((m) => ({ default: m.StoreDetailPage })));
const StoreTopicPage = React.lazy(() => import("./pages/StoreTopic").then((m) => ({ default: m.StoreTopicPage })));
const CategoryPage = React.lazy(() => import("./pages/Category").then((m) => ({ default: m.CategoryPage })));
const ComparePage = React.lazy(() => import("./pages/Compare").then((m) => ({ default: m.ComparePage })));
const CompareDetailPage = React.lazy(() => import("./pages/CompareDetail").then((m) => ({ default: m.CompareDetailPage })));
const BlogPage = React.lazy(() => import("./pages/Blog").then((m) => ({ default: m.BlogPage })));
const BlogDetailPage = React.lazy(() => import("./pages/BlogDetail").then((m) => ({ default: m.BlogDetailPage })));

import { Link } from "./components/ui/Link";
import { Button } from "./components/ui/button";
import { SupportChat } from "./components/ui/SupportChat";
import { PageTransition } from "./components/layout/PageTransition";

// Optimized Lazy Loaded Static legal compliance pages
const AboutPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.ContactPage })));
const EditorialPolicyPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.EditorialPolicyPage })));
const DisclaimerPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.DisclaimerPage })));
const PrivacyTermsPage = React.lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.PrivacyTermsPage })));

// A elegant theme-matched loading skeleton indicator
function PageLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#D6DCEA] opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#2A6F77] animate-spin"></div>
      </div>
      <p className="text-xs font-mono text-ink-400 uppercase tracking-widest animate-pulse">Loading policy data...</p>
    </div>
  );
}

export default function App() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Router matching logic
  const renderPage = () => {
    // 1. Home Page
    if (path === "/" || path === "") {
      return <HomePage />;
    }

    // 2. Blog List Page
    if (path === "/blog") {
      return <BlogPage />;
    }

    // 3. Blog Detail Page
    if (path.startsWith("/blog/")) {
      const slug = path.replace("/blog/", "");
      return <BlogDetailPage slug={slug} />;
    }

    // 4. Stores List Page
    if (path === "/stores" || path === "/stores/") {
      return <StoresPage />;
    }

    // 5. Compare List Page
    if (path === "/compare" || path === "/compare/") {
      return <ComparePage />;
    }

    // 6. Compare Detail Page (/compare/:brandA-vs-:brandB)
    if (path.startsWith("/compare/")) {
      const compareSlug = path.replace("/compare/", "");
      const match = compareSlug.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/);
      if (match) {
        return <CompareDetailPage brandA={match[1]} brandB={match[2]} />;
      }
    }

    // 7. Category List Page
    if (path.startsWith("/category/")) {
      const catSlug = path.replace("/category/", "");
      return <CategoryPage slug={catSlug} />;
    }

    // 8. Stores details and cluster topic subpages
    if (path.startsWith("/stores/")) {
      const storeSlugPath = path.replace("/stores/", "");
      const segments = storeSlugPath.split("/").filter(Boolean);
      if (segments.length === 1) {
        // Main detail
        return <StoreDetailPage slug={segments[0]} />;
      } else if (segments.length === 2) {
        // Cluster topic (/stores/walmart/without-receipt)
        return <StoreTopicPage brandSlug={segments[0]} topic={segments[1]} />;
      }
    }

    // 9. Static Legal Compliance Pages
    if (path === "/about") return <AboutPage />;
    if (path === "/contact") return <ContactPage />;
    if (path === "/editorial-policy") return <EditorialPolicyPage />;
    if (path === "/disclaimer") return <DisclaimerPage />;
    if (path === "/privacy") return <PrivacyTermsPage />;
    if (path === "/terms") return <PrivacyTermsPage />;

    // 10. Fallback 404 Page
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">404 — Page Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          We couldn&apos;t locate the return policy resource you were seeking.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button variant="teal">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink font-sans antialiased">
      <Header />
      <main className="flex-1">
        <React.Suspense fallback={<PageLoadingFallback />}>
          <PageTransition key={path}>
            {renderPage()}
          </PageTransition>
        </React.Suspense>
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
}
