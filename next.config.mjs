/** @type {import('next').NextConfig} */

const nextConfig = {
    // output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    // backend: process.env.NEXT_PUBLIC__BACKEND_URL,
    // frontend: process.env.NEXT_PUBLIC__FRONTEND_URL,
    env: {
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    }
  }
   
  export default nextConfig