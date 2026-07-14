/**
 * Illustrations architecturales COREMI (JPG) — série vectorielle cohérente
 * générée via sharp : élévations de façades, coupes, trames de fenêtres,
 * annotations de plan. Identité « Matériaux & Élévations ».
 *
 * Usage : node scripts/generate-placeholders.mjs
 * Pour passer à de vraies photos : remplacer les fichiers de
 * /public/images/ (mêmes noms), aucune modification de code.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Palette v3 « Matériaux & Élévations »
const P = {
  bone: "#faf7f0",
  boneDeep: "#f2ecdf",
  stone1: "#e9e1d2",
  stone2: "#d8cdb8",
  stone3: "#bfb095",
  stone4: "#9c8c72",
  ink5: "#6f675a",
  ink7: "#3d382f",
  ink8: "#2a2721",
  ink9: "#1b1915",
  ink95: "#12100c",
  oxide: "#b23a25",
  oxideDeep: "#8f2e1d",
  amber: "#e8d9b0", // fenêtres éclairées
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Fenêtre : cadre + traverses, optionnellement éclairée. */
function windowPane(x, y, w, h, { frame = P.ink9, glass = "#242019", lit = false, mullion = true } = {}) {
  const g = lit ? P.amber : glass;
  const t = Math.max(2, w * 0.045);
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${frame}"/>`;
  s += `<rect x="${x + t}" y="${y + t}" width="${w - 2 * t}" height="${h - 2 * t}" fill="${g}"/>`;
  if (mullion) {
    s += `<rect x="${x + w / 2 - t / 2}" y="${y}" width="${t}" height="${h}" fill="${frame}"/>`;
    s += `<rect x="${x}" y="${y + h * 0.62}" width="${w}" height="${t}" fill="${frame}"/>`;
  }
  return s;
}

/** Cote de plan : ligne + tirets d'extrémité + libellé. */
function dimension(x1, x2, y, label, color = P.ink5) {
  return `
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${x1}" y1="${y - 7}" x2="${x1}" y2="${y + 7}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${x2}" y1="${y - 7}" x2="${x2}" y2="${y + 7}" stroke="${color}" stroke-width="1.5"/>
    <text x="${(x1 + x2) / 2}" y="${y - 10}" text-anchor="middle" font-family="monospace" font-size="17" letter-spacing="3" fill="${color}">${esc(label)}</text>`;
}

/** Annotation technique en coin. */
function annotation(x, y, text, color = P.stone3) {
  return `<text x="${x}" y="${y}" font-family="monospace" font-size="18" letter-spacing="4" fill="${color}">${esc(text.toUpperCase())}</text>`;
}

/** Trame verticale discrète (hairlines de plan). */
function hairlines(w, h, color, n = 6, opacity = 0.1) {
  let s = "";
  for (let i = 1; i < n; i++) {
    s += `<line x1="${(w / n) * i}" y1="0" x2="${(w / n) * i}" y2="${h}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1"/>`;
  }
  return s;
}

const svgDoc = (w, h, body, bg) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;

/* ---------------- Scènes ---------------- */

