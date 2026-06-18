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

  experimental: {
    // Verhindert, dass Webpack diese serverseitigen Pakete bündelt.
    // rebrowser-playwright-core enthält Binärdateien (.ttf, .html) in seinen
    // Recorder-Assets, die Webpack nicht parsen kann und den Build zum Absturz bringen.
    serverComponentsExternalPackages: [
      'rebrowser-playwright-core',
      'ghost-cursor-playwright',
    ],
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

export default nextConfig;
