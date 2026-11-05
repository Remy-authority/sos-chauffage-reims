/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dossier de build configurable : plusieurs agents buildent en parallèle
  // (NEXT_DIST_DIR=.next-a, .next-b…). Par défaut, `.next` (Vercel).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Articles de ville refusés par Google et sans clic sur 90 jours, retirés le 05/11/2026
  // (articles à 7 par semaine, règle #R82) : redirigés vers la page service qui répond.
  async redirects() {
    return [
      { source: '/conseils/recherche-fuite-circuit-chauffage-reims', destination: '/services/fuite-chaudiere-circuit-chauffage', permanent: true },
      { source: '/conseils/chauffagiste-pres-de-chez-soi-reims-questions-a-poser', destination: '/services/urgence-depannage-chauffage-chaudiere', permanent: true },
    ]
  },
}
module.exports = nextConfig
