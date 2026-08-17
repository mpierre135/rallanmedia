import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/qualify", "/api/"] },
    sitemap: "https://rallanmedia.com/sitemap.xml",
  };
}
