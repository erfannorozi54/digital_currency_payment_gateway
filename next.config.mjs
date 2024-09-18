// /** @type {import('next').NextConfig} */
// const nextConfig = { crossOrigin: "anonymous", crossOrigin: "use-credentials" };

// export default nextConfig;

// in next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  crossOrigin: "use-credentials",
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
