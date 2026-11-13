/** Site-wide constants (domain, name, author). Change the domain here only. */
export const SITE_URL = "https://returnpolicyfind.com";
export const SITE_NAME = "ReturnPolicyFind";
export const SITE_TAGLINE = "Find any store's return policy, checked on the official site";
export const CONTACT_EMAIL = "akhamza386@gmail.com";

/** Absolute URL with the trailing slash the host uses (vercel.json: trailingSlash true). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return `${SITE_URL}${p}`;
}

/** Internal link with a trailing slash, matching the canonical URLs. */
export function href(path: string): string {
  if (path === "/" || /^https?:/.test(path) || path.includes("#") || path.includes("?")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export const EDITOR = {
  name: "Ali Hamza",
  role: "Editor",
  bio: "Ali Hamza edits ReturnPolicyFind. He reads each retailer's own returns page, writes down the rules in plain words, records the date he checked and updates the page when a store changes its policy.",
};
