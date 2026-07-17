import * as React from "react";
import { Menu, X, Search, Receipt } from "lucide-react";
import { Button } from "../ui/button";
import { Link, navigate } from "../ui/Link";
import { NAV_LINKS, SITE_NAME } from "../../constants";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/stores?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink group">
          <Receipt className="h-5 w-5 text-teal-brand group-hover:rotate-12 transition-transform duration-300" aria-hidden />
            <span className="relative pb-1 text-ink group-hover:text-teal-brand transition-colors duration-200 select-none">
              {SITE_NAME}
              <span className="absolute left-0 right-0 -bottom-1 h-2.5 pointer-events-none overflow-visible block">
                <svg
                  viewBox="0 0 140 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-teal-brand stroke-current transition-transform duration-300 group-hover:translate-y-[0.5px]"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 5,2 C 35,24 105,24 132,2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 121,9 L 132,2 L 128,14"
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

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-ink-600 transition-colors hover:text-teal-brand py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/stores" aria-label="Search return policies">
            <Button variant="outline" size="sm" className="gap-2 cursor-pointer hover:bg-teal-light/20 hover:border-teal-brand transition-all duration-300">
              <Search className="h-4 w-4 text-teal-brand" />
              Find a store
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-1.5 rounded-md hover:bg-ink-50 transition-colors cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6 text-teal-brand" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-paper border-b border-ink-100"
          >
            <div className="px-4 py-3">
              <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
                <input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search a store, e.g. Target"
                  className="flex-1 rounded-md border border-ink-100 bg-white py-1.5 px-3 text-sm focus:border-teal-brand focus:ring-1 focus:ring-teal-brand focus:outline-none"
                />
                <Button type="submit" variant="teal" size="sm">Search</Button>
              </form>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 block transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/stores"
                  className="mt-2 rounded-md bg-teal-brand px-3 py-2 text-center text-sm font-medium text-white block hover:bg-teal-dark transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Find a store
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
