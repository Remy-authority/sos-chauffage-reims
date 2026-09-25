/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dossier de build configurable : plusieurs agents buildent en parallèle
  // (NEXT_DIST_DIR=.next-a, .next-b…). Par défaut, `.next` (Vercel).
  distDir: process.env.NEXT_DIST_DIR || '.next',
}
module.exports = nextConfig
