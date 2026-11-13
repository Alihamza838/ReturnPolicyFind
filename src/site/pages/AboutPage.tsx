import { Link } from "react-router-dom";
import StaticShell from "../StaticShell";
import { POLICIES } from "../../data/policies";
import { COUNTRIES } from "../../data/countries";
import { CONTACT_EMAIL, EDITOR } from "../config";

export function Component() {
  return (
    <StaticShell
      title="About ReturnPolicyFind"
      seoTitle="About ReturnPolicyFind: Independent Return Policy Finder"
      description="Who runs ReturnPolicyFind, how store return policies are read on official sites, dated and kept current, and why the site is independent of every retailer."
      path="/about"
    >
      <p>
        ReturnPolicyFind answers one question fast: <strong>can I still return this, and how?</strong> It covers {POLICIES.length} stores in {COUNTRIES.length} countries,
        from American big-box chains to UK high streets, Gulf marketplaces and Pakistani fashion brands.
      </p>
      <h2>Why we built it</h2>
      <p>
        Return rules hide in long help pages, change every season and differ by country even for the same brand. Most sites that summarise them are out of date. We wanted
        one place where the answer comes first, the source is linked and the date is visible.
      </p>
      <h2>Independent</h2>
      <p>
        We are not part of any retailer and no store pays to be listed or described in a certain way. Store names only identify whose policy a page describes, and the
        store's own policy always has the final word.
      </p>
      <h2>Who edits the site</h2>
      <p>
        <strong>{EDITOR.name}, {EDITOR.role.toLowerCase()}.</strong> {EDITOR.bio}
      </p>
      <h2>How a page is made</h2>
      <p>
        Every store page is written from the retailer's official returns page, help centre or terms, and shows the date it was checked. Lists such as the{" "}
        <Link to="/guides/return-policy-cheat-sheet-2026/">return policy cheat sheet</Link> are built from the same verified data, so the numbers always agree. The full
        method is on <Link to="/editorial-policy/">how we check policies</Link>.
      </p>
      <h2>Contact</h2>
      <p>
        Spotted a change? Email <a href={`mailto:${CONTACT_EMAIL}?subject=ReturnPolicyFind`}>{CONTACT_EMAIL}</a> or see the <Link to="/contact/">contact page</Link>.
      </p>
    </StaticShell>
  );
}
