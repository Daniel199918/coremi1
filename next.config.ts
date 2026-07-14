import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Anciennes URLs /services/* (v1 du site) vers la nouvelle structure.
    return [
      { source: "/services", destination: "/construction-renovation", permanent: true },
      {
        source: "/services/construction-gros-oeuvre",
        destination: "/construction-renovation",
        permanent: true,
      },
      { source: "/services/renovation", destination: "/construction-renovation", permanent: true },
      { source: "/services/chassis-portes", destination: "/chassis", permanent: true },
      {
        source: "/services/amenagement-exterieur",
        destination: "/construction-renovation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
