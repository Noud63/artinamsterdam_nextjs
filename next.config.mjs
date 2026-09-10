/** @type {import('next').NextConfig} */

const allowedHostnames = [
  "lh3.googleusercontent.com",
  "res.cloudinary.com",
];

const nextConfig = {
  experimental: {
    webVitalsAttribution: [],
  },
  images: {
    remotePatterns: allowedHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "**",
    })),
  },
};

export default nextConfig;
