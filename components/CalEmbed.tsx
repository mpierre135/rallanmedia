"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK, CAL_NAMESPACE } from "@/lib/portfolio";

/* Booker colours mapped to the site palette. Cal requires both themes even
   though we pin it to dark, so light mirrors the same roles. */
const DARK = {
  "cal-brand": "#229dcf",
  "cal-brand-emphasis": "#55c4ec",
  "cal-brand-text": "#070a10",
  "cal-bg": "#101725",
  "cal-bg-emphasis": "#1e2942",
  "cal-bg-subtle": "#1e2942",
  "cal-bg-muted": "#0d1320",
  "cal-border": "#1e2942",
  "cal-border-emphasis": "#7d8da8",
  "cal-border-subtle": "#1e2942",
  "cal-text": "#ecf1f7",
  "cal-text-emphasis": "#ecf1f7",
  "cal-text-subtle": "#7d8da8",
  "cal-text-muted": "#7d8da8",
};

const LIGHT = {
  "cal-brand": "#1b7ea6",
  "cal-brand-emphasis": "#229dcf",
  "cal-brand-text": "#ffffff",
  "cal-text": "#070a10",
  "cal-text-emphasis": "#070a10",
  "cal-text-subtle": "#55627a",
};

export default function CalEmbed({ className }: { className?: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: DARK, light: LIGHT },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      config={{ layout: "month_view" }}
      className={className}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
}
