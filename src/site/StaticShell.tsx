import type { ReactNode } from "react";
import Seo from "./Seo";
import { breadcrumbSchema } from "./schema";
import { Breadcrumbs, Container } from "./ui";

export default function StaticShell({ title, seoTitle, description, path, children }: { title: string; seoTitle?: string; description: string; path: string; children: ReactNode }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];
  return (
    <>
      <Seo title={seoTitle ?? title} description={description} path={path} jsonLd={[breadcrumbSchema(crumbs)]} />
      <div className="border-b border-line bg-white">
        <Container className="py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 text-4xl text-ink sm:text-5xl">{title}</h1>
        </Container>
      </div>
      <Container className="py-10">
        <div className="receipt prose-read rounded-t-[22px] border border-b-0 border-line px-6 pt-8 sm:px-10">{children}</div>
      </Container>
    </>
  );
}
