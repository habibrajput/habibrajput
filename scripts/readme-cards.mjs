// Generates the bento-style SVG cards used by the GitHub profile README.
// Each card is written in a light and a dark variant to readme/ so the README can
// switch with <picture>. Images are embedded (GitHub blocks external SVG resources).
//
// Run: node scripts/readme-cards.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "readme");
mkdirSync(OUT, { recursive: true });

const W = 880;
const GAP = 14;
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace`;

const THEMES = {
  light: { card: "#ffffff", border: "#e5e7eb", text: "#0a0a0a", muted: "#6b7280", chip: "#f9fafb", invert: "#0a0a0a", invertText: "#ffffff" },
  dark: { card: "#161b22", border: "#30363d", text: "#e6edf3", muted: "#8b949e", chip: "#0d1117", invert: "#e6edf3", invertText: "#0d1117" },
};

// ── content (mirrors src/data/resume.tsx) ──────────────────────────────────────
const PROFILE = {
  name: "Habib Ur Rehman",
  title: "Senior Software Engineer",
  headline: ["I build microservices, multi-tenant", "SaaS, fintech, e-commerce and POS", "platforms that hold up in production."],
  availability: "Available for senior full-stack roles",
  location: "Lahore, Pakistan",
};
const CORE_STACK = [
  ["PHP", "#777BB4"], ["Laravel", "#FF2D20"], ["Node.js", "#5FA04E"], ["NestJS", "#E0234E"],
  ["React", "#61DAFB"], ["Next.js", null], ["Vue.js", "#4FC08D"], ["TypeScript", "#3178C6"],
  ["Tailwind CSS", "#06B6D4"], ["PostgreSQL", "#4169E1"], ["MySQL", "#4479A1"], ["Redis", "#FF4438"],
  ["Docker", "#2496ED"], ["AWS", "#FF9900"],
];
const COMPANIES = [
  ["Dr. Nutrition", "Riyadh, KSA", "public/dr-nutrition.webp"],
  ["RepairDesk", "Lahore, Pakistan", "public/repairdesk.png"],
  ["Developers Studio", "Lahore, Pakistan", "public/developers-studio.svg"],
  ["Sahoolat Kar", "Lahore, Pakistan", "public/sahoolat-kar.png"],
];
export const PROJECTS = [
  ["egp-hub", "eGP Hub", "Multi-tenant learning management system", "Senior Software Engineer", "public/projects/egphub.webp"],
  ["geysital", "Geysital", "Smart geyser control app (IoT)", "Senior Full-Stack Developer", "public/projects/geysital.webp"],
  ["tabletab", "TableTab", "Restaurant POS & management platform", "Senior Full-Stack Developer", "public/projects/tabletab.webp"],
  ["dr-nutrition", "Dr. Nutrition", "Multi-country e-commerce", "Senior Full-Stack Developer", "public/projects/dr-nutrition.webp"],
  ["repairdesk", "RepairDesk", "SaaS POS for repair shops", "Full-Stack Developer", "public/projects/repairdesk.webp"],
  ["pella-nova", "Pella Nova", "Personal branding & AI visibility", "Next.js Frontend Developer", "public/projects/pella-nova.webp"],
];

// ── helpers ───────────────────────────────────────────────────────────────────
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const textW = (s, size) => s.length * size * 0.56; // rough width estimate for layout

async function dataUri(file, w, h, fit = "cover", position = "top") {
  const buf = await sharp(path.join(ROOT, file), { density: 300 })
    .resize(w, h, { fit, position, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

const tile = (t, x, y, w, h, fill = t.card, stroke = t.border) =>
  `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}" rx="16" fill="${fill}" stroke="${stroke}"/>`;
const label = (t, x, y, s) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.2" fill="${t.muted}">${esc(s.toUpperCase())}</text>`;

const svg = (h, body) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${h}" viewBox="0 0 ${W} ${h}">
<style>
  @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
  .pulse { animation: pulse 2s ease-in-out infinite }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none } }
