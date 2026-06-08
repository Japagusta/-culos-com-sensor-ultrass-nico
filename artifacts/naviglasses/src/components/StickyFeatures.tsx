import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

/* ─── Chip / CPU illustration for "Processamento" ─── */
function ChipIllustration() {
  const pins = [0, 1, 2, 3];
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px]">
        {/* Chip body */}
        <rect x="60" y="60" width="80" height="80" rx="8" fill="hsl(217,33%,14%)" stroke="hsl(186,100%,42%)" strokeWidth="2" />
        {/* Inner die */}
        <rect x="72" y="72" width="56" height="56" rx="4" fill="hsl(217,33%,10%)" stroke="hsl(186,100%,42%,0.4)" strokeWidth="1" />
        {/* Circuit traces inside */}
        <line x1="82" y1="90" x2="118" y2="90" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1" />
        <line x1="82" y1="100" x2="100" y2="100" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1" />
        <line x1="100" y1="100" x2="100" y2="118" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1" />
        <line x1="82" y1="110" x2="118" y2="110" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1" />
        <line x1="118" y1="90" x2="118" y2="110" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1" />
        <text x="100" y="104" textAnchor="middle" fill="hsl(186,100%,42%,0.8)" fontSize="9" fontFamily="monospace" fontWeight="bold">ESP32</text>

        {/* Top pins */}
        {pins.map(i => {
          const x = 76 + i * 17;
          return (
            <g key={`t${i}`}>
              <rect x={x} y="42" width="6" height="18" rx="1" fill="hsl(186,100%,42%,0.6)" />
              <circle cx={x + 3} cy="42" r="2.5" fill="hsl(186,100%,42%)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        {/* Bottom pins */}
        {pins.map(i => {
          const x = 76 + i * 17;
          return (
            <g key={`b${i}`}>
              <rect x={x} y="140" width="6" height="18" rx="1" fill="hsl(186,100%,42%,0.6)" />
              <circle cx={x + 3} cy="158" r="2.5" fill="hsl(186,100%,42%)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.25}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        {/* Left pins */}
        {pins.map(i => {
          const y = 76 + i * 17;
          return (
            <g key={`l${i}`}>
              <rect x="42" y={y} width="18" height="6" rx="1" fill="hsl(186,100%,42%,0.6)" />
              <circle cx="42" cy={y + 3} r="2.5" fill="hsl(186,100%,42%)">
                <animate attributeName="opacity" values="1;0.3;1" dur={`${1.1 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        {/* Right pins */}
        {pins.map(i => {
          const y = 76 + i * 17;
          return (
            <g key={`r${i}`}>
              <rect x="140" y={y} width="18" height="6" rx="1" fill="hsl(186,100%,42%,0.6)" />
              <circle cx="158" cy={y + 3} r="2.5" fill="hsl(186,100%,42%)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Data flow dots along pins */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx="60" cy="88" r="3" fill="hsl(186,100%,42%)">
            <animateMotion dur="1.4s" begin={`${i * 0.46}s`} repeatCount="indefinite"
              path="M0,0 L-18,0" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin={`${i * 0.46}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

/* ─── Vibration / alert illustration ─── */
function VibrationIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px]">
        {/* Central device (glasses side profile, simplified) */}
        <rect x="85" y="70" width="30" height="60" rx="6" fill="hsl(217,33%,14%)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        {/* Screen */}
        <rect x="89" y="76" width="22" height="16" rx="2" fill="hsl(186,100%,42%,0.2)" stroke="hsl(186,100%,42%,0.5)" strokeWidth="1" />
        <text x="100" y="87" textAnchor="middle" fill="hsl(186,100%,42%)" fontSize="7" fontFamily="monospace">N</text>

        {/* Vibration arcs — left side */}
        {[14, 24, 36].map((r, i) => (
          <path
            key={`L${i}`}
            d={`M${85 - 4},${100 - r} Q${85 - r - 4},100 ${85 - 4},${100 + r}`}
            fill="none"
            stroke="hsl(186,100%,42%)"
            strokeWidth={2 - i * 0.4}
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.9;0"
              dur="1.2s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              values={`${2 - i * 0.4};${1.5 - i * 0.3};${2 - i * 0.4}`}
              dur="1.2s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Vibration arcs — right side */}
        {[14, 24, 36].map((r, i) => (
          <path
            key={`R${i}`}
            d={`M${115 + 4},${100 - r} Q${115 + r + 4},100 ${115 + 4},${100 + r}`}
            fill="none"
            stroke="hsl(186,100%,42%)"
            strokeWidth={2 - i * 0.4}
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.9;0"
              dur="1.2s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Pulse rings from center */}
        {[0, 1].map(i => (
          <circle key={i} cx="100" cy="100" r="0" fill="none" stroke="hsl(186,100%,42%)" strokeWidth="1.5">
            <animate attributeName="r" values="0;55;55" dur="1.8s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.6;0;0" dur="1.8s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Intensity bars at bottom */}
        <text x="100" y="158" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">INTENSIDADE</text>
        {[0,1,2,3,4,5,6].map((j) => (
          <rect key={j} x={68 + j * 10} y={148 - j * 3} width="7" height={4 + j * 3} rx="1"
            fill="hsl(186,100%,42%)"
            fillOpacity={0.3 + j * 0.1}>
            <animate attributeName="fill-opacity" values={`${0.2 + j * 0.1};${0.6 + j * 0.06};${0.2 + j * 0.1}`}
              dur={`${0.8 + j * 0.1}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </svg>
    </div>
  );
}

/* ─── Autonomy / person walking illustration ─── */
function AutonomyIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <svg viewBox="0 0 220 200" className="w-full max-w-[240px]">
        {/* Path / road */}
        <path d="M20,160 Q110,140 200,155" stroke="rgba(255,255,255,0.07)" strokeWidth="24" strokeLinecap="round" fill="none" />
        <path d="M20,160 Q110,140 200,155" stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 6" fill="none" />

        {/* Obstacle (avoided) */}
        <rect x="148" y="118" width="14" height="32" rx="3" fill="hsl(217,33%,18%)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        {/* Warn glow around obstacle */}
        <rect x="144" y="114" width="22" height="40" rx="5" fill="none" stroke="hsl(186,100%,42%,0.3)" strokeWidth="1.5" strokeDasharray="3 2">
          <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </rect>

        {/* Person silhouette — simple stick figure walking */}
        <g transform="translate(60,100)">
          {/* head */}
          <circle cx="0" cy="-32" r="10" fill="hsl(217,33%,18%)" stroke="hsl(186,100%,42%)" strokeWidth="1.5" />
          {/* body */}
          <line x1="0" y1="-22" x2="0" y2="10" stroke="hsl(186,100%,42%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* arms */}
          <line x1="0" y1="-8" x2="-14" y2="4" stroke="hsl(186,100%,42%)" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="-8" x2="14" y2="-2" stroke="hsl(186,100%,42%)" strokeWidth="2" strokeLinecap="round" />
          {/* legs walking */}
          <line x1="0" y1="10" x2="-12" y2="30" stroke="hsl(186,100%,42%)" strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="10" x2="10" y2="28" stroke="hsl(186,100%,42%)" strokeWidth="2" strokeLinecap="round" />
          {/* NaviGlasses on head */}
          <rect x="-12" y="-38" width="24" height="8" rx="3" fill="hsl(217,33%,14%)" stroke="hsl(186,100%,42%,0.7)" strokeWidth="1" />
          <rect x="-10" y="-37" width="8" height="5" rx="1.5" fill="none" stroke="hsl(186,100%,42%,0.5)" strokeWidth="0.8" />
          <rect x="2" y="-37" width="8" height="5" rx="1.5" fill="none" stroke="hsl(186,100%,42%,0.5)" strokeWidth="0.8" />
        </g>

        {/* Detection arc ahead of person */}
        {[1, 2, 3].map(i => (
          <ellipse
            key={i}
            cx="60"
            cy="100"
            rx={0}
            ry={0}
            fill="none"
            stroke="hsl(186,100%,42%)"
            strokeWidth="1.2"
            clipPath="url(#rightHalf)"
          >
            <animate attributeName="rx" values={`0;${i * 28};${i * 28}`} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="ry" values={`0;${i * 18};${i * 18}`} dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.7;0.1;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
        <defs>
          <clipPath id="rightHalf">
            <rect x="60" y="0" width="200" height="200" />
          </clipPath>
        </defs>

        {/* "Caminho livre" path arrow */}
        <path d="M82,105 Q115,98 135,100" stroke="hsl(186,100%,42%)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#arrow)" strokeOpacity="0.5" />
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(186,100%,42%,0.5)" />
          </marker>
        </defs>

        <text x="110" y="185" textAnchor="middle" fill="hsl(186,100%,42%,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">CAMINHO LIVRE</text>
      </svg>
    </div>
  );
}

/* ─── Feature config — photos only for 01 and 04 ─── */
type FeatureVisual = 'image' | 'chip' | 'vibration' | 'autonomy';

const features: {
  title: string;
  desc: string;
  num: string;
  visual: FeatureVisual;
  image?: string;
}[] = [
  {
    title: 'Detecção Ultrassônica',
    desc: 'O sensor HC-SR04 emite ondas de alta frequência que varrem até 4 metros à frente, mapeando o espaço continuamente.',
    image: '/ng-front.png',
    num: '01',
    visual: 'image',
  },
  {
    title: 'Processamento em Tempo Real',
    desc: 'O M5Stick C Plus2 calcula a distância do obstáculo em milissegundos, transformando dados brutos em decisões instantâneas.',
    num: '02',
    visual: 'chip',
  },
  {
    title: 'Alerta Vibratório Intuitivo',
    desc: 'A intensidade da vibração aumenta à medida que o obstáculo se aproxima. O corpo aprende sem esforço consciente.',
    num: '03',
    visual: 'vibration',
  },
  {
    title: 'Carcaça Impressa em 3D',
    desc: 'Design ergonômico fabricado no Brasil. Leve, resistente e pensado para o uso diário sem abrir mão do conforto.',
    image: '/ng-side.png',
    num: '04',
    visual: 'image',
  },
  {
    title: 'Autonomia Real',
    desc: 'Usar o NaviGlasses é reconquistar a confiança de caminhar livremente, compreendendo cada centímetro do espaço ao redor.',
    num: '05',
    visual: 'autonomy',
  },
];

function FeatureVisualPanel({ feature }: { feature: typeof features[0] }) {
  if (feature.visual === 'chip') return <ChipIllustration />;
  if (feature.visual === 'vibration') return <VibrationIllustration />;
  if (feature.visual === 'autonomy') return <AutonomyIllustration />;
  if (feature.visual === 'image' && feature.image) {
    return (
      <img
        src={feature.image}
        alt={feature.title}
        className="max-w-[85%] max-h-[75%] object-contain drop-shadow-[0_0_40px_rgba(0,212,232,0.12)] select-none"
        draggable={false}
      />
    );
  }
  return null;
}

export function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeIndex, setActiveIndex] = useState(0);

  const featureIndex = useTransform(scrollYProgress, [0, 1], [0, features.length - 0.001]);

  useMotionValueEvent(featureIndex, 'change', (val) => {
    const next = Math.min(features.length - 1, Math.floor(val));
    setActiveIndex(next);
  });

  return (
    <section
      ref={containerRef}
      id="funciona"
      className="relative bg-[#050914]"
      style={{ height: '500vh' }}
      data-testid="section-sticky-features"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,212,232,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        {/* Left — visual panel */}
        <div className="w-full md:w-1/2 h-full relative flex items-center justify-center p-6 md:p-12">
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[55%] h-[55%] bg-primary/6 rounded-full blur-[90px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <FeatureVisualPanel feature={features[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Step dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {features.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 24 : 6,
                  backgroundColor:
                    i === activeIndex ? 'hsl(186,100%,42%)' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Right — text panel */}
        <div className="hidden md:flex w-1/2 h-full flex-col justify-center px-12 lg:px-20 relative border-l border-white/[0.04]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              <span className="font-mono text-sm text-primary/60 tracking-[0.2em]">
                {features[activeIndex].num} / {String(features.length).padStart(2, '0')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[0.95] text-foreground">
                {features[activeIndex].title}
              </h2>
              <div className="w-10 h-px bg-primary/40" />
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                {features[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-12 lg:left-20 text-xs text-muted-foreground/40 tracking-widest uppercase flex items-center gap-3">
            <div className="w-6 h-px bg-current" />
            Role para explorar
          </div>
        </div>
      </div>
    </section>
  );
}
