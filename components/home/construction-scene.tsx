import { Container } from "@/components/ui/container";

/**
 * « La maison se construit » : coupe axonométrique dessinée en SVG,
 * stylisée d'après la villa réelle des réalisations (toit à pergola,
 * niveaux vitrés toute hauteur, châssis noirs). La section reste
 * épinglée pendant ~4 écrans de défilement et la maison s'assemble
 * phase par phase — fondations, gros œuvre, toiture, châssis,
 * finitions — avec légendes synchronisées et rail de progression.
 * Scroll-driven animations CSS pures ; repli : maison complète et
 * phases en liste statique (sans support ou en mouvement réduit).
 * Dessin illustratif : ce n'est pas un chantier réel, et c'est écrit
 * dessus (cartouche).
 */

const phases = [
  {
    index: "01",
    title: "Fondations & dalle",
    text: "Terrassement, semelles, dalle portante : tout ce qu'on ne verra plus jamais, et qui porte tout.",
  },
  {
    index: "02",
    title: "Gros œuvre",
    text: "Les murs montent d'aplomb, niveau par niveau, selon les plans de votre architecte.",
  },
  {
    index: "03",
    title: "Toiture",
    text: "La toiture plate se pose, l'étanchéité se soude, la pergola dessine la ligne du toit.",
  },
  {
    index: "04",
    title: "Châssis & vitrages",
    text: "Les baies toute hauteur se glissent en place : mesures précises, resserrages propres.",
  },
  {
    index: "05",
    title: "Finitions & extérieurs",
    text: "Terrasse, abords plantés, contrôle final : la maison est prête à être vécue.",
  },
];

