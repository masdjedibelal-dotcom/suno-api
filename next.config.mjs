/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        electron: false
      };
    }
    return config;
  },
  experimental: {
    serverMinification: false, // the server minification unfortunately breaks the selector class names
    serverComponentsExternalPackages: [
      '@sparticuz/chromium',
      'rebrowser-playwright-core',
      '@playwright/browser-chromium'
    ],
  },
};  

export default nextConfig;
