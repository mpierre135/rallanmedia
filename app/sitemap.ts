import type { MetadataRoute } from "next";

const BASE = "https://rallanmedia.com";

// /qualify is intentionally absent — it is a private landing page.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy-policy", "/terms-of-service", "/data-deletion-policy"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
