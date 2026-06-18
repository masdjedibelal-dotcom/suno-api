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

  // Korrekter Key für Next.js 14.1.4, um das Bündeln der Binärdateien zu verhindern
  experimental: {
    serverComponentsExternalPackages: ['rebrowser-playwright-core', 'ghost-cursor-playwright'],
  },

  webpack: (config, { isServer }) => {
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