</style>
${body}
</svg>
`;

// ── cards ─────────────────────────────────────────────────────────────────────
async function hero(t) {
  const H = 286, LW = 540, RX = LW + GAP, RW = W - RX, TH = (H - GAP) / 2;
  const photo = await dataUri("public/me.jpg", 112, 112);
  return svg(H, `
${tile(t, 0, 0, LW, H)}
<clipPath id="ph"><rect x="24" y="24" width="56" height="56" rx="14"/></clipPath>
<image x="24" y="24" width="56" height="56" clip-path="url(#ph)" href="${photo}" xlink:href="${photo}" preserveAspectRatio="xMidYMid slice"/>
<text x="94" y="47" font-family="${FONT}" font-size="18" font-weight="600" fill="${t.text}">${esc(PROFILE.name)}</text>
<text x="94" y="69" font-family="${FONT}" font-size="14" fill="${t.muted}">${esc(PROFILE.title)}</text>
${PROFILE.headline.map((l, i) => `<text x="24" y="${126 + i * 32}" font-family="${FONT}" font-size="25" font-weight="600" letter-spacing="-0.4" fill="${t.text}">${esc(l)}</text>`).join("\n")}
<circle class="pulse" cx="28" cy="${H - 31}" r="4" fill="#10b981"/>
<text x="40" y="${H - 26}" font-family="${FONT}" font-size="13" font-weight="500" fill="#10b981">${esc(PROFILE.availability)}</text>
<text x="${LW - 24}" y="${H - 26}" text-anchor="end" font-family="${FONT}" font-size="13" fill="${t.muted}">📍 ${esc(PROFILE.location)}</text>

${tile(t, RX, 0, RW, TH)}
${label(t, RX + 22, 30, "Experience")}
<text x="${RX + 22}" y="${TH - 26}" font-family="${FONT}" font-size="46" font-weight="700" letter-spacing="-1.5" fill="${t.text}">6+<tspan font-size="17" font-weight="500" fill="${t.muted}" dx="4">yrs</tspan></text>

${tile(t, RX, TH + GAP, RW, TH)}
${label(t, RX + 22, TH + GAP + 30, "Projects shipped")}
<text x="${RX + 22}" y="${H - 26}" font-family="${FONT}" font-size="46" font-weight="700" letter-spacing="-1.5" fill="${t.text}">10+</text>
`);
}

async function stackNow(t) {
  const H = 200, LW = 540, RX = LW + GAP, RW = W - RX;
  // core stack chips, wrapped
  let x = 22, y = 52; const chips = [];
  for (const [name, color] of CORE_STACK) {
    const cw = textW(name, 12.5) + 34;
    if (x + cw > LW - 18) { x = 22; y += 36; }
    chips.push(`<rect x="${x}" y="${y}" width="${cw}" height="26" rx="8" fill="${t.chip}" stroke="${t.border}"/>
<circle cx="${x + 13}" cy="${y + 13}" r="4.5" fill="${color ?? t.text}"/>
<text x="${x + 24}" y="${y + 17.5}" font-family="${FONT}" font-size="12.5" font-weight="500" fill="${t.text}">${esc(name)}</text>`);
    x += cw + 8;
  }
  const shot = await dataUri("public/projects/tabletab.webp", 300, 400, "cover", "left");
  const IW = 132;
  return svg(H, `
${tile(t, 0, 0, LW, H)}
${label(t, 22, 32, "Core stack")}
${chips.join("\n")}

