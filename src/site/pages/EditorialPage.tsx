import { Link } from "react-router-dom";
import StaticShell from "../StaticShell";

export function Component() {
  return (
    <StaticShell
      title="How we check return policies"
      seoTitle="Editorial Policy: How ReturnPolicyFind Checks Policies"
      description="The ReturnPolicyFind method: official sources only, a date on every page, no guessing when a store is unclear, and fast corrections when a policy changes."
      path="/editorial-policy"
    >
      <h2>1. Start at the source</h2>
      <p>
        We read the store's own returns policy, help centre or terms of sale, in the country the page covers. Coupon sites, forums, old news articles and other return-policy
        websites are never used as a source.
      </p>
      <h2>2. Capture the rules that matter at the counter</h2>
      <p>
        For each store we record the main window and what it counts from, receipt and proof-of-purchase rules, refund method and timing, fees, exceptions, member perks and
        holiday changes.
      </p>
      <h2>3. Say what we couldn't confirm</h2>
      <p>
        When official pages disagree or leave something out, the store page says so in a "Not confirmed" note. We don't fill gaps with guesses.
      </p>
      <h2>4. Date it and link it</h2>
      <p>
        Every store page shows the date of the check and links to the exact official page. Lists and comparisons reuse the same records, so a correction fixes every page at
        once.
      </p>
      <h2>5. Re-check and correct</h2>
      <p>
        Policies change without notice, especially around the holidays. If you see a difference, <Link to="/contact/">tell us</Link>: we verify every report against the official
        source and update the page and its date.
      </p>
      <h2>Images</h2>
      <p>
        The graphics on this site are drawn from the policy data (timelines and comparison cards). They contain no store logos and no invented details.
      </p>
      <h2>Independence</h2>
      <p>
        No retailer pays for coverage. If the site ever shows advertising or affiliate links, they will be clearly labelled and will never change how a policy is described.
      </p>
    </StaticShell>
  );
}
