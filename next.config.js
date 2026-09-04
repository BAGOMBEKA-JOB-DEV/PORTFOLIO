// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },

  // The apex serves a 200 rather than redirecting, so bagombekajob.com and
  // www.bagombekajob.com are two hostnames serving byte-identical pages. The
  // canonical tags point at www, which mitigates it, but a redirect settles it
  // outright — and keeping the rule here rather than in the Vercel dashboard
  // means it is reviewable and survives a project being re-created.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bagombekajob.com" }],
        destination: "https://www.bagombekajob.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
