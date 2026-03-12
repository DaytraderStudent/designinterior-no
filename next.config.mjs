/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.ikea.com" },
      { protocol: "https", hostname: "**.bohus.no" },
      { protocol: "https", hostname: "**.bolia.com" },
      { protocol: "https", hostname: "**.skeidar.no" },
      { protocol: "https", hostname: "**.jysk.no" },
      { protocol: "https", hostname: "**.homesick.no" },
      { protocol: "https", hostname: "**.kid.no" },
      { protocol: "https", hostname: "**.tilbords.no" },
      { protocol: "https", hostname: "**.nordicnest.no" },
      { protocol: "https", hostname: "**.rum21.no" },
      { protocol: "https", hostname: "**.elkjop.no" },
      { protocol: "https", hostname: "**.power.no" },
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
