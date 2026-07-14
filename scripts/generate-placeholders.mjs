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

// Palette éditoriale COREMI v2
const INK_DEEP = "#131109";
const INK = "#1d1b16";
const INK_SOFT = "#292620";
const STONE = "#c6bcaa";
const RED = "#d7282f";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svgScene({ width, height, label, sublabel, seed = 1, light = false, labelTop = false }) {
  label = esc(label);
  sublabel = esc(sublabel);
  const bgA = light ? "#ece7dd" : INK_SOFT;
  const bgB = light ? "#ddd6c8" : INK;
  const bgC = light ? "#c6bcaa" : INK_DEEP;
  const line = light ? "#131109" : "#ffffff";
  const text = light ? INK_DEEP : "#fbfaf7";
  const sub = light ? "#524e45" : "#c6bcaa";

  const panelW = Math.round(width / 11);
  let panels = "";
  for (let i = 0; i < 12; i++) {
    const opacity = 0.05 + 0.05 * (((i * seed * 7) % 5) / 4);
    panels += `<rect x="${i * panelW}" y="0" width="1.5" height="${height}" fill="${line}" opacity="${opacity.toFixed(2)}"/>`;
  }
  const roofY = height * 0.6;
  const roofPeakX = width * (0.24 + 0.05 * (seed % 3));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgA}"/>
      <stop offset="0.55" stop-color="${bgB}"/>
      <stop offset="1" stop-color="${bgC}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  ${panels}
  <!-- Motif toit COREMI -->
  <path d="M ${roofPeakX - width * 0.17} ${roofY} L ${roofPeakX} ${roofY - height * 0.21} L ${roofPeakX + width * 0.19} ${roofY}"
        fill="none" stroke="${RED}" stroke-width="${Math.max(6, width * 0.007)}" stroke-linecap="square"/>
  <path d="M ${roofPeakX - width * 0.12} ${roofY} L ${roofPeakX - width * 0.12} ${roofY - height * 0.09} M ${roofPeakX - width * 0.12} ${roofY} L ${roofPeakX + width * 0.13} ${roofY}"
        fill="none" stroke="${STONE}" stroke-opacity="0.8" stroke-width="${Math.max(4, width * 0.004)}"/>
  <!-- Repères de plan -->
  <path d="M ${width * 0.055} ${height * 0.1} h ${width * 0.03} M ${width * 0.07} ${height * 0.085} v ${height * 0.03}" stroke="${line}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="${width * 0.055}" y="${height * (labelTop ? 0.12 : 0.84)}" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(height * 0.042)}" font-weight="600" fill="${text}" letter-spacing="1">${label}</text>
  <text x="${width * 0.055}" y="${height * (labelTop ? 0.165 : 0.9)}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(height * 0.017)}" fill="${sub}" letter-spacing="2">${sublabel.toUpperCase()}</text>
</svg>`;
}

const images = [
  { file: "hero.jpg", width: 1920, height: 1280, label: "COREMI", sublabel: "Photo à remplacer · habitation ou chantier phare", seed: 1, labelTop: true },
  { file: "equipe.jpg", width: 1200, height: 900, label: "L'équipe", sublabel: "Photo à remplacer · équipe ou chantier", seed: 2, light: true },
  { file: "og-image.jpg", width: 1200, height: 630, label: "COREMI", sublabel: "Construction · Rénovation · Châssis", seed: 3 },
  { file: "chassis-detail.jpg", width: 1400, height: 1000, label: "Châssis", sublabel: "Photo à remplacer · détail de pose", seed: 4 },
  { file: "chantier.jpg", width: 1400, height: 1000, label: "Chantier", sublabel: "Photo à remplacer · gros œuvre en cours", seed: 5, light: true },
  { file: "projects/extension-moderne.jpg", width: 1200, height: 900, label: "Extension", sublabel: "Photo à remplacer · Waterloo", seed: 6 },
  { file: "projects/renovation-complete.jpg", width: 1200, height: 900, label: "Rénovation", sublabel: "Photo à remplacer · Ixelles", seed: 7, light: true },
  { file: "projects/pose-chassis.jpg", width: 1200, height: 900, label: "Châssis", sublabel: "Photo à remplacer · Wavre", seed: 8 },
  { file: "projects/porte-entree.jpg", width: 1200, height: 900, label: "Porte", sublabel: "Photo à remplacer · Uccle", seed: 9, light: true },
  { file: "projects/terrasse.jpg", width: 1200, height: 900, label: "Terrasse", sublabel: "Photo à remplacer · Lasne", seed: 10 },
  { file: "projects/renovation-facade.jpg", width: 1200, height: 900, label: "Façade", sublabel: "Photo à remplacer · Nivelles", seed: 11, light: true },
  { file: "projects/facade-avant.jpg", width: 1200, height: 900, label: "Avant", sublabel: "Photo à remplacer · façade avant travaux", seed: 12, light: true },
  { file: "projects/facade-apres.jpg", width: 1200, height: 900, label: "Après", sublabel: "Photo à remplacer · façade après travaux", seed: 13 },
];

const outDir = path.resolve(process.cwd(), "public/images");
await mkdir(path.join(outDir, "projects"), { recursive: true });

for (const img of images) {
  const svg = svgScene(img);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, img.file));
  console.log("✓", img.file);
}
console.log("Terminé — images dans public/images/");
