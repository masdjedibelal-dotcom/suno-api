/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Unterdrückt Fehler beim Generieren statischer Seiten während des Builds für API-Routen
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Verhindert, dass Webpack Module-IDs in Nummern umwandelt
      config.optimization.moduleIds = 'named';
    } else {
      // Verhindert, dass Webpack versucht, Node-Module für den Client zu bündeln
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
  
  output: 'standalone',
};

module.exports = nextConfig;
