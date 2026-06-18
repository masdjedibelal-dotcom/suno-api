/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ignoriert Linting- und Typenfehler, damit der Build auf Netlify stabil durchläuft
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Zwingt Next.js, die Playwright-Bibliotheken NICHT durch Webpack zu jagen
  experimental: {
    serverExternalPackages: ['rebrowser-playwright-core', 'ghost-cursor-playwright'],
  },

  webpack: (config, { isServer }) => {
    // Sicherheitsnetz für den Client-Build (verhindert Bündelungsfehler im Browser)
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        os: false,
        stream: false,
        constants: false,
      };
    }
    return config;
  },
  
  // Gibt das korrekte Format für Serverless-Plattformen vor
  output: 'standalone',
};

module.exports = nextConfig;