/** HERO : élévation nocturne d'une maison contemporaine, fenêtres éclairées. */
function heroScene(w, h) {
  let b = `<defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${P.ink8}"/><stop offset="1" stop-color="${P.ink95}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  b += hairlines(w, h, "#ffffff", 8, 0.05);

  const groundY = h * 0.82;
  // Volume principal (droite)
  const vx = w * 0.42, vw = w * 0.5, vy = h * 0.24;
  b += `<rect x="${vx}" y="${vy}" width="${vw}" height="${groundY - vy}" fill="${P.ink9}"/>`;
  // Trame de fenêtres 4×3
  const cols = 4, rows = 3, gx = vw * 0.055, gy = (groundY - vy) * 0.08;
  const ww = (vw - gx * (cols + 1)) / cols, wh = (groundY - vy - gy * (rows + 1)) / rows;
  const litMap = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      b += windowPane(vx + gx + c * (ww + gx), vy + gy + r * (wh + gy), ww, wh, {
        frame: P.ink95, lit: !!litMap[r * cols + c],
      });
  // Volume bas (gauche) + panneau corten
  const lx = w * 0.16, lw = w * 0.26, ly = h * 0.52;
  b += `<rect x="${lx}" y="${ly}" width="${lw}" height="${groundY - ly}" fill="${P.ink8}"/>`;
  b += `<rect x="${lx}" y="${ly}" width="${lw * 0.28}" height="${groundY - ly}" fill="${P.oxideDeep}"/>`;
  b += windowPane(lx + lw * 0.38, ly + (groundY - ly) * 0.2, lw * 0.5, (groundY - ly) * 0.62, { frame: P.ink95, lit: true, mullion: false });
  // Sol + cote
  b += `<line x1="0" y1="${groundY}" x2="${w}" y2="${groundY}" stroke="${P.stone3}" stroke-width="2"/>`;
  b += dimension(vx, vx + vw, groundY + h * 0.06, "12,40 m", P.stone4);
  b += annotation(w * 0.045, h * 0.08, "Élévation sud · 1:50");
  b += annotation(w * 0.045, h * 0.115, "visuel provisoire — photo de chantier à venir");
  return svgDoc(w, h, b, P.ink95);
}

/** Façade claire : trame régulière sur pierre (projets clairs). */
function facadeLight(w, h, { rows = 3, cols = 3, accentCol = 1, title, sub }) {
  let b = hairlines(w, h, P.ink9, 6, 0.07);
  const m = w * 0.1, top = h * 0.14, bottom = h * 0.84;
  b += `<rect x="${m}" y="${top}" width="${w - 2 * m}" height="${bottom - top}" fill="${P.stone1}"/>`;
  const fw = w - 2 * m, fh = bottom - top, gx = fw * 0.06, gy = fh * 0.09;
  const ww = (fw - gx * (cols + 1)) / cols, wh = (fh - gy * (rows + 1)) / rows;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const accent = c === accentCol && r === rows - 1;
      b += accent
        ? `<rect x="${m + gx + c * (ww + gx)}" y="${top + gy + r * (wh + gy)}" width="${ww}" height="${wh}" fill="${P.oxide}"/>`
        : windowPane(m + gx + c * (ww + gx), top + gy + r * (wh + gy), ww, wh, { frame: P.ink8, glass: P.stone2 });
    }
  b += `<line x1="0" y1="${bottom}" x2="${w}" y2="${bottom}" stroke="${P.ink7}" stroke-width="2"/>`;
  b += annotation(m, h * 0.08, title);
  if (sub) b += annotation(m, bottom + h * 0.07, sub, P.ink5);
  return svgDoc(w, h, b, P.bone);
}

/** Volume sombre à toit plat (extension). */
function extensionScene(w, h) {
  let b = hairlines(w, h, "#ffffff", 6, 0.05);
  const groundY = h * 0.8;
  b += `<rect x="${w * 0.1}" y="${h * 0.42}" width="${w * 0.36}" height="${groundY - h * 0.42}" fill="${P.ink8}"/>`;
  b += `<rect x="${w * 0.46}" y="${h * 0.28}" width="${w * 0.44}" height="${groundY - h * 0.28}" fill="${P.ink9}"/>`;
  b += windowPane(w * 0.5, h * 0.36, w * 0.36, groundY - h * 0.42, { frame: P.ink95, lit: true, mullion: true });
  b += `<rect x="${w * 0.1}" y="${h * 0.42}" width="${w * 0.06}" height="${groundY - h * 0.42}" fill="${P.oxideDeep}"/>`;
  b += `<line x1="0" y1="${groundY}" x2="${w}" y2="${groundY}" stroke="${P.stone3}" stroke-width="2"/>`;
  b += dimension(w * 0.46, w * 0.9, groundY + h * 0.07, "extension 6,20 m", P.stone4);
  b += annotation(w * 0.045, h * 0.09, "Extension · toiture plate");
  return svgDoc(w, h, b, P.ink95);
}

/** Coupe de châssis : profilé en angle, verre, joint. */
function frameSection(w, h) {
  let b = hairlines(w, h, P.ink9, 6, 0.06);
  const cx = w * 0.18, cy = h * 0.2, s = Math.min(w, h) * 0.58;
  // Profilé (L)
  b += `<path d="M ${cx} ${cy} h ${s * 0.34} v ${s * 0.12} h ${-s * 0.2} v ${s * 0.72} h ${-s * 0.14} Z" fill="${P.ink8}"/>`;
  // Rupture de pont thermique
  b += `<rect x="${cx + s * 0.14}" y="${cy + s * 0.12}" width="${s * 0.06}" height="${s * 0.72}" fill="${P.oxide}"/>`;
  // Double vitrage
  b += `<rect x="${cx + s * 0.4}" y="${cy + s * 0.12}" width="${s * 0.05}" height="${s * 0.72}" fill="${P.stone2}"/>`;
  b += `<rect x="${cx + s * 0.5}" y="${cy + s * 0.12}" width="${s * 0.05}" height="${s * 0.72}" fill="${P.stone2}"/>`;
  b += `<rect x="${cx + s * 0.45}" y="${cy + s * 0.12}" width="${s * 0.05}" height="${s * 0.72}" fill="${P.bone}"/>`;
  b += dimension(cx, cx + s * 0.34, cy - h * 0.05, "76 mm", P.ink5);
  b += annotation(cx + s * 0.62, cy + s * 0.2, "double vitrage", P.ink5);
  b += annotation(cx + s * 0.62, cy + s * 0.28, "rupture thermique", P.oxide);
  b += annotation(w * 0.06, h * 0.92, "Coupe horizontale · châssis · 1:2");
  return svgDoc(w, h, b, P.bone);
}

/** Porte d'entrée : élévation sobre. */
function doorScene(w, h) {
  let b = hairlines(w, h, P.ink9, 6, 0.06);
  const m = w * 0.3, top = h * 0.12, bottom = h * 0.84;
  b += `<rect x="${m * 0.55}" y="${top}" width="${w - m * 1.1}" height="${bottom - top}" fill="${P.stone1}"/>`;
  b += `<rect x="${m}" y="${top + (bottom - top) * 0.08}" width="${w - 2 * m}" height="${(bottom - top) * 0.92}" fill="${P.ink8}"/>`;
  b += `<rect x="${m + (w - 2 * m) * 0.72}" y="${top + (bottom - top) * 0.4}" width="${(w - 2 * m) * 0.06}" height="${(bottom - top) * 0.24}" fill="${P.oxide}"/>`;
  b += `<rect x="${m - (w - 2 * m) * 0.22}" y="${top + (bottom - top) * 0.08}" width="${(w - 2 * m) * 0.16}" height="${(bottom - top) * 0.92}" fill="${P.stone2}"/>`;
  b += `<line x1="0" y1="${bottom}" x2="${w}" y2="${bottom}" stroke="${P.ink7}" stroke-width="2"/>`;
  b += annotation(w * 0.06, h * 0.07, "Porte d'entrée · aluminium");
  return svgDoc(w, h, b, P.bone);
}

/** Terrasse : calepinage vu de dessus. */
function terraceScene(w, h) {
  let b = "";
  const tile = w / 7;
  for (let r = 0; r < Math.ceil(h / (tile * 0.62)); r++)
    for (let c = 0; c < 8; c++) {
      const off = r % 2 ? tile / 2 : 0;
      const shade = [P.stone1, P.boneDeep, P.stone2][(r + c) % 3];
      b += `<rect x="${c * tile - off + 2}" y="${r * tile * 0.62 + 2}" width="${tile - 4}" height="${tile * 0.62 - 4}" fill="${shade}"/>`;
    }
  b += `<rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.05}" fill="${P.ink8}"/>`;
  b += `<rect x="0" y="${h * 0.77}" width="${w}" height="${h * 0.23}" fill="${P.ink9}"/>`;
  b += annotation(w * 0.05, h * 0.9, "Calepinage terrasse · dalles 60×60", P.stone3);
  return svgDoc(w, h, b, P.bone);
}