<clipPath id="now"><rect x="${RX}" y="0" width="${RW}" height="${H}" rx="16"/></clipPath>
${tile(t, RX, 0, RW, H)}
<image x="${W - IW}" y="0" width="${IW}" height="${H}" clip-path="url(#now)" href="${shot}" xlink:href="${shot}" preserveAspectRatio="xMinYMin slice"/>
<rect x="${RX + 0.5}" y="0.5" width="${RW - 1}" height="${H - 1}" rx="16" fill="none" stroke="${t.border}"/>
${label(t, RX + 22, 32, "Now")}
<text x="${RX + 22}" y="64" font-family="${FONT}" font-size="19" font-weight="600" fill="${t.text}">TableTab</text>
<text x="${RX + 22}" y="86" font-family="${FONT}" font-size="13" fill="${t.muted}">Restaurant POS &amp;</text>
<text x="${RX + 22}" y="104" font-family="${FONT}" font-size="13" fill="${t.muted}">management platform</text>
<text x="${RX + 22}" y="128" font-family="${FONT}" font-size="11.5" fill="${t.muted}">NestJS · Next.js · Redis</text>
<text x="${RX + 22}" y="${H - 24}" font-family="${FONT}" font-size="13" font-weight="600" fill="${t.text}">View project →</text>
`);
}

async function companies(t) {
  const H = 104;
  const col = (W - 44) / COMPANIES.length;
  const items = await Promise.all(
    COMPANIES.map(async ([name, loc, logo], i) => {
      const x = 22 + i * col;
      const img = await dataUri(logo, 64, 64, "contain", "centre");
      return `<clipPath id="c${i}"><circle cx="${x + 16}" cy="64" r="16"/></clipPath>
<circle cx="${x + 16}" cy="64" r="16.5" fill="#ffffff" stroke="${t.border}"/>
<image x="${x + 2}" y="50" width="28" height="28" clip-path="url(#c${i})" href="${img}" xlink:href="${img}"/>
<text x="${x + 42}" y="61" font-family="${FONT}" font-size="13.5" font-weight="500" fill="${t.text}">${esc(name)}</text>
<text x="${x + 42}" y="79" font-family="${FONT}" font-size="11.5" fill="${t.muted}">📍 ${esc(loc)}</text>`;
    }),
  );
  return svg(H, `${tile(t, 0, 0, W, H)}\n${label(t, 22, 30, "Companies I've built for")}\n${items.join("\n")}`);
}

async function projectCard(t, [slug, name, tagline, role, image]) {
  const CW = 433, CH = 236, IH = 140;
  const shot = await dataUri(image, CW * 2, IH * 2, "cover", "top");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${CW}" height="${CH}" viewBox="0 0 ${CW} ${CH}">
<clipPath id="card"><rect x="0" y="0" width="${CW}" height="${CH}" rx="16"/></clipPath>
<g clip-path="url(#card)">
${tile(t, 0, 0, CW, CH)}
<image x="0" y="0" width="${CW}" height="${IH}" href="${shot}" xlink:href="${shot}" preserveAspectRatio="xMidYMin slice"/>
<line x1="0" y1="${IH}" x2="${CW}" y2="${IH}" stroke="${t.border}"/>
</g>
<rect x="0.5" y="0.5" width="${CW - 1}" height="${CH - 1}" rx="16" fill="none" stroke="${t.border}"/>
<text x="18" y="${IH + 30}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.text}">${esc(name)}</text>
<text x="${CW - 18}" y="${IH + 30}" text-anchor="end" font-family="${FONT}" font-size="15" fill="${t.muted}">↗</text>
<text x="18" y="${IH + 52}" font-family="${FONT}" font-size="12.5" fill="${t.muted}">${esc(tagline)}</text>
<text x="18" y="${IH + 76}" font-family="${MONO}" font-size="11" fill="${t.muted}">${esc(role)}</text>
</svg>
`;
}

// ── write ─────────────────────────────────────────────────────────────────────
for (const [mode, t] of Object.entries(THEMES)) {
  writeFileSync(path.join(OUT, `hero-${mode}.svg`), await hero(t));
  writeFileSync(path.join(OUT, `stack-${mode}.svg`), await stackNow(t));
  writeFileSync(path.join(OUT, `companies-${mode}.svg`), await companies(t));
  for (const p of PROJECTS) writeFileSync(path.join(OUT, `project-${p[0]}-${mode}.svg`), await projectCard(t, p));
}
console.log("README cards written to", path.relative(process.cwd(), OUT));
