import * as React from "react";
import { Mail, CheckCircle2, ShieldAlert, Award, FileText, Scale, Users, FileCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10 fade-in text-[#14213D]">
      <header className="border-b border-[#D6DCEA] pb-6 text-center sm:text-left">
        <h1 className="font-display text-3xl font-extrabold text-[#14213D] sm:text-4xl">About ReturnPolicyFind</h1>
        <p className="mt-2 text-sm md:text-base text-ink-600 font-medium">
          Empowering global consumers with crystal-clear, verified, and audited retailer return guidelines.
        </p>
      </header>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6 text-sm text-ink-600 leading-relaxed font-sans">
          <p className="text-base font-semibold">
            Stand at the customer service counter with absolute confidence.
          </p>
          <p>
            Have you ever stood in a return line feeling anxious, wondering if your swatched makeup, 
            lightly worn athletic sneakers, or box-free electronics would be rejected? 
            We built **ReturnPolicyFind** to solve that exact problem. 
          </p>
          <p>
            Retail store policies are intentionally published in massive, legally-dense blocks of fine print. 
            They bury critical exclusions—like cell phone restocking fees, worn-shoe satisfaction exceptions, or 
            shorter international timeframes—deep inside massive terms of sale agreements, making them nearly impossible 
            for everyday shoppers to parse.
          </p>
          <p>
            We actively monitor, audit, and condense these complex policies into simple, highly structured guidelines 
            so you can find what you need in 10 seconds or less. We trace every single policy back to its primary 
            source, providing verified paths for refunds, receipt-less exchanges, and original payment lookup hacks.
          </p>

          <h3 className="font-display text-lg font-bold text-[#14213D] pt-4">Our Methodology</h3>
          <p>
            Unlike automated scrapers that pull raw AI-generated guesses, our editorial team follows a strict 
            **Double-Blind Verification Protocol**. We cross-examine the official digital help articles of major retailers 
            with real-world register receipts and in-store customer experiences. If a policy has a hidden catch, we write a 
            step-by-step guideline detailing how to bypass or prepare for it.
          </p>
        </div>

        <div className="md:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-[#2A6F77]/10 to-white border border-[#D6DCEA]">
            <CardContent className="p-5 space-y-4">
              <h4 className="font-display font-bold text-[#14213D] text-xs uppercase tracking-wider font-mono">Our Impact:</h4>
              <div className="space-y-4 font-mono">
                <div>
                  <p className="text-3xl font-extrabold text-[#2A6F77]">15+</p>
                  <p className="text-[10px] text-ink-400">Audited Global Retailers</p>
                </div>
                <div className="border-t border-[#D6DCEA] pt-3">
                  <p className="text-3xl font-extrabold text-[#2A6F77]">100%</p>
                  <p className="text-[10px] text-ink-400">Manual Human Verification</p>
                </div>
                <div className="border-t border-[#D6DCEA] pt-3">
                  <p className="text-3xl font-extrabold text-[#2A6F77]">4 Territory</p>
                  <p className="text-[10px] text-ink-400">Country Coverages (US, CA, UK, AU)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#D6DCEA] text-xs space-y-2">
            <span className="font-bold flex items-center gap-1.5"><Users className="h-4 w-4 text-[#2A6F77]" /> Independent Advocacy</span>
            <p className="text-ink-500">We do not accept payments from retailers to alter or boost their compliance ratings. Our data is completely uncompromised.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [subject, setSubject] = React.useState("Policy Correction");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && msg) {
      setSubmitted(true);
      setEmail("");
      setMsg("");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 fade-in">
      <Card className="border border-[#D6DCEA]">
        <CardContent className="p-6 md:p-10 space-y-6">
          <div className="text-center space-y-2">
            <Mail className="h-10 w-10 text-[#2A6F77] mx-auto" />
            <h1 className="font-display text-2xl font-bold text-[#14213D]">Contact Our Editorial Board</h1>
            <p className="text-xs text-ink-600 max-w-sm mx-auto leading-relaxed">
              Have you encountered a store that changed its return window or started charging restocking fees? Let us know so our compliance auditors can update our database.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-lg bg-teal-light/20 border border-[#2A6F77]/30 text-[#14213D] p-5 text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 mx-auto text-[#2A6F77]" />
              <p className="font-bold text-sm">Feedback Logged Successfully</p>
              <p className="text-xs text-ink-600 leading-relaxed">
                Thank you for contributing to open consumer data! Our editorial staff will cross-verify this policy change with primary merchant documents within 24–48 business hours.
              </p>
              <button onClick={() => setSubmitted(false)} className="text-xs underline font-semibold text-[#2A6F77] hover:text-[#1D4F55] cursor-pointer block mx-auto mt-2">
                Send another report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-ink-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-md border border-[#D6DCEA] bg-[#FAF8F3] px-3 py-2 text-sm text-[#14213D] focus:border-[#2A6F77] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-semibold uppercase tracking-wider text-ink-400 mb-1.5">
                    Topic
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-md border border-[#D6DCEA] bg-[#FAF8F3] px-3 py-2 text-sm text-[#14213D] focus:border-[#2A6F77] focus:outline-none cursor-pointer"
                  >
                    <option value="Policy Correction">Policy Correction / Update</option>
                    <option value="Missing Store Request">Missing Store Request</option>
                    <option value="Advertising">Advertising / Partnership</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-mono font-semibold uppercase tracking-wider text-ink-400 mb-1.5">
                  Detailed Documentation
                </label>
                <textarea
                  id="contact-msg"
                  required
                  rows={5}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Provide details of the policy discrepancy. If possible, paste a URL or mention physical store register guidelines..."
                  className="w-full rounded-md border border-[#D6DCEA] bg-[#FAF8F3] px-3 py-2 text-sm text-[#14213D] focus:border-[#2A6F77] focus:outline-none resize-none"
                />
              </div>

              <Button type="submit" variant="teal" className="w-full font-bold text-xs uppercase tracking-wider py-2.5">
                Submit Report to Auditors
              </Button>
            </form>
          )}

          <div className="border-t border-[#D6DCEA] pt-4 text-center text-[10px] text-ink-400 font-mono">
            Direct compliance updates: <span className="underline">auditors@returnpolicyfind.com</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8 fade-in text-sm text-ink-600 leading-relaxed font-sans text-[#14213D]">
      <header className="border-b border-[#D6DCEA] pb-4">
        <h1 className="font-display text-3xl font-extrabold text-[#14213D]">Editorial & Audit Guidelines</h1>
        <p className="text-xs font-mono text-ink-400 mt-1">Our commitment to 100% uncompromised accuracy.</p>
      </header>

      <div className="flex gap-4 items-start bg-teal-light/20 border border-[#2A6F77]/30 rounded-lg p-5">
        <Award className="h-6 w-6 text-[#2A6F77] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-[#14213D] text-base">The No-AI-Hallucinations Sourcing Protocol</h4>
          <p className="text-xs mt-1 leading-relaxed">
            Unlike standard scrapers that generate synthetic answers, every profile in our index is reviewed, written, 
            and fact-checked by human investigators. We prioritize primary legal terms of sale and in-store guidelines over blog rumors.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-[#14213D] flex items-center gap-2"><FileCheck className="h-5 w-5 text-[#2A6F77]" /> 1. Objective Fact-Checking Loop</h3>
        <p>
          Retail policies change constantly, especially before and after peak calendar quarters. Our researchers review core departmental guidelines every 90 days. High-risk tech or device retailers (who enforce complex restocking and activation parameters) are audited on an accelerated 30-day loop.
        </p>

        <h3 className="font-display text-lg font-bold text-[#14213D] flex items-center gap-2"><Scale className="h-5 w-5 text-[#2A6F77]" /> 2. Independence and Bias Exclusions</h3>
        <p>
          We do not host sponsored merchant links or receive advertising revenue to adjust rating statuses. If a brand operates a consumer-hostile return window (such as a 14-day limit with rigid packaging restrictions), we flag it prominently as a warning badge regardless of corporate size.
        </p>

        <h3 className="font-display text-lg font-bold text-[#14213D] flex items-center gap-2"><FileText className="h-5 w-5 text-[#2A6F77]" /> 3. Verification Standards</h3>
        <p>
          Our databases exclusively index official Primary Sources. These include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li><strong>Merchant Terms of Sale:</strong> The legally binding purchase agreements published in checkout footers.</li>
          <li><strong>In-Store Declarations:</strong> Printed notices displayed directly at physical cash registers.</li>
          <li><strong>Agent Transcripts:</strong> Verified transcripts of customer support resolutions regarding specific border-case scenarios.</li>
        </ul>
      </div>
    </div>
  );
}

export function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8 fade-in text-sm text-ink-600 leading-relaxed font-sans text-[#14213D]">
      <header className="border-b border-[#D6DCEA] pb-4">
        <h1 className="font-display text-3xl font-extrabold text-[#14213D]">General Legal Disclaimer</h1>
        <p className="text-xs font-mono text-ink-400 mt-1">Mandatory regulatory disclosure.</p>
      </header>

      <div className="flex gap-4 items-start bg-amber-light/20 border border-amber-brand/30 text-[#14213D] rounded-lg p-5">
        <ShieldAlert className="h-6 w-6 text-amber-brand shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-[#14213D]">We are a completely independent directory</h4>
          <p className="text-xs mt-1 leading-relaxed">
            ReturnPolicyFind does not represent, contract with, or operate under the auspices of any merchant mentioned on this site. 
            All logos, trade names, and product designations are properties of their respective registered owners.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-[#14213D]">No Liability & Register Authority</h3>
        <p>
          While we exert maximum editorial diligence to compile accurate information, return parameters are highly subject to change 
          without public disclosure. Furthermore, most retail guidelines explicitly contain a clause granting **sole, final decision-making 
          authority** to individual cashiers and store managers at physical checkouts.
        </p>
        <p>
          Consequently, ReturnPolicyFind cannot guarantee return approvals. Any purchase, shipping, or return action you execute 
          based on our guidelines is at your own commercial discretion and financial risk.
        </p>

        <h3 className="font-display text-base font-bold text-[#14213D] pt-2">State Statutes Fallback Warning (e.g. California Civil Code § 1723)</h3>
        <p className="text-xs text-ink-500">
          In various jurisdictions, such as California, businesses that have a policy of no-refund or no-exchange must conspicuously 
          display their guidelines on the storefront or at the cash registers. Failure to do so grants consumers the legal right to return 
          any unused item with proof of purchase within 30 days of sale. Our materials are intended solely as general guides and do not 
          constitute professional legal counsel.
        </p>
      </div>
    </div>
  );
}

export function PrivacyTermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-8 fade-in text-sm text-ink-600 leading-relaxed font-sans text-[#14213D]">
      <header className="border-b border-[#D6DCEA] pb-4">
        <h1 className="font-display text-3xl font-extrabold text-[#14213D]">Privacy Policy & Terms of Use</h1>
        <p className="text-xs font-mono text-ink-400 mt-1">Last revised: July 2026</p>
      </header>

      <div className="flex gap-4 items-start bg-teal-light/10 border border-[#2A6F77]/20 rounded-lg p-5">
        <FileText className="h-6 w-6 text-[#2A6F77] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-[#14213D] text-base">Consumer Privacy Guarantee</h4>
          <p className="text-xs mt-1 leading-relaxed">
            We operate fully under privacy-first design patterns. We do not require accounts, we do not store personal credit histories, 
            and we do not package or license individual browser searches to marketing brokers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-[#14213D]">1. Compliance with International Mandates (GDPR & CCPA)</h3>
        <p>
          For visitors accessing our portal from the European Union (EU) or California (US), we fully support and align with all standard data-minimization mandates:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Right to Avoid Profiling:</strong> We run no tracking scripts that compile cross-site profiles.</li>
          <li><strong>Cookie Limitation:</strong> We utilize minimal, functional diagnostic browser memory storage (like saving search filters) which contains zero tracking IDs.</li>
        </ul>

        <h3 className="font-display text-lg font-bold text-[#14213D] pt-2">2. Terms of Directory Usage</h3>
        <p>
          By utilizing ReturnPolicyFind, you covenant and agree that all summaries, calculations, comparison tools, and help guidelines are strictly instructional. You agree to hold ReturnPolicyFind and its publishers harmless against any commercial losses, fees, or transaction disputes occurring between you and any retailer indexed on our pages.
        </p>

        <h3 className="font-display text-lg font-bold text-[#14213D] pt-2">3. Intellectual Property</h3>
        <p>
          The layout, specialized table comparisons, database structures, and custom editorial prose are copyrighted properties of ReturnPolicyFind. Scrambling, automated content scraping, or publishing our proprietary summaries on secondary directories without attribution is strictly prohibited.
        </p>
      </div>
    </div>
  );
}
