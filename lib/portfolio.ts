export type ClientSite = {
  slug: string;
  name: string;
  trade: string;
  url: string;
  built: string;
};

export type AppProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string | null;
  image: string | null;
  status: "live" | "offline";
};

/** Client work, ordered so the trades lead — that is who this page is selling to. */
export const CLIENT_SITES: ClientSite[] = [
  {
    slug: "celebrity-electric",
    name: "Celebrity Electric",
    trade: "Electrical",
    url: "https://celebrityelectricllc.com",
    built: "Service site with emergency-call routing and per-service landing pages.",
  },
  {
    slug: "ameri-cool",
    name: "Ameri-Cool",
    trade: "HVAC",
    url: "https://ameri-cool.vercel.app",
    built: "30-minute emergency AC response funnel built around same-day booking.",
  },
  {
    slug: "kmiller-plumbing",
    name: "K. Miller Plumbing",
    trade: "Plumbing",
    url: "https://kmillerplumbing.vercel.app",
    built: "Master-plumber authority site covering Miami Gardens and South Florida.",
  },
  {
    slug: "ibis-gutters",
    name: "IBIS Gutters",
    trade: "Gutters",
    url: "https://ibisgutters.vercel.app",
    built: "Seamless gutter installer site with a quote request path for SWFL.",
  },
  {
    slug: "florida-renu",
    name: "Florida Renu",
    trade: "Restoration",
    url: "https://floridarenu.vercel.app",
    built: "Property renewal brand with a matching ad-creative asset library.",
  },
  {
    slug: "cutz-by-marc",
    name: "Cutz By Marc 305",
    trade: "Mobile barber",
    url: "https://cutzbymarc305.com",
    built: "Luxury mobile grooming brand with memberships and VIP house calls.",
  },
  {
    slug: "walters-creations",
    name: "Walter's Creations",
    trade: "Custom drapery",
    url: "https://walterscreations.saveovertime.com",
    built: "Craft-led storefront pairing a process story with a Shopify catalog.",
  },
  {
    slug: "poinsettia-paradise",
    name: "Poinsettia Paradise",
    trade: "Hospitality",
    url: "https://poinsettiaparadise.com",
    built: "Property showcase for the Paradise Collection with a booking path.",
  },
  {
    slug: "finkelstein-team",
    name: "Finkelstein Team",
    trade: "Real estate",
    url: "https://finkelsteinteam.vercel.app",
    built: "Seller strategy report that doubles as a listing-appointment magnet.",
  },
];

export const APPS: AppProduct[] = [
  {
    slug: "allan360",
    name: "Allan360",
    tagline: "Video and image generation platform",
    description:
      "Generate, organize, and publish AI media from one library. Build ad flows on a node canvas, keep AI personas consistent across shoots, and ship straight to social.",
    url: "https://allan360.com",
    image: "/portfolio/allan360.jpg",
    status: "live",
  },
  {
    slug: "ideal-m",
    name: "Ideal-M",
    tagline: "Ad intelligence",
    description:
      "Search what is already working. Filter live ads by niche, creative type, platform, and funnel stage to find the angle before you spend on it.",
    url: "https://ideal-m.vercel.app",
    image: "/portfolio/ideal-m.jpg",
    status: "live",
  },
  {
    slug: "launchforgeiq",
    name: "LaunchForge IQ",
    tagline: "Etsy product research",
    description:
      "Find products worth listing. Demand signals, competition depth, and pricing bands scored into one number before you commit a launch.",
    url: "https://launchforgeiq.com",
    image: "/portfolio/launchforgeiq.jpg",
    status: "live",
  },
  {
    slug: "prodify",
    name: "Prodify",
    tagline: "Product operations",
    description:
      "Turns raw product data into listing-ready output across channels. Currently offline while the next release is prepared.",
    url: null,
    image: null,
    status: "offline",
  },
];

export type VideoAd = {
  slug: string;
  title: string;
  category: string;
  runtime: string;
  src: string;
  /** Optional still. Until one is dropped in, the card renders a type-only panel. */
  poster?: string;
};

/** Drop the matching MP4s into public/videos/ and each card goes live.
 *  Add a poster at public/videos/<slug>.jpg to replace the type-only panel. */
export const VIDEO_ADS: VideoAd[] = [
  {
    slug: "demo-01",
    title: "Emergency HVAC — 30-minute response",
    category: "Commercial",
    runtime: "0:30",
    src: "/videos/demo-01.mp4",
  },
  {
    slug: "demo-02",
    title: "Mobile barber — VIP house call",
    category: "Social ad",
    runtime: "0:15",
    src: "/videos/demo-02.mp4",
  },
  {
    slug: "demo-03",
    title: "Electrical panel upgrade — before and after",
    category: "Explainer",
    runtime: "0:45",
    src: "/videos/demo-03.mp4",
  },
  {
    slug: "demo-04",
    title: "Seamless gutters — install walkthrough",
    category: "Product",
    runtime: "0:30",
    src: "/videos/demo-04.mp4",
  },
  {
    slug: "demo-05",
    title: "Listing tour — agent brand spot",
    category: "Real estate",
    runtime: "0:60",
    src: "/videos/demo-05.mp4",
  },
];

/** Shipped tools used as evidence inside the revenue-systems section. */
export const PROOF = {
  voice: { name: "AI Voice Orchestrator", url: "https://ai-voice-orchestrator.vercel.app" },
  reviews: { name: "ChatResponder", url: "https://chatresponder.vercel.app" },
  video: { name: "ReMoment", url: "https://remoment-highlights.vercel.app" },
} as const;

/** Every URL the capture script visits. Apps included so their cards get real art. */
export const CAPTURE_TARGETS: { slug: string; url: string }[] = [
  ...CLIENT_SITES.map(({ slug, url }) => ({ slug, url })),
  { slug: "allan360", url: "https://allan360.com" },
  { slug: "ideal-m", url: "https://ideal-m.vercel.app" },
  { slug: "launchforgeiq", url: "https://launchforgeiq.com" },
];

export const CALENDLY_URL = "https://calendly.com/mp1350/discovery-call";
