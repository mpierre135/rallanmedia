/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
      { source: "/data-deletion-policy.html", destination: "/data-deletion-policy", permanent: true },
    ];
  },
};

export default nextConfig;
