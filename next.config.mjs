/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site (no SSR/API): export to plain HTML/CSS/JS in `out/`.
  output: "export",
  // Image Optimization needs a server; serve images as-is for static export.
  images: { unoptimized: true },
};

export default nextConfig;
