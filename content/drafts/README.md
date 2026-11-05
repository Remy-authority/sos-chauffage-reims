# content/drafts/

File d'attente des articles préparés en avance : ils sont **invisibles du site** (aucun loader ne lit ce dossier) jusqu'à ce que la GitHub Action `publish-article` en publie un, **chaque jour (7 par semaine depuis le 05/11/2026)**, en le déplaçant vers `content/conseils/`.

Convention : nommer chaque fichier `NNN-slug.mdx` ; le plus petit numéro conforme part en premier, le préfixe `NNN-` est retiré à la publication. Ordre et dates : `docs/CALENDRIER-EDITORIAL.md`.

Avant publication, chaque brouillon passe `scripts/verifier-brouillon.mjs` (title servi 30-60 caractères, description 120-160, FAQ 3 questions et plus, 600 mots et plus, aucun tiret cadratin, aucune image déjà présente). Un brouillon hors règles est refusé par le script de publication. Contrôle à la main : `node scripts/verifier-brouillon.mjs content/drafts/*.mdx`.

**Aucune image pour un brouillon** : la couverture et le visuel de corps sont générés par le workflow le jour de la publication, à partir du `coverAlt`.
