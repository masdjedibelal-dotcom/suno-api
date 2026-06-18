/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    serverComponentsExternalPackages: ['electron', 'rebrowser-playwright-core', 'ghost-cursor-playwright'],
  },

  webpack: (config, { isServer }) => {
    // 1. Zwingt Webpack, 'electron' überall durch ein leeres Objekt zu ersetzen
    config.plugins = config.plugins || [];
    
    // Wir nutzen den internen NormalModuleReplacementPlugin von Webpack
    const webpack = require('webpack');
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^electron$/,
        'node:path' // Ein harmloses Kern-Modul als Platzhalter, damit es 0 Byte zieht
      )
    );

    // 2. Sicherheitsnetz für Node-Infrastruktur im Browser (Client)
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
