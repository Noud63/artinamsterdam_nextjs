/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/ACg8ocJvL33LsFmEJ5v3LqSaS_aVWgPZ6c2ZNGrXUNwqZsvtmbNHAU9P=s96-c'), {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }],
  },
};

export default nextConfig;
