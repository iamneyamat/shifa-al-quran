import type { NextConfig } from "next";

import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "files.ruqyahbd.org" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "media-src 'self' https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://files.ruqyahbd.org https://vitals.vercel-insights.com",
              "frame-src 'self' https://maps.google.com https://www.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self' https://wa.me https://api.whatsapp.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
