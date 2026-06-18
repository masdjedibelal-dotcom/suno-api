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
    serverMinification: false,
    serverComponentsExternalPackages: [
      '@sparticuz/chromium',
      'rebrowser-playwright-core'
    ],
    // Electron darf nicht ins Serverless-Bundle (pnpm: ~262 MB, Limit 250 MB)
    outputFileTracingExcludes: {
      '*': [
        'node_modules/.pnpm/electron@*/**',
        'node_modules/electron/**',
        'node_modules/@playwright/browser-chromium/**',
        'node_modules/.pnpm/@playwright+browser-chromium@*/**',
        'node_modules/playwright-core/.local-browsers/**'
      ]
    }
  }
};

export default nextConfig;
