/**
 * Layout.tsx - top bar, header, footer and the page outlet shared by every route.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { POLICIES } from "../data/policies";
import { COUNTRIES } from "../data/countries";
import { CATEGORIES, formatDate, latestChecked } from "./data";
import { SITE_NAME, href } from "./config";
import { Container } from "./ui";
import { ScrollEffects } from "./ScrollEffects";
import { CountrySuggestion } from "./CountryPicker";

const NAV = [
  { to: "/stores/", label: "Stores" },
  { to: "/countries/", label: "Countries" },
  { to: "/compare/", label: "Compare" },
  { to: "/guides/", label: "Guides" },
  { to: "/tools/return-deadline-calculator/", label: "Deadline tool" },
];
const FOOTER_STORES = ["walmart", "target", "amazon", "costco", "dsw", "nike", "amazon-uk", "tesco", "noon", "amazon-in", "daraz", "khaadi"];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
        <path d="M14 6h36v50l-6-4-6 4-6-4-6 4-6-4-6 4z" fill="#C2410C" />
        <path d="M22 18h20M22 26h20M22 34h12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <circle cx="44" cy="42" r="9" fill="#14213D" stroke="#fff" strokeWidth="3.5" />
        <path d="m50.5 48.5 6 6" stroke="#14213D" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        ReturnPolicy<span className={light ? "text-coral-400" : "text-coral-700"}>Find</span>
      </span>
    </Link>
  );
}

function HeaderSearch({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      action="/stores/"
      method="get"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q.trim() ? `/stores/?q=${encodeURIComponent(q.trim())}` : "/stores/");
      }}
    >
      <label className="relative block">
        <span className="sr-only">Find a store</span>
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find a store…"
          className="h-11 w-full rounded-full border border-line bg-cream pl-10 pr-4 text-[15px] text-ink placeholder:text-ink-3 focus:border-coral-500 focus:outline-none"
        />
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </label>
    </form>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollEffects />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">
        Skip to content
      </a>

      <div className="bg-navy text-slate-300">
        <Container className="flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 font-mono text-[11px] uppercase tracking-wider">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-coral-400" aria-hidden="true" />
            Independent · {POLICIES.length} stores · {COUNTRIES.length} countries · checked {formatDate(latestChecked())}
          </p>
          <Link to="/editorial-policy/" className="hidden font-bold text-white hover:underline sm:inline">
            How we check
          </Link>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <Container className="flex h-16 items-center gap-3">
          <Logo />
          <nav aria-label="Main" className="ml-3 hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[15px] font-semibold transition ${isActive ? "bg-navy text-white" : "text-ink-2 hover:bg-cream-2 hover:text-ink"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <HeaderSearch className="ml-auto hidden w-60 xl:block" />
          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </Container>
        {open && (
          <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
            <Container className="space-y-3 py-4">
              <HeaderSearch />
              <nav aria-label="Mobile" className="grid grid-cols-2 gap-2">
                {[...NAV, { to: "/about/", label: "About" }].map((n) => (
                  <Link key={n.to} to={n.to} className="rounded-2xl border border-line bg-cream px-4 py-3 font-semibold text-ink">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </Container>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <CountrySuggestion pathname={pathname} />

      <footer className="mt-24 bg-navy text-slate-300">
        <div className="h-3 bg-cream" style={{ WebkitMask: "conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/20px 100%", mask: "conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/20px 100%" }} aria-hidden="true" />
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed">Store return policies, read on each retailer's own website, written plainly and dated.</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Independent guide. Not affiliated with, endorsed by or sponsored by any retailer listed. Store names are trademarks of their owners.
            </p>
          </div>
          <FooterCol title="Popular stores">
            {FOOTER_STORES.map((s) => {
              const p = POLICIES.find((x) => x.slug === s);
              return p ? (
                <li key={s}>
                  <Link to={href(`/stores/${s}`)} className="hover:text-white hover:underline">
                    {p.name}
                  </Link>
                </li>
              ) : null;
            })}
          </FooterCol>
          <FooterCol title="Countries">
            {COUNTRIES.map((c) => (
              <li key={c.slug}>
                <Link to={href(`/countries/${c.slug}`)} className="hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Categories">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={href(`/category/${c.slug}`)} className="hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="ReturnPolicyFind">
            {[
              ["/about/", "About"],
              ["/editorial-policy/", "How we check policies"],
              ["/guides/", "Guides & lists"],
              ["/brands/", "Brands by country"],
              ["/tools/return-deadline-calculator/", "Return deadline calculator"],
              ["/contact/", "Contact & corrections"],
              ["/disclaimer/", "Disclaimer"],
              ["/privacy/", "Privacy"],
              ["/terms/", "Terms"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </FooterCol>
        </Container>
        <div className="border-t border-white/10">
          <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-slate-400">
            <span>
              © {new Date().getFullYear()} {SITE_NAME}. Policies change: confirm the final details on the retailer's official page, linked on every store page.
            </span>
            <span className="font-mono uppercase tracking-widest">Thank you for shopping smart</span>
          </Container>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm">{children}</ul>
    </div>
  );
}
