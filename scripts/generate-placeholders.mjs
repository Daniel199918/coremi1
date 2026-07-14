/**
 * Génère les images placeholder brandées COREMI (JPG) à partir de SVG.
 * Usage : node scripts/generate-placeholders.mjs
 *
 * ⚠️ Ces images sont des visuels temporaires : remplacez simplement les
 * fichiers dans /public/images/ par de vraies photos (mêmes noms) —
 * aucune modification de code nécessaire.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const NAVY_DARK = "#0b1626";
const NAVY = "#16273c";
const NAVY_LIGHT = "#223a57";
const RED = "#d7282f";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svgScene({ width, height, label, sublabel, seed = 1 }) {
  label = esc(label);
  sublabel = esc(sublabel);
  // Panneaux verticaux subtils, façon bardage architectural
  const panelW = Math.round(width / 11);
  let panels = "";
  for (let i = 0; i < 12; i++) {
    const opacity = 0.05 + 0.06 * (((i * seed * 7) % 5) / 4);
    panels += `<rect x="${i * panelW}" y="0" width="1.5" height="${height}" fill="#ffffff" opacity="${opacity.toFixed(2)}"/>`;
  }
  const roofY = height * 0.62;
  const roofPeakX = width * (0.22 + 0.06 * (seed % 3));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_LIGHT}"/>
      <stop offset="0.55" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  ${panels}
  <!-- Motif toit COREMI -->
  <path d="M ${roofPeakX - width * 0.18} ${roofY} L ${roofPeakX} ${roofY - height * 0.22} L ${roofPeakX + width * 0.2} ${roofY}"
        fill="none" stroke="${RED}" stroke-width="${Math.max(6, width * 0.008)}" stroke-linecap="square"/>
  <path d="M ${roofPeakX - width * 0.13} ${roofY} L ${roofPeakX - width * 0.13} ${roofY - height * 0.1} M ${roofPeakX - width * 0.13} ${roofY} L ${roofPeakX + width * 0.14} ${roofY}"
        fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="${Math.max(4, width * 0.005)}"/>
  <text x="${width * 0.055}" y="${height * 0.84}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(height * 0.052)}" font-weight="700" fill="#ffffff" letter-spacing="2">${label}</text>
  <text x="${width * 0.055}" y="${height * 0.9}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(height * 0.03)}" fill="#ffffff" fill-opacity="0.65">${sublabel}</text>
</svg>`;
}

const images = [
  { file: "hero.jpg", width: 1920, height: 1280, label: "COREMI", sublabel: "Photo à remplacer — habitation moderne / chantier phare", seed: 1 },
  { file: "equipe.jpg", width: 1200, height: 900, label: "NOTRE ÉQUIPE", sublabel: "Photo à remplacer — équipe ou chantier COREMI", seed: 2 },
  { file: "og-image.jpg", width: 1200, height: 630, label: "COREMI", sublabel: "Construction · Rénovation · Châssis — Bruxelles & Brabant wallon", seed: 3 },
  { file: "projects/extension-moderne.jpg", width: 1200, height: 900, label: "EXTENSION MODERNE", sublabel: "Photo à remplacer — Waterloo", seed: 4 },
  { file: "projects/renovation-complete.jpg", width: 1200, height: 900, label: "RÉNOVATION COMPLÈTE", sublabel: "Photo à remplacer — Ixelles", seed: 5 },
  { file: "projects/pose-chassis.jpg", width: 1200, height: 900, label: "CHÂSSIS ALUMINIUM", sublabel: "Photo à remplacer — Wavre", seed: 6 },
  { file: "projects/porte-entree.jpg", width: 1200, height: 900, label: "PORTE D'ENTRÉE", sublabel: "Photo à remplacer — Uccle", seed: 7 },
  { file: "projects/terrasse.jpg", width: 1200, height: 900, label: "TERRASSE", sublabel: "Photo à remplacer — Lasne", seed: 8 },
  { file: "projects/renovation-facade.jpg", width: 1200, height: 900, label: "FAÇADE", sublabel: "Photo à remplacer — Nivelles", seed: 9 },
];

const outDir = path.resolve(process.cwd(), "public/images");
await mkdir(path.join(outDir, "projects"), { recursive: true });

for (const img of images) {
  const svg = svgScene(img);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, img.file));
  console.log("✓", img.file);
}
console.log("Terminé — images dans public/images/");
