import { Receipt } from "lucide-react";
import { Link } from "../ui/Link";
import { FOOTER_LINKS, SITE_NAME } from "../../constants";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink text-ink-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold text-white group">
              <Receipt className="h-5 w-5 text-teal-light group-hover:rotate-12 transition-transform duration-300" aria-hidden />
              <span className="relative pb-1 text-white group-hover:text-teal-light transition-colors duration-200 select-none">
                {SITE_NAME}
                <span className="absolute left-0 right-0 -bottom-1 h-2.5 pointer-events-none overflow-visible block">
                  <svg
                    viewBox="0 0 140 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-teal-light stroke-current transition-transform duration-300 group-hover:translate-y-[0.5px]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 5,3 C 40,16 100,16 132,4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 123,8 L 133,3 L 130,14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-ink-100/70 leading-relaxed">
              Verified return, refund, and exchange policies for major US, Indian, Pakistani, Chinese, and Middle Eastern retailers — audit-checked against 2026 store regulations and customer databases.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-display text-sm font-semibold text-white">{heading}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink-100/70 hover:text-teal-light transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-ink-100/50">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Return policies are
            summarized for convenience and can change without notice — always
            confirm details on the retailer&apos;s official policy page before
            making a purchase decision.
          </p>
        </div>
      </div>
    </footer>
  );
}
