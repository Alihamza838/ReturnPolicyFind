/**
 * Draws every image on the site from the verified data (npm run images):
 *   store tickets   public/images/tickets/<slug>.webp (800x420) + public/og/stores/<slug>.jpg (1200x630)
 *   guide covers    public/images/guides/<slug>.webp + public/og/guides/<slug>.jpg
 *   comparisons     public/og/compare/<a>-vs-<b>.jpg
 *   countries       public/og/countries/<slug>.jpg
 *   default         public/og/default.jpg, plus PNG icons from the logo
 *
 * Style: the ReturnPolicyFind receipt/ticket look. No store logos (names are plain text), and every
 * number comes from src/data/policies.ts, so re-run after a policy changes.
 * Optional filter: npm run images -- walmart. CHROMIUM_PATH selects the browser binary.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";
import { chromium } from "playwright-core";
import { POLICIES, getPolicy, type VerifiedPolicy } from "../src/data/policies";
import { COUNTRIES, countryOfPolicy, storesInCountry } from "../src/data/countries";
import { COMPARE_PAIRS, pairSlug } from "../src/site/data";
import { GUIDES } from "../src/site/guides";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M14 6h36v50l-6-4-6 4-6-4-6 4-6-4-6 4z" fill="#C2410C"/><path d="M22 18h20M22 26h20M22 34h12" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="42" r="9" fill="#14213D" stroke="#fff" stroke-width="3.5"/><path d="m50.5 48.5 6 6" stroke="#14213D" stroke-width="5" stroke-linecap="round"/></svg>`;

const CSS = `*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;font-family:"DejaVu Sans",Arial,sans-serif;color:#14213d;background:#fbf7f0;position:relative}
.mono{font-family:"Liberation Mono","DejaVu Sans Mono",monospace;font-weight:700}
.brand{position:absolute;display:flex;align-items:center;gap:12px;font-size:24px;font-weight:800}
.brand svg{width:42px;height:42px}.brand b{color:#c2410c}
.blob{position:absolute;border-radius:42% 58% 63% 37%/41% 44% 56% 59%}
.perf{height:3px;background:repeating-linear-gradient(90deg,#e6dfd1 0 10px,transparent 10px 18px)}
.barcode{height:40px;background:repeating-linear-gradient(90deg,#14213d 0 3px,transparent 3px 6px,#14213d 6px 7px,transparent 7px 11px,#14213d 11px 15px,transparent 15px 18px)}
.ticket{position:absolute;background:#fff;border-radius:28px;-webkit-mask:radial-gradient(circle 18px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 18px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat}
.stamp{display:inline-block;border:4px solid #047857;color:#047857;border-radius:12px;padding:6px 14px;font-weight:800;letter-spacing:.14em;font-size:18px;transform:rotate(-5deg)}`;
const brand = (pos: string, light = false) =>
  `<div class="brand" style="${pos};color:${light ? "#fff" : "#14213d"}">${LOGO_SVG}<span>ReturnPolicy<b style="color:${light ? "#fb8a4c" : "#c2410c"}">Find</b></span></div>`;

function win(p: VerifiedPolicy) {
  if (p.windowDays === null && p.headline.startsWith("No change-of-mind")) return { big: "0", unit: "DAYS" };
  if (p.windowDays === null) return p.slug === "costco" ? { big: "∞", unit: "NO SET LIMIT" } : { big: "?", unit: "VARIES" };
  return { big: String(p.windowDays), unit: p.windowDays === 1 ? "DAY" : "DAYS" };
}
const fit = (s: string, base: number, len: number) => (s.length > len ? Math.round((base * len) / s.length) : base);

function storeHtml(p: VerifiedPolicy) {
  const c = countryOfPolicy(p);
  const w = win(p);
  const pts = p.timeline;
  const max = Math.max(...pts.map((t) => t.day), 1);
  const W = 640;
  let last = -999;
  const marks = pts
    .map((t, i) => {
      const x = Math.min(W, Math.max(Math.sqrt(t.day / max) * W, last + 70));
      last = x;
      const up = i % 2 === 1;
      const align = x > W - 120 ? "right:-10px;text-align:right" : x < 60 ? "left:-10px" : "transform:translateX(-50%);text-align:center";
      return `<div style="position:absolute;left:${x}px;top:0"><span style="position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;background:${t.day === 0 ? "#fff" : "#14213d"};border:5px solid ${t.day === 0 ? "#fb8a4c" : "#fff"};box-shadow:0 2px 6px rgba(0,0,0,.2)"></span>
      <div style="position:absolute;${align};${up ? "bottom:26px" : "top:26px"};width:170px"><b class="mono" style="display:block;font-size:19px;color:#c2410c">DAY ${t.day}</b><span style="font-size:16px;color:#3a4a6b;line-height:1.2">${esc(t.label)}</span></div></div>`;
    })
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
  <div class="blob" style="right:-120px;top:-140px;width:520px;height:520px;background:#ffe4d1"></div>
  <div class="ticket" style="left:56px;top:70px;width:300px;height:490px;background:#0e1830;color:#fff;text-align:center;padding-top:60px">
    <div class="mono" style="font-size:18px;letter-spacing:.3em;color:#cbd5e1">YOU HAVE</div>
    <div class="mono" style="font-size:${w.big.length > 2 ? 120 : 150}px;font-weight:800;color:#fb8a4c;line-height:1.1;margin-top:20px">${esc(w.big)}</div>
    <div class="mono" style="font-size:22px;letter-spacing:.2em;color:#cbd5e1">${w.unit}</div>
    <div class="perf" style="margin:40px 30px 30px;background:repeating-linear-gradient(90deg,#334155 0 10px,transparent 10px 18px)"></div>
    <div class="mono" style="font-size:16px;color:#94a3b8">CHECKED</div>
    <div class="mono" style="font-size:20px;font-weight:700;margin-top:6px">${fmt(p.checked).toUpperCase()}</div>
  </div>
  <div style="position:absolute;left:410px;top:74px;right:60px">
    <div class="mono" style="font-size:19px;font-weight:700;letter-spacing:.16em;color:#c2410c">${esc((c?.name ?? p.country).toUpperCase())} · RETURN POLICY</div>
    <div style="font-size:${fit(p.name, 66, 16)}px;font-weight:800;letter-spacing:-.02em;margin-top:10px;line-height:1.05">${esc(p.name)}</div>
    <div style="font-size:${fit(p.headline, 27, 46)}px;color:#3a4a6b;margin-top:14px;line-height:1.25">${esc(p.headline)}</div>
  </div>
  <div style="position:absolute;left:450px;top:${pts.length > 1 ? 400 : 420}px;width:${W}px">
    ${pts.length > 1 ? `<div style="position:absolute;left:0;top:-4px;width:${W}px;height:8px;border-radius:8px;background:linear-gradient(90deg,#fb8a4c,#c2410c)"></div>${marks}` : ""}
  </div>
  <div style="position:absolute;right:60px;bottom:40px"><span class="stamp mono">VERIFIED</span></div>
  ${brand("left:410px;bottom:40px")}
  </body></html>`;
}

function guideHtml(title: string, kicker: string, rows: VerifiedPolicy[]) {
  const top = rows.slice(0, 5);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}body{background:#0e1830;color:#fff}</style></head><body>
  <div class="blob" style="left:-160px;bottom:-200px;width:560px;height:560px;background:#1b2a4e"></div>
  <div style="position:absolute;left:64px;top:70px;width:560px">
    <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.2em;color:#fb8a4c">${esc(kicker.toUpperCase())}</div>
    <div style="font-size:${fit(title, 58, 40)}px;font-weight:800;line-height:1.08;margin-top:16px;letter-spacing:-.02em">${esc(title)}</div>
    <div class="mono" style="margin-top:22px;font-size:20px;color:#cbd5e1">${rows.length} STORES · VERIFIED DATA</div>
  </div>
  <div style="position:absolute;right:70px;top:46px;width:420px;background:#fff;color:#14213d;border-radius:20px 20px 0 0;padding:28px 30px 50px;transform:rotate(3deg);-webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/28px 100%">
    <div class="mono" style="text-align:center;font-size:16px;font-weight:700;letter-spacing:.3em;color:#5a6680">RETURN WINDOWS</div>
    <div class="perf" style="margin:16px 0"></div>
    ${top
      .map(
        (p) =>
          `<div style="display:flex;align-items:flex-end;gap:10px;margin:12px 0;font-size:21px"><span style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:230px">${esc(p.name)}</span><span style="flex:1;border-bottom:3px dotted #e6dfd1;transform:translateY(-6px)"></span><b class="mono" style="color:#c2410c">${esc(win(p).big)}${win(p).unit.startsWith("DAY") ? "d" : ""}</b></div>`,
      )
      .join("")}
    <div class="perf" style="margin:16px 0"></div>
    <div class="barcode"></div>
  </div>
  ${brand("left:64px;bottom:44px", true)}
  </body></html>`;
}

function compareHtml(a: VerifiedPolicy, b: VerifiedPolicy) {
  const card = (p: VerifiedPolicy, left: number) => {
    const w = win(p);
    return `<div class="ticket" style="left:${left}px;top:110px;width:440px;height:380px;text-align:center;padding:40px 30px;box-shadow:0 20px 40px rgba(0,0,0,.15)">
      <div style="font-size:${fit(p.name, 42, 16)}px;font-weight:800">${esc(p.name)}</div>
      <div class="mono" style="font-size:16px;letter-spacing:.14em;color:#5a6680;margin-top:6px">${esc((countryOfPolicy(p)?.name ?? p.country).toUpperCase())}</div>
      <div class="perf" style="margin:22px 10px"></div>
      <div class="mono" style="font-size:110px;font-weight:800;color:#c2410c;line-height:1">${esc(w.big)}</div>
      <div class="mono" style="font-size:20px;letter-spacing:.2em;color:#3a4a6b">${w.unit}</div>
    </div>`;
  };
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
  <div class="blob" style="left:380px;top:120px;width:440px;height:440px;background:#ffe4d1"></div>
  <div class="mono" style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:24px;font-weight:700;letter-spacing:.24em;color:#c2410c">RETURN POLICY HEAD TO HEAD</div>
  ${card(a, 90)}${card(b, 670)}
  <div style="position:absolute;left:540px;top:250px;width:120px;height:120px;border-radius:50%;background:#0e1830;color:#fff;font-size:44px;font-weight:800;display:flex;align-items:center;justify-content:center">VS</div>
  ${brand("left:90px;bottom:36px")}
  </body></html>`;
}

function countryHtml(name: string, code: string, colors: [string, string], stores: VerifiedPolicy[]) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
  <div class="blob" style="right:-100px;top:-120px;width:540px;height:540px;background:#ffe4d1"></div>
  <div class="mono" style="position:absolute;left:64px;top:80px;width:150px;height:150px;border-radius:28px;background:${colors[0]};color:${colors[1]};font-size:64px;font-weight:800;display:flex;align-items:center;justify-content:center">${code}</div>
  <div style="position:absolute;left:64px;top:270px;width:640px">
    <div class="mono" style="font-size:22px;font-weight:700;letter-spacing:.2em;color:#c2410c">RETURN POLICIES IN</div>
    <div style="font-size:${fit(name, 72, 14)}px;font-weight:800;letter-spacing:-.02em;margin-top:6px">${esc(name)}</div>
    <div class="mono" style="font-size:22px;color:#3a4a6b;margin-top:14px">${stores.length} STORES · LEGAL RIGHTS · OFFICIAL LINKS</div>
  </div>
  <div style="position:absolute;right:70px;top:110px;width:360px">
    ${stores
      .slice(0, 5)
      .map(
        (p, i) =>
          `<div class="ticket" style="position:relative;height:66px;margin-bottom:14px;display:flex;align-items:center;padding:0 26px;transform:rotate(${i % 2 ? 1.5 : -1.5}deg);box-shadow:0 6px 16px rgba(0,0,0,.08)"><span style="flex:1;font-size:22px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.name)}</span><b class="mono" style="font-size:24px;color:#c2410c">${esc(win(p).big)}${win(p).unit.startsWith("DAY") ? "d" : ""}</b></div>`,
      )
      .join("")}
  </div>
  ${brand("left:64px;bottom:44px")}
  </body></html>`;
}

function defaultHtml() {
  const picks = ["walmart", "amazon-uk", "noon", "daraz"].map((s) => getPolicy(s)!);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}body{background:#0e1830;color:#fff}</style></head><body>
  <div class="blob" style="right:-140px;bottom:-200px;width:620px;height:620px;background:#1b2a4e"></div>
  ${brand("left:64px;top:60px", true)}
  <div style="position:absolute;left:64px;top:170px;width:620px;font-size:64px;font-weight:800;line-height:1.05;letter-spacing:-.02em">Find any store's <span style="color:#fb8a4c">return policy</span> in seconds.</div>
  <div class="mono" style="position:absolute;left:64px;bottom:60px;font-size:22px;color:#cbd5e1">${POLICIES.length} STORES · ${COUNTRIES.length} COUNTRIES · CHECKED ON OFFICIAL SITES</div>
  <div style="position:absolute;right:70px;top:90px;width:380px">
    ${picks
      .map(
        (p, i) =>
          `<div class="ticket" style="position:relative;height:96px;margin-bottom:18px;display:flex;align-items:center;color:#14213d;overflow:hidden;transform:rotate(${i % 2 ? 2 : -2}deg)"><span class="mono" style="width:110px;height:100%;background:#c2410c;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:40px;font-weight:800">${esc(win(p).big)}<small style="font-size:13px;letter-spacing:.2em">DAYS</small></span><span style="padding:0 22px;font-size:24px;font-weight:800">${esc(p.name)}</span></div>`,
      )
      .join("")}
  </div>
  </body></html>`;
}

async function main() {
  const only = process.argv[2];
  for (const d of ["public/images/tickets", "public/images/guides", "public/og/stores", "public/og/guides", "public/og/compare", "public/og/countries"]) mkdirSync(d, { recursive: true });
  const jobs: { html: string; og: string; webp?: string }[] = [];
  for (const p of POLICIES) jobs.push({ html: storeHtml(p), og: `public/og/stores/${p.slug}.jpg`, webp: `public/images/tickets/${p.slug}.webp` });
  for (const g of GUIDES) jobs.push({ html: guideHtml(g.h1, g.kicker, g.rows().map((r) => r.p)), og: `public/og/guides/${g.slug}.jpg`, webp: `public/images/guides/${g.slug}.webp` });
  for (const [a, b] of COMPARE_PAIRS) jobs.push({ html: compareHtml(getPolicy(a)!, getPolicy(b)!), og: `public/og/compare/${pairSlug(a, b)}.jpg` });
  for (const c of COUNTRIES) {
    const stores = [...storesInCountry(c)].sort((x, y) => (y.windowDays ?? 9999) - (x.windowDays ?? 9999));
    jobs.push({ html: countryHtml(c.name, c.code, c.badge, stores), og: `public/og/countries/${c.slug}.jpg` });
  }
  jobs.push({ html: defaultHtml(), og: "public/og/default.jpg" });

  const list = jobs.filter((j) => !only || j.og.includes(only));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const j of list) {
    await page.setContent(j.html, { waitUntil: "load" });
    const png = await page.screenshot({ type: "png" });
    await sharp(png).jpeg({ quality: 80, mozjpeg: true }).toFile(j.og);
    if (j.webp) await sharp(png).resize(800, 420).webp({ quality: 80 }).toFile(j.webp);
  }
  await browser.close();

  if (!only) {
    const icon = Buffer.from(LOGO_SVG.replace("<svg ", '<svg width="512" height="512" '));
    const bg = { r: 251, g: 247, b: 240, alpha: 1 };
    for (const [size, file] of [
      [512, "public/icon-512.png"],
      [192, "public/icon-192.png"],
      [180, "public/apple-touch-icon.png"],
      [32, "public/favicon-32x32.png"],
    ] as const) {
      await sharp(icon).resize(Math.round(size * 0.84)).extend({ top: Math.round(size * 0.08), bottom: size - Math.round(size * 0.84) - Math.round(size * 0.08), left: Math.round(size * 0.08), right: size - Math.round(size * 0.84) - Math.round(size * 0.08), background: bg }).flatten({ background: bg }).png().toFile(file);
    }
  }
  console.log(`generate-images: ${list.length} images written`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
