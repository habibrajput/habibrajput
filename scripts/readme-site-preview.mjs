// Captures the live portfolio as full-page screenshots (light + dark) and wraps each in an
// animated "browser window" SVG that slowly scrolls through the page, for the README.
// GitHub READMEs can't embed live sites (no iframes), so this is the closest preview.
//
// Requires Google Chrome. Run: node scripts/readme-site-preview.mjs [url] [light|dark]
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "readme");
const URL_TO_CAPTURE = process.argv[2] ?? "https://habibrajput.vercel.app/";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CAPTURE_WIDTH = 1280; // desktop layout
const FRAME_W = 880; // README card width
const VIEW_H = 500; // visible "screen" height inside the frame
const BAR_H = 40;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(theme) {
  const port = 9400 + (theme === "dark" ? 1 : 0);
  const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${tmpdir()}/readme-preview-${theme}`, "about:blank"], { stdio: "ignore" });
  try {
    let targets;
    for (let i = 0; i < 50 && !targets; i++) {
      try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(200); }
    }
    const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));
    let id = 0;
    const pending = new Map();
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
    const send = (method, params = {}) => new Promise((r, reject) => {
      const i = ++id;
      const timer = setTimeout(() => { pending.delete(i); reject(new Error(`${theme}: ${method} timed out`)); }, 60_000);
      pending.set(i, (v) => { clearTimeout(timer); r(v); });
      ws.send(JSON.stringify({ id: i, method, params }));
    });
    const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;

    await send("Page.enable");
    // next-themes reads the theme from localStorage before first paint.
    await send("Page.addScriptToEvaluateOnNewDocument", { source: `try{localStorage.setItem('theme','${theme}')}catch(e){}` });
    await send("Emulation.setDeviceMetricsOverride", { width: CAPTURE_WIDTH, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: URL_TO_CAPTURE });
    await sleep(6000);

    // Scroll through so lazy images and fade-in tiles load, then grow the viewport to the
    // full page (hero stays in view, so the fixed profile panel doesn't appear).
    const height = await evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < height; y += 400) { await evaluate(`scrollTo(0, ${y})`); await sleep(120); }
    await evaluate("scrollTo(0, 0)");
    await send("Emulation.setDeviceMetricsOverride", { width: CAPTURE_WIDTH, height, deviceScaleFactor: 1, mobile: false });
    // Hide the floating dock and dev badges so they don't repeat down the screenshot.
    await evaluate(`document.querySelectorAll('nav').forEach(n=>{ if(getComputedStyle(n).position==='fixed' || n.closest('.fixed')) n.style.display='none' }); document.querySelectorAll('.fixed.bottom-4, nextjs-portal').forEach(e=>e.remove()); true`);
    await sleep(2500);
    const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
    ws.close();
    return Buffer.from(shot.data, "base64");
  } finally {
    chrome.kill("SIGKILL");
  }
}

function frameSvg(theme, imgUri, imgH) {
  const dark = theme === "dark";
  const c = dark
    ? { frame: "#161b22", border: "#30363d", bar: "#0d1117", url: "#21262d", text: "#8b949e" }
    : { frame: "#ffffff", border: "#d1d9e0", bar: "#f6f8fa", url: "#ffffff", text: "#59636e" };
  const H = BAR_H + VIEW_H;
  const travel = Math.max(0, imgH - VIEW_H);
  const seconds = Math.round(travel / 90); // ~90px per second
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${FRAME_W}" height="${H}" viewBox="0 0 ${FRAME_W} ${H}">
<style>
  @keyframes scroll { 0%, 6% { transform: translateY(0) } 94%, 100% { transform: translateY(-${travel}px) } }
  .page { animation: scroll ${seconds}s ease-in-out infinite alternate }
  @media (prefers-reduced-motion: reduce) { .page { animation: none } }
</style>
<clipPath id="win"><rect x="0" y="0" width="${FRAME_W}" height="${H}" rx="14"/></clipPath>
<clipPath id="view"><rect x="0" y="${BAR_H}" width="${FRAME_W}" height="${VIEW_H}"/></clipPath>
<g clip-path="url(#win)">
  <rect width="${FRAME_W}" height="${H}" fill="${c.frame}"/>
  <g clip-path="url(#view)">
    <g class="page">
      <image x="0" y="${BAR_H}" width="${FRAME_W}" height="${imgH}" href="${imgUri}"/>
    </g>
  </g>
  <rect width="${FRAME_W}" height="${BAR_H}" fill="${c.bar}"/>
  <line x1="0" y1="${BAR_H - 0.5}" x2="${FRAME_W}" y2="${BAR_H - 0.5}" stroke="${c.border}"/>
  <circle cx="20" cy="20" r="6" fill="#ff5f57"/><circle cx="40" cy="20" r="6" fill="#febc2e"/><circle cx="60" cy="20" r="6" fill="#28c840"/>
  <rect x="${FRAME_W / 2 - 170}" y="9" width="340" height="22" rx="7" fill="${c.url}" stroke="${c.border}"/>
  <text x="${FRAME_W / 2}" y="24.5" text-anchor="middle" font-family="-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" fill="${c.text}">🔒 ${new URL(URL_TO_CAPTURE).host}</text>
</g>
<rect x="0.5" y="0.5" width="${FRAME_W - 1}" height="${H - 1}" rx="14" fill="none" stroke="${c.border}"/>
</svg>
`;
}

mkdirSync(OUT, { recursive: true });
const themes = process.argv[3] ? [process.argv[3]] : ["light", "dark"];
for (const theme of themes) {
  const png = await capture(theme);
  const resized = sharp(png).resize({ width: FRAME_W });
  const { data, info } = await resized.jpeg({ quality: 72, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  const uri = `data:image/jpeg;base64,${data.toString("base64")}`;
  const file = path.join(OUT, `site-preview-${theme}.svg`);
  writeFileSync(file, frameSvg(theme, uri, info.height));
  console.log(`${theme}: page ${info.width}x${info.height}, ${(data.length / 1024).toFixed(0)} KB → ${path.relative(ROOT, file)}`);
}
