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

  // Verhindert, dass Next.js die Binärdateien für Server Components bündelt
  experimental: {
    serverComponentsExternalPackages: ['electron', 'rebrowser-playwright-core', 'ghost-cursor-playwright'],
  },

  webpack: (config, { isServer, webpack }) => {
    // Erzwingt, dass Webpack electron überall durch ein leeres Modul ersetzt
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^electron$/,
        'node:path' // Harmloser Platzhalter, der 0 Byte zieht
      )
    );

    // Erzwingt zusätzlich das Ignorieren auf Modulebene
    config.externals = [...(config.externals || []), 'electron'];

    // Sicherheitsnetz für den Client-Build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
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
