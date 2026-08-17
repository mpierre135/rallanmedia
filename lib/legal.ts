export type Block = { heading?: string; paragraphs?: string[]; list?: string[] };
export type LegalDoc = { title: string; effective: string; intro?: string; blocks: Block[] };

/** Ported verbatim from the previous site. The body text names "Ideal-M"
 *  throughout rather than R. Allan Media — left as-is because rewriting legal
 *  copy is the owner's call, not a redesign decision. */

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  effective: "January 2025",
  intro:
    'Ideal-M ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect information when you use the Ideal-M application, website, and related services (collectively, the "Service").',
  blocks: [
    {
      heading: "1. Information We Collect",
      paragraphs: ["We may collect the following types of information:", "a. Information You Provide"],
      list: [
        "Name",
        "Email address",
        "Account credentials",
        "Uploaded content, prompts, or data you submit to the app",
        "Communication with support",
      ],
    },
    {
      paragraphs: ["b. Automatically Collected Information"],
      list: [
        "Device type and operating system",
        "IP address",
        "Browser type",
        "App usage data and analytics",
        "Log files and timestamps",
      ],
    },
    {
      paragraphs: [
        "c. Third-Party Data",
        "If you connect third-party services (APIs, platforms, integrations), we may receive data according to your permissions.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: ["We use your information to:"],
      list: [
        "Provide and operate the Ideal-M Service",
        "Improve functionality and user experience",
        "Maintain security and prevent fraud",
        "Communicate updates, alerts, and support messages",
        "Analyze performance and usage trends",
        "Comply with legal obligations",
      ],
    },
    { paragraphs: ["We do not sell your personal data."] },
    {
      heading: "3. Data Storage & Security",
      paragraphs: [
        "We use commercially reasonable safeguards to protect your data, including encryption, access controls, and secure infrastructure. However, no system is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "4. Sharing of Information",
      paragraphs: ["We may share data only with:"],
      list: [
        "Trusted service providers (hosting, analytics, infrastructure)",
        "Legal authorities if required by law",
        "Business transfers (merger, acquisition, or sale of assets)",
      ],
    },
    { paragraphs: ["All partners are required to maintain confidentiality and security."] },
    {
      heading: "5. Your Rights",
      paragraphs: ["Depending on your location, you may have the right to:"],
      list: [
        "Access your data",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Withdraw consent",
        "Restrict or object to processing",
      ],
    },
    {
      paragraphs: ["You may exercise these rights by contacting us at: support@rallanmedia.com"],
    },
    {
      heading: "6. Children's Privacy",
      paragraphs: [
        "Ideal-M is not intended for users under the age of 13. We do not knowingly collect data from children.",
      ],
    },
    {
      heading: "7. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy periodically. Updates will be posted with a revised effective date.",
      ],
    },
    {
      heading: "8. Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy, contact: support@rallanmedia.com",
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  effective: "January 2025",
  intro:
    'Welcome to Ideal-M. By accessing or using our Service, you agree to these Terms of Service ("Terms"). If you do not agree, do not use the Service.',
  blocks: [
    {
      heading: "1. Use of the Service",
      paragraphs: [
        "You must be at least 18 years old or have legal guardian consent to use Ideal-M.",
        "You agree to:",
      ],
      list: [
        "Use the Service lawfully",
        "Not misuse, reverse-engineer, or exploit the platform",
        "Not upload illegal, harmful, or infringing content",
      ],
    },
    {
      heading: "2. Accounts",
      paragraphs: ["You are responsible for:"],
      list: [
        "Maintaining account confidentiality",
        "All activity under your account",
        "Providing accurate information",
      ],
    },
    {
      paragraphs: ["We reserve the right to suspend or terminate accounts for violations."],
    },
    {
      heading: "3. Intellectual Property",
      paragraphs: [
        "All content, software, branding, and technology in Ideal-M are owned by or licensed to us.",
        "You retain ownership of content you submit, but grant Ideal-M a non-exclusive, royalty-free license to process and display it solely to provide the Service.",
      ],
    },
    {
      heading: "4. AI & Automated Outputs",
      paragraphs: [
        "Ideal-M may generate automated outputs using AI or algorithmic processes.",
        "You acknowledge:",
      ],
      list: [
        "Outputs may be inaccurate or incomplete",
        "You are responsible for verifying results",
        "Ideal-M is not liable for decisions made based on outputs",
      ],
    },
    {
      heading: "5. Disclaimers",
      paragraphs: [
        'The Service is provided "as is" and "as available."',
        "We disclaim all warranties, including:",
      ],
      list: ["Merchantability", "Fitness for a particular purpose", "Accuracy or reliability of outputs"],
    },
    {
      heading: "6. Limitation of Liability",
      paragraphs: ["To the maximum extent permitted by law, Ideal-M shall not be liable for:"],
      list: ["Indirect or consequential damages", "Data loss", "Business interruption", "Loss of profits"],
    },
    {
      paragraphs: [
        "Our total liability shall not exceed the amount you paid us in the last 12 months (if any).",
      ],
    },
    {
      heading: "7. Termination",
      paragraphs: [
        "You may stop using the Service at any time. We may suspend or terminate access at our discretion for violations or security reasons.",
      ],
    },
    {
      heading: "8. Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the State of Florida, United States, without regard to conflict-of-law principles.",
      ],
    },
    { heading: "9. Contact", paragraphs: ["support@rallanmedia.com"] },
  ],
};

export const DELETION: LegalDoc = {
  title: "Data Deletion Policy",
  effective: "January 2025",
  intro: "Ideal-M respects your right to control your data.",
  blocks: [
    {
      heading: "1. Requesting Data Deletion",
      paragraphs: ["You may request deletion of your personal data at any time by:"],
      list: ['Emailing: support@rallanmedia.com', 'Subject line: "Data Deletion Request"'],
    },
    {
      paragraphs: ["Please include:"],
      list: [
        "Your full name",
        "Email associated with your account",
        "Confirmation you want your data deleted",
      ],
    },
    {
      heading: "2. What Happens After Deletion",
      paragraphs: ["Once verified:"],
      list: [
        "Your account data will be permanently deleted",
        "Stored personal information will be removed from active systems",
        "Some data may remain in backups for a limited time for legal or security reasons",
      ],
    },
    {
      heading: "3. Processing Time",
      paragraphs: [
        "We typically complete deletion requests within 7–30 days, depending on system requirements.",
      ],
    },
    {
      heading: "4. Exceptions",
      paragraphs: ["We may retain limited data if required by:"],
      list: ["Law", "Security", "Fraud prevention", "Financial recordkeeping"],
    },
    {
      heading: "5. Confirmation",
      paragraphs: ["You will receive confirmation once deletion is complete."],
    },
    {
      heading: "6. Contact",
      paragraphs: ["For questions regarding data deletion: support@rallanmedia.com"],
    },
  ],
};
