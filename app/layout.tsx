import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

// No explicit weights: the wdth axis requires the variable face, which gives us
// the full weight range anyway.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rallanmedia.com"),
  title: {
    default: "R. Allan Media — Websites, AI media, and automation for South Florida trades",
    template: "%s — R. Allan Media",
  },
  description:
    "We build the digital front desk for service businesses: fast websites, AI-made brand media, and automation that answers every call, books the job, and follows up.",
  openGraph: {
    type: "website",
    siteName: "R. Allan Media",
    title: "R. Allan Media — Websites, AI media, and automation for South Florida trades",
    description:
      "Fast websites, AI-made brand media, and automation that answers every call and books the job.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0b0d17" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} ${GeistSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
