/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
