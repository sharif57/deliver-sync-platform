// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//     eslint: {
//     ignoreDuringBuilds: true, // Disable ESLint during builds
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Match your image URL's protocol
        hostname: '10.10.12.49', // Your image host IP
        port: '8000', // Explicitly specify the port
        pathname: '/media/**', // Match the path pattern (e.g., /media/profile_images/*)
      },
    ],
  },
};

export default nextConfig;