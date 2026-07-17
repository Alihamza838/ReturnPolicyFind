import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function useSEO({ title, description, canonical, jsonLd }: SEOProps) {
  useEffect(() => {
    // 1. Update dynamic page Title
    const fullTitle = title.includes("ReturnPolicyFind") ? title : `${title} | ReturnPolicyFind`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    const currentHref = canonical || window.location.origin + window.location.pathname;
    linkCanonical.setAttribute("href", currentHref);

    // 4. Manage Schema.org structured JSON-LD data
    const existingScript = document.getElementById("seo-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const scriptToClean = document.getElementById("seo-jsonld");
      if (scriptToClean) {
        scriptToClean.remove();
      }
    };
  }, [title, description, canonical, jsonLd]);
}