/** Intérieur : hautes portes-fenêtres, parquet. */
function interiorScene(w, h) {
  let b = "";
  const floorY = h * 0.72;
  // Parquet
  for (let i = 0; i < 14; i++) {
    b += `<polygon points="0,${floorY + i * 14} ${w},${floorY + i * 20} ${w},${floorY + (i + 1) * 20} 0,${floorY + (i + 1) * 14}" fill="${i % 2 ? P.stone2 : P.stone1}"/>`;
  }
  // Mur + 3 portes-fenêtres
  b += `<rect x="0" y="0" width="${w}" height="${floorY}" fill="${P.boneDeep}"/>`;
  for (let i = 0; i < 3; i++) {
    const ww = w * 0.2, x = w * 0.12 + i * w * 0.28;
    b += windowPane(x, h * 0.1, ww, floorY - h * 0.1, { frame: P.ink8, glass: P.stone1, mullion: false });
    b += `<rect x="${x + ww * 0.47}" y="${h * 0.1}" width="${ww * 0.06}" height="${floorY - h * 0.1}" fill="${P.ink8}"/>`;
  }
  b += hairlines(w, h, P.ink9, 6, 0.05);
  b += annotation(w * 0.05, h * 0.94, "Séjour rénové · portes-fenêtres", P.ink5);
  return svgDoc(w, h, b, P.bone);
}

