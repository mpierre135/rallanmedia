import { execFileSync } from "node:child_process";
import { readdirSync, statSync, rmSync, renameSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public", "photography");

const CREDIT = {
  "celebrity-electric": "Celebrity Electric",
  "ameri-cool": "Ameri-Cool",
  "florida-renu": "Florida Renu",
  "walters-creations": "Walter's Creations",
  "poinsettia-paradise": "Poinsettia Paradise",
  "finkelstein-team": "Finkelstein Team",
  studio: "R. Allan Media",
};

function isRaster(file) {
  const head = readFileSync(file).subarray(0, 12);
  const jpeg = head[0] === 0xff && head[1] === 0xd8;
  const png = head.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const webp = head.subarray(0, 4).toString() === "RIFF" && head.subarray(8, 12).toString() === "WEBP";
  return jpeg || png || webp;
}

const manifest = [];

for (const slug of readdirSync(DIR)) {
  const dir = path.join(DIR, slug);
  if (!statSync(dir).isDirectory()) continue;

  for (const file of readdirSync(dir)) {
    const src = path.join(dir, file);

    // Some sites serve SVG under a raster extension. Those are UI decoration,
    // not photography, and sips cannot read them anyway.
    if (!isRaster(src)) {
      rmSync(src);
      continue;
    }

    const out = src.replace(/\.(png|webp|avif|jpeg)$/i, ".jpg");
    const tmp = `${out}.tmp`;

    // Normalize everything to a capped-width JPEG so the grid stays light.
    // sips refuses to write over its own input, hence the temp hop.
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1600", src, "--out", tmp], {
      stdio: "ignore",
    });
    rmSync(src);
    renameSync(tmp, out);

    const info = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", out], {
      encoding: "utf8",
    });
    const width = Number(info.match(/pixelWidth:\s*(\d+)/)?.[1]);
    const height = Number(info.match(/pixelHeight:\s*(\d+)/)?.[1]);
    if (!width || !height) continue;

    manifest.push({
      src: `/photography/${slug}/${path.basename(out)}`,
      width,
      height,
      credit: CREDIT[slug] ?? slug,
    });
  }
}

// Tallest first reads better in a column layout than capture order does.
manifest.sort((a, b) => b.height / b.width - a.height / a.width);

writeFileSync(path.join(ROOT, "lib", "photography.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`prepared ${manifest.length} images`);
