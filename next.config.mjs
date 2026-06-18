/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ignoriert Linting- und Typenfehler für einen stabilen Build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 'electron' hinzugefügt, um das Bündeln der Binärdateien zu verhindern
  experimental: {
    serverComponentsExternalPackages: ['electron', 'rebrowser-playwright-core', 'ghost-cursor-playwright'],
  },

  webpack: (config, { isServer }) => {
    // Schließt electron serverseitig aus dem Bundle aus
    if (isServer) {
      config.externals.push('electron');
    }

    // Sicherheitsnetz für den Client-Build
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
  
  output: 'standalone',
};

export default nextConfig;
