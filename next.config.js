const {
  IS_PROD,
  ENVIRONMENT,
  SENTRY_DSN,
  NETWORKS,
  EXPLORER_URLS,
  DEFAULT_NETWORK,
  DEFAULT_WEB3_URL,
  MONA_TOKEN_ADDRESSES,
  USDT_ADDRESS,
  WETH_ADDRESS,
  DAI_ADDRESS,
  W3F_ADDRESS,
  BANCOR_ADDRESSES,
  MATIC_ADDRESS,
  PAYMENT_ACCEPT,
  MARKETPLACE_ADDRESSES
} = require('config');
const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    IS_PROD,
    ENVIRONMENT,
    SENTRY_DSN,
    NETWORKS,
    EXPLORER_URLS,
    DEFAULT_NETWORK,
    DEFAULT_WEB3_URL,
    MONA_TOKEN_ADDRESSES,
    USDT_ADDRESS,
    WETH_ADDRESS,
    DAI_ADDRESS,
    W3F_ADDRESS,
    BANCOR_ADDRESSES,
    MATIC_ADDRESS,
    PAYMENT_ACCEPT,
    MARKETPLACE_ADDRESSES
  },
  trailingSlash: true,
  assetPrefix: './',
  images: {
    domains: [],
  },
  webpack(cfg, { isServer }) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
        entries['main.js'].unshift('./polyfills.js');
      }
      return entries;
    };

    if (!isServer) {
      cfg.node = {
        ws: 'empty',
      };
    }

    return cfg;
  },
});