/** Chantier : lignes de structure sur papier pierre (esprit plan). */
function siteScene(w, h) {
  let b = hairlines(w, h, P.ink9, 8, 0.08);
  const g = h * 0.8;
  b += `<line x1="0" y1="${g}" x2="${w}" y2="${g}" stroke="${P.ink7}" stroke-width="3"/>`;
  // Structure filaire
  b += `<g stroke="${P.ink8}" stroke-width="4" fill="none">
    <path d="M ${w * 0.18} ${g} V ${h * 0.3} H ${w * 0.62} V ${g}"/>
    <path d="M ${w * 0.18} ${h * 0.55} H ${w * 0.62}"/>
    <path d="M ${w * 0.4} ${h * 0.3} V ${g}"/>
  </g>`;
  // Grue
  b += `<g stroke="${P.oxide}" stroke-width="5" fill="none">
    <path d="M ${w * 0.78} ${g} V ${h * 0.14} M ${w * 0.6} ${h * 0.2} H ${w * 0.94}"/>
    <path d="M ${w * 0.86} ${h * 0.2} V ${h * 0.34}" stroke-width="2.5"/>
  </g>`;
  b += `<rect x="${w * 0.845}" y="${h * 0.34}" width="${w * 0.03}" height="${w * 0.03}" fill="${P.ink8}"/>`;
  b += dimension(w * 0.18, w * 0.62, g + h * 0.08, "gros œuvre · niveau 1", P.ink5);
  b += annotation(w * 0.05, h * 0.09, "Chantier en cours");
  return svgDoc(w, h, b, P.boneDeep);
}