export function ConstructionScene() {
  return (
    <section className="chantier relative border-y border-ink-950/10 bg-bone-deep" aria-labelledby="chantier-titre">
      <div className="chantier-stage flex flex-col justify-center py-20 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          {/* Colonne narrative */}
          <div className="lg:col-span-4">
            <p className="annotation flex items-baseline gap-4 text-ink-500">
              <span className="text-accent-600">03</span> Comment nous bâtissons
            </p>
            <h2
              id="chantier-titre"
              className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-5xl"
            >
              Une maison se construit dans l&apos;ordre.
            </h2>

            {/* Légendes de phase — superposées en mode animé, listées en repli */}
            <div className="chantier-caps relative mt-10">
              {phases.map((phase, i) => (
                <div key={phase.index} className={`chantier-cap chantier-cap-${i + 1}`}>
                  <p className="annotation flex items-center gap-4 text-ink-500">
                    <span className="text-accent-600">Phase {phase.index}</span>
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink-950 sm:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink-600">{phase.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* La maison axonométrique */}
          <div className="lg:col-span-8">
            <svg
              viewBox="0 0 760 640"
              role="img"
              aria-label="Coupe axonométrique illustrative d'une maison contemporaine qui s'assemble : fondations, murs, toiture à pergola, châssis vitrés, terrasse. Dessin technique, pas une photo de chantier."
              className="mx-auto h-auto w-full max-w-3xl"
            >
              {/* ——— Phase 1a : terrain ——— */}
              <g className="ph ph-terrain">
                <polygon
                  points="380,178 692,334 484,438 172,282"
                  fill="var(--color-bone)"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                  opacity="0.9"
                />
                {/* emprise excavée */}
                <polygon
                  points="380,230 640,360 484,438 224,308"
                  fill="var(--color-stone-100)"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                />
              </g>

              {/* ——— Phase 1b : fondations (semelles hachurées) ——— */}
              <g className="ph ph-fond">
                <polygon
                  points="380,230 640,360 484,438 224,308"
                  fill="var(--color-stone-200)"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                />
                <g stroke="var(--color-ink-600)" strokeWidth="0.8" opacity="0.55">
                  <line x1="330" y1="255" x2="430" y2="305" />
                  <line x1="380" y1="230" x2="530" y2="305" />
                  <line x1="430" y1="205" x2="580" y2="280" />
                  <line x1="480" y1="280" x2="580" y2="330" />
                  <line x1="280" y1="280" x2="380" y2="330" />
                  <line x1="330" y1="355" x2="430" y2="405" />
                  <line x1="430" y1="305" x2="530" y2="355" />
                </g>
              </g>

              {/* ——— Phase 1c : dalle ——— */}
              <g className="ph ph-dalle">
                <polygon
                  points="380,218 640,348 484,426 224,296"
                  fill="var(--color-bone)"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                />
                <polygon points="640,348 640,360 484,438 484,426" fill="var(--color-stone-300)" stroke="var(--color-ink-700)" strokeWidth="1" />
                <polygon points="484,426 484,438 224,308 224,296" fill="var(--color-stone-200)" stroke="var(--color-ink-700)" strokeWidth="1" />
              </g>

              {/* ——— Phase 2a : murs du rez ——— */}
              <g className="ph ph-rise ph-rdc">
                {/* face avant-droite */}
                <polygon points="640,270 640,348 484,426 484,348" fill="#ffffff" stroke="var(--color-ink-700)" strokeWidth="1" />
                {/* face avant-gauche */}
                <polygon points="224,218 224,296 484,426 484,348" fill="var(--color-stone-100)" stroke="var(--color-ink-700)" strokeWidth="1" />
                {/* baies en attente (vides sombres légers) */}
                <polygon points="624,278 624,356 500,418 500,340" fill="var(--color-stone-200)" opacity="0.5" />
                <polygon points="240,226 240,304 364,366 364,288" fill="var(--color-stone-200)" opacity="0.5" />
              </g>

              {/* ——— Phase 2b : étage ——— */}
              <g className="ph ph-rise ph-etage">
                <polygon points="640,180 640,270 484,348 484,258" fill="#ffffff" stroke="var(--color-ink-700)" strokeWidth="1" />
                <polygon points="224,128 224,218 484,348 484,258" fill="var(--color-stone-100)" stroke="var(--color-ink-700)" strokeWidth="1" />
                {/* bandeau entre niveaux, comme sur la villa */}
                <polygon points="640,262 640,274 484,352 484,340" fill="#ffffff" stroke="var(--color-ink-700)" strokeWidth="0.8" />
                <polygon points="224,210 224,222 484,352 484,340" fill="var(--color-bone)" stroke="var(--color-ink-700)" strokeWidth="0.8" />
                <polygon points="624,188 624,266 500,328 500,250" fill="var(--color-stone-200)" opacity="0.5" />
                <polygon points="240,136 240,214 364,276 364,198" fill="var(--color-stone-200)" opacity="0.5" />
              </g>

              {/* ——— Phase 3 : toiture + pergola ——— */}
              <g className="ph ph-drop ph-toit">
                <polygon
                  points="380,50 640,180 484,258 224,128"
                  fill="var(--color-bone)"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                />
                <polygon points="640,180 640,190 484,268 484,258" fill="var(--color-stone-300)" stroke="var(--color-ink-700)" strokeWidth="1" />
                <polygon points="484,258 484,268 224,138 224,128" fill="var(--color-stone-200)" stroke="var(--color-ink-700)" strokeWidth="1" />
                {/* poutres de pergola (échos de la villa réelle) */}
                <g fill="#ffffff" stroke="var(--color-ink-700)" strokeWidth="0.9">
                  <polygon points="352,56 612,186 603,190 343,60" />
                  <polygon points="320,72 580,202 571,206 311,76" />
                  <polygon points="288,88 548,218 539,222 279,92" />
                  <polygon points="256,104 516,234 507,238 247,108" />
                  <polygon points="230,121 490,251 481,255 221,125" />
                </g>
              </g>

              {/* ——— Phase 4 : châssis & vitrages ——— */}
              <g className="ph ph-chassis">
                {/* vitrages rez */}
                <polygon points="624,278 624,356 500,418 500,340" fill="var(--color-ink-800)" opacity="0.92" />
                <polygon points="240,226 240,304 364,366 364,288" fill="var(--color-ink-800)" opacity="0.85" />
                {/* vitrages étage */}
                <polygon points="624,188 624,266 500,328 500,250" fill="var(--color-ink-800)" opacity="0.92" />
                <polygon points="240,136 240,214 364,276 364,198" fill="var(--color-ink-800)" opacity="0.85" />
                {/* meneaux */}
                <g stroke="var(--color-ink-950)" strokeWidth="1.6">
                  <line x1="593" y1="293" x2="593" y2="371" />
                  <line x1="562" y1="309" x2="562" y2="387" />
                  <line x1="531" y1="324" x2="531" y2="402" />
                  <line x1="593" y1="203" x2="593" y2="281" />
                  <line x1="562" y1="219" x2="562" y2="297" />
                  <line x1="531" y1="234" x2="531" y2="312" />
                  <line x1="271" y1="241" x2="271" y2="319" />
                  <line x1="302" y1="257" x2="302" y2="335" />
                  <line x1="333" y1="272" x2="333" y2="350" />
                  <line x1="271" y1="151" x2="271" y2="229" />
                  <line x1="302" y1="167" x2="302" y2="245" />
                  <line x1="333" y1="182" x2="333" y2="260" />
                </g>
                {/* reflets */}
                <g stroke="#ffffff" strokeWidth="1" opacity="0.28">
                  <line x1="610" y1="288" x2="516" y2="405" />
                  <line x1="610" y1="198" x2="516" y2="315" />
                  <line x1="254" y1="238" x2="348" y2="355" />
                </g>
                {/* cadres accent : le geste châssis, souligné en rouge de marque */}
                <g fill="none" stroke="var(--color-accent-600)" strokeWidth="1.4">
                  <polygon points="624,188 624,266 500,328 500,250" />
                  <polygon points="240,136 240,214 364,276 364,198" />
                </g>
              </g>

              {/* ——— Phase 5 : finitions, terrasse, cotes ——— */}
              <g className="ph ph-fin">
                {/* terrasse composite */}
                <polygon
                  points="224,296 484,426 427,455 167,325"
                  fill="var(--color-stone-300)"
                  opacity="0.75"
                  stroke="var(--color-ink-700)"
                  strokeWidth="1"
                />
                <g stroke="var(--color-ink-700)" strokeWidth="0.6" opacity="0.5">
                  <line x1="243" y1="315" x2="446" y2="416" />
                  <line x1="224" y1="325" x2="427" y2="426" />
                  <line x1="205" y1="334" x2="408" y2="436" />
                </g>
                {/* haies */}
                <g fill="var(--color-stone-400)" stroke="var(--color-ink-700)" strokeWidth="0.8">
                  <ellipse cx="180" cy="330" rx="26" ry="13" />
                  <ellipse cx="238" cy="359" rx="26" ry="13" />
                  <ellipse cx="296" cy="388" rx="26" ry="13" />
                </g>
                {/* cheminement en dalles */}
                <g fill="var(--color-stone-100)" stroke="var(--color-ink-700)" strokeWidth="0.7">
                  <polygon points="420,452 446,465 432,472 406,459" />
                  <polygon points="452,436 478,449 464,456 438,443" />
                  <polygon points="484,420 510,433 496,440 470,427" />
                </g>
              </g>

              {/* ——— Cotes & cartouche (avec les finitions) ——— */}
              <g className="ph ph-cotes">
                <g stroke="var(--color-accent-600)" strokeWidth="1">
                  <line x1="668" y1="180" x2="668" y2="348" />
                  <line x1="660" y1="180" x2="676" y2="180" />
                  <line x1="660" y1="348" x2="676" y2="348" />
                  <line x1="652" y1="372" x2="496" y2="450" />
                  <line x1="648" y1="366" x2="656" y2="378" />
                  <line x1="492" y1="444" x2="500" y2="456" />
                </g>
                <text x="684" y="268" fontSize="11" fill="var(--color-ink-600)" fontFamily="var(--font-mono)" letterSpacing="1">
                  [H]
                </text>
                <text x="588" y="428" fontSize="11" fill="var(--color-ink-600)" fontFamily="var(--font-mono)" letterSpacing="1">
                  [L]
                </text>
                <text x="24" y="606" fontSize="11" fill="var(--color-ink-600)" fontFamily="var(--font-mono)" letterSpacing="2">
                  COUPE AXONOMÉTRIQUE — MAISON TYPE
                </text>
                <text x="24" y="624" fontSize="10" fill="var(--color-ink-500)" fontFamily="var(--font-mono)" letterSpacing="1.5">
                  DESSIN ILLUSTRATIF COREMI · PAS UN CHANTIER RÉEL
                </text>
              </g>
            </svg>
          </div>
        </Container>

        {/* Rail de progression du chantier */}
        <div aria-hidden="true" className="chantier-rail">
          <span className="chantier-rail-fill" />
        </div>
      </div>
    </section>
  );
}
