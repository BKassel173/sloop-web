const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "files.shopifycdn.com" },
      { protocol: "https", hostname: "shopify-assets.shopifycdn.com" },
    ],
  },
};

export default nextConfig;