/** Équipe : silhouettes d'échafaudage, abstrait. */
function teamScene(w, h) {
  let b = hairlines(w, h, P.ink9, 6, 0.07);
  b += `<g stroke="${P.ink8}" stroke-width="4" fill="none">`;
  for (let i = 0; i < 4; i++) {
    const x = w * 0.14 + i * w * 0.24;
    b += `<line x1="${x}" y1="${h * 0.15}" x2="${x}" y2="${h * 0.85}"/>`;
  }
  for (let j = 0; j < 3; j++) {
    const y = h * 0.25 + j * h * 0.24;
    b += `<line x1="${w * 0.14}" y1="${y}" x2="${w * 0.86}" y2="${y}"/>`;
    b += `<line x1="${w * 0.14}" y1="${y}" x2="${w * 0.38}" y2="${y + h * 0.24}"/>`;
  }
  b += `</g>`;
  b += `<rect x="${w * 0.62}" y="${h * 0.49}" width="${w * 0.24}" height="${h * 0.12}" fill="${P.oxide}"/>`;
  b += annotation(w * 0.05, h * 0.94, "L'équipe sur chantier — photo à venir", P.ink5);
  return svgDoc(w, h, b, P.bone);
}

/** Avant / après façade. */
function facadeBefore(w, h) {
  let b = hairlines(w, h, P.ink9, 6, 0.05);
  const m = w * 0.12, top = h * 0.16, bottom = h * 0.84;
  b += `<rect x="${m}" y="${top}" width="${w - 2 * m}" height="${bottom - top}" fill="${P.stone2}"/>`;
  b += `<rect x="${m}" y="${top}" width="${w - 2 * m}" height="${bottom - top}" fill="${P.stone4}" opacity="0.25"/>`;
  for (let c = 0; c < 3; c++)
    b += windowPane(m + (w - 2 * m) * (0.1 + c * 0.32), top + (bottom - top) * 0.18, (w - 2 * m) * 0.2, (bottom - top) * 0.5, { frame: P.ink7, glass: P.stone3 });
  b += `<line x1="0" y1="${bottom}" x2="${w}" y2="${bottom}" stroke="${P.ink7}" stroke-width="2"/>`;
  b += annotation(m, h * 0.09, "État existant", P.ink5);
  return svgDoc(w, h, b, P.boneDeep);
}

const images = [
  { file: "hero.jpg", w: 2000, h: 1400, scene: heroScene },
  { file: "og-image.jpg", w: 1200, h: 630, scene: heroScene },
  { file: "equipe.jpg", w: 1200, h: 900, scene: teamScene },
  { file: "chantier.jpg", w: 1400, h: 1000, scene: siteScene },
  { file: "chassis-detail.jpg", w: 1400, h: 1000, scene: frameSection },
  { file: "projects/extension-moderne.jpg", w: 1200, h: 900, scene: extensionScene },
  { file: "projects/renovation-complete.jpg", w: 1200, h: 900, scene: interiorScene },
  { file: "projects/pose-chassis.jpg", w: 1200, h: 900, scene: (w, h) => facadeLight(w, h, { rows: 3, cols: 3, title: "Châssis aluminium · Wavre" }) },
  { file: "projects/porte-entree.jpg", w: 1200, h: 900, scene: doorScene },
  { file: "projects/terrasse.jpg", w: 1200, h: 900, scene: terraceScene },
  { file: "projects/renovation-facade.jpg", w: 1200, h: 900, scene: (w, h) => facadeLight(w, h, { rows: 2, cols: 4, accentCol: 3, title: "Façade rénovée · Nivelles", sub: "isolation par l'extérieur + enduit minéral" }) },
  { file: "projects/facade-avant.jpg", w: 1200, h: 900, scene: facadeBefore },
  { file: "projects/facade-apres.jpg", w: 1200, h: 900, scene: (w, h) => facadeLight(w, h, { rows: 2, cols: 4, accentCol: 3, title: "Après travaux" }) },
];

const outDir = path.resolve(process.cwd(), "public/images");
await mkdir(path.join(outDir, "projects"), { recursive: true });

for (const img of images) {
  await sharp(Buffer.from(img.scene(img.w, img.h)))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outDir, img.file));
  console.log("✓", img.file);
}
console.log("Série « Matériaux & Élévations » générée dans public/images/");
