/** @type {import('next').NextConfig} */

const nextConfig = {
    // output: 'export', // Outputs a Single-Page Application (SPA).
    // distDir: './dist', // Changes the build output directory to `./dist/`.
    env: {
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    }
  }
   
  export default nextConfig