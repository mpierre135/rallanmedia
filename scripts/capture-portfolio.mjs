import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SHOTS = path.join(ROOT, "public", "portfolio");
const PHOTOS = path.join(ROOT, "public", "photography");

// Kept in sync by hand with lib/portfolio.ts — this script runs outside the
// TypeScript build, so it cannot import that module directly.
const TARGETS = [
  { slug: "celebrity-electric", url: "https://celebrityelectricllc.com" },
  { slug: "ameri-cool", url: "https://ameri-cool.vercel.app" },
  { slug: "kmiller-plumbing", url: "https://kmillerplumbing.vercel.app" },
  { slug: "ibis-gutters", url: "https://ibisgutters.vercel.app" },
  { slug: "florida-renu", url: "https://floridarenu.vercel.app" },
  { slug: "cutz-by-marc", url: "https://cutzbymarc305.com" },
  { slug: "walters-creations", url: "https://walterscreations.saveovertime.com" },
  { slug: "poinsettia-paradise", url: "https://poinsettiaparadise.com" },
  { slug: "finkelstein-team", url: "https://finkelsteinteam.vercel.app" },
  { slug: "allan360", url: "https://allan360.com" },
  { slug: "ideal-m", url: "https://ideal-m.vercel.app" },
  { slug: "launchforgeiq", url: "https://launchforgeiq.com" },
];

const SKIP = /logo|icon|favicon|sprite|avatar|badge|wordmark|og-image|placeholder/i;

async function harvest(page, slug) {
  const found = await page.evaluate(() => {
    const out = [];

    // Next.js serves optimized images through /_next/image?url=… — unwrap to
    // the original so we save full quality rather than a resized variant.
    const unwrap = (raw) => {
      const abs = new URL(raw, location.href).href;
      if (!abs.includes("/_next/image")) return abs;
      const inner = new URL(abs).searchParams.get("url");
      return inner ? new URL(inner, location.href).href : abs;
    };

    for (const img of document.querySelectorAll("img")) {
      if (img.naturalWidth < 900) continue;
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio < 0.5 || ratio > 2.4) continue;
      const src = img.currentSrc || img.src;
      if (src) out.push({ src: unwrap(src), w: img.naturalWidth });
    }

    // Hero art on these sites is frequently a CSS background rather than an
    // <img>, which is why several captures came back empty.
    for (const el of document.querySelectorAll("*")) {
      const bg = getComputedStyle(el).backgroundImage;
      if (!bg || bg === "none") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 600 || rect.height < 300) continue;
      for (const match of bg.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
        const raw = match[2];
        if (raw.startsWith("data:")) continue;
        out.push({ src: unwrap(raw), w: Math.round(rect.width) });
      }
    }

    return out;
  });

  const seen = new Set();
  const picks = found
    .filter((i) => !SKIP.test(i.src) && !seen.has(i.src) && seen.add(i.src))
    .sort((a, b) => b.w - a.w)
    .slice(0, 6);

  if (!picks.length) return 0;

  const dir = path.join(PHOTOS, slug);
  await mkdir(dir, { recursive: true });

  let saved = 0;
  for (const [i, pick] of picks.entries()) {
    try {
      const res = await page.request.get(pick.src, { timeout: 20000 });
      if (!res.ok()) continue;
      const ext = (new URL(pick.src).pathname.match(/\.(jpe?g|png|webp|avif)$/i)?.[1] ?? "jpg").toLowerCase();
      await writeFile(path.join(dir, `${slug}-${String(i + 1).padStart(2, "0")}.${ext}`), await res.body());
      saved++;
    } catch {
      // A single unreachable asset should not abort the rest of the harvest.
    }
  }
  return saved;
}

const browser = await chromium.launch();
await mkdir(SHOTS, { recursive: true });

for (const { slug, url } of TARGETS) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    // Entrance animations on these sites settle well after network idle.
    await page.waitForTimeout(3500);
    if (!process.env.PHOTOS_ONLY) {
      await page.screenshot({ path: path.join(SHOTS, `${slug}.png`) });
    }

    // Scroll through so lazy-loaded imagery decodes before the harvest.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);

    const photos = await harvest(page, slug);
    console.log(`ok   ${slug.padEnd(22)} screenshot + ${photos} image(s)`);
  } catch (err) {
    console.log(`FAIL ${slug.padEnd(22)} ${err.message.split("\n")[0]}`);
  } finally {
    await context.close();
  }
}

await browser.close();
console.log("done");
