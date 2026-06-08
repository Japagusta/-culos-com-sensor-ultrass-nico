import { motion } from 'framer-motion';

/* ─── Sonar animation for the "4 Meters" item ─── */
function SonarAnimation() {
  const waves = [0, 1, 2, 3];
  const meters = [1, 2, 3, 4];

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-6 relative">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-h-[280px]"
        style={{ overflow: 'visible' }}
      >
        {/* ── grid floor ── */}
        {[40, 80, 120, 160].map(y => (
          <line key={y} x1="28" y1={y} x2="285" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="175" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* ── sensor body (HC-SR04 simplified) ── */}
        <rect x="4" y="70" width="28" height="60" rx="4" fill="hsl(217,33%,17%)" stroke="hsl(186,100%,42%,0.5)" strokeWidth="1.5" />
        {/* Left eye / transducer */}
        <circle cx="18" cy="90" r="8" fill="hsl(217,33%,12%)" stroke="hsl(186,100%,42%,0.6)" strokeWidth="1.2" />
        <circle cx="18" cy="90" r="4" fill="hsl(186,100%,42%,0.15)" />
        {/* Right eye / receiver */}
        <circle cx="18" cy="112" r="8" fill="hsl(217,33%,12%)" stroke="hsl(186,100%,42%,0.4)" strokeWidth="1.2" />
        <circle cx="18" cy="112" r="4" fill="hsl(186,100%,42%,0.08)" />
        {/* Pins */}
        {[76,84,92,100].map((y, i) => (
          <line key={i} x1="4" y1={y} x2="-6" y2={y} stroke="hsl(186,100%,42%,0.3)" strokeWidth="1.2" />
        ))}
        {/* Label */}
        <text x="18" y="144" textAnchor="middle" fill="hsl(186,100%,42%,0.5)" fontSize="5" fontFamily="monospace">HC-SR04</text>

        {/* ── outgoing sonar arcs ── */}
        {waves.map(i => (
          <g key={i}>
            <ellipse
              cx="32"
              cy="100"
              rx="0"
              ry="0"
              fill="none"
              stroke="hsl(186,100%,42%)"
              strokeWidth="1.8"
              strokeOpacity="0.7"
              clipPath="url(#rightClip)"
            >
              <animate
                attributeName="rx"
                values="0;120;240"
                dur="2.4s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="ry"
                values="0;70;140"
                dur="2.4s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.7;0.3;0"
                dur="2.4s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
            </ellipse>
          </g>
        ))}

        {/* Clip to right side only */}
        <defs>
          <clipPath id="rightClip">
            <rect x="32" y="0" width="300" height="200" />
          </clipPath>
        </defs>

        {/* ── return wave (dashed, from obstacle back) ── */}
        {[0, 1].map(i => (
          <ellipse
            key={i}
            cx="284"
            cy="100"
            rx="0"
            ry="0"
            fill="none"
            stroke="hsl(186,100%,42%)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0"
            clipPath="url(#leftClip)"
          >
            <animate
              attributeName="rx"
              values="0;80;160"
              dur="2.4s"
              begin={`${1.2 + i * 1.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="ry"
              values="0;50;100"
              dur="2.4s"
              begin={`${1.2 + i * 1.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0;0.4;0"
              dur="2.4s"
              begin={`${1.2 + i * 1.2}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}

        <defs>
          <clipPath id="leftClip">
            <rect x="0" y="0" width="284" height="200" />
          </clipPath>
        </defs>

        {/* ── obstacle ── */}
        <g>
          <rect x="280" y="30" width="16" height="140" rx="3" fill="hsl(217,33%,20%)" stroke="hsl(186,100%,42%,0.25)" strokeWidth="1.5" />
          {/* obstacle glow when hit */}
          <rect x="280" y="30" width="16" height="140" rx="3" fill="hsl(186,100%,42%)" fillOpacity="0">
            <animate
              attributeName="fill-opacity"
              values="0;0.12;0;0.12;0"
              dur="2.4s"
              begin="1.1s"
              repeatCount="indefinite"
            />
          </rect>
          <text x="288" y="185" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace">OBJETO</text>
        </g>

        {/* ── distance baseline ── */}
        <line x1="32" y1="175" x2="285" y2="175" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* ── meter markers ── */}
        {meters.map((m, i) => {
          const x = 32 + (i + 1) * ((284 - 32) / 4);
          return (
            <g key={m}>
              <line x1={x} y1="172" x2={x} y2="178" stroke="hsl(186,100%,42%,0.5)" strokeWidth="1.5" />
              <text x={x} y="190" textAnchor="middle" fill="hsl(186,100%,42%,0.6)" fontSize="7" fontFamily="monospace" fontWeight="bold">
                {m}m
              </text>
            </g>
          );
        })}

        {/* ── "4.0 m" label ── */}
        <text x="160" y="10" textAnchor="middle" fill="hsl(186,100%,42%,0.5)" fontSize="7" fontFamily="monospace" letterSpacing="1">
          ALCANCE DE DETECÇÃO
        </text>
      </svg>
    </div>
  );
}

/* ─── Wireframe 3D-print illustration for the casing item ─── */
function PrintIllustration() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-4">
      <svg viewBox="0 0 220 160" className="w-full max-h-[220px]">
        {/* isometric glasses wireframe — simplified */}
        {/* Left lens frame */}
        <rect x="18" y="50" width="72" height="52" rx="10" fill="none" stroke="hsl(186,100%,42%)" strokeWidth="1.8" strokeOpacity="0.9" />
        {/* Right lens frame */}
        <rect x="130" y="50" width="72" height="52" rx="10" fill="none" stroke="hsl(186,100%,42%)" strokeWidth="1.8" strokeOpacity="0.9" />
        {/* Bridge */}
        <path d="M90,76 Q110,68 130,76" fill="none" stroke="hsl(186,100%,42%)" strokeWidth="1.8" strokeOpacity="0.9" />
        {/* Left temple */}
        <path d="M18,76 L0,76" stroke="hsl(186,100%,42%)" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round" />
        {/* Right temple */}
        <path d="M202,76 L220,76" stroke="hsl(186,100%,42%)" strokeWidth="1.8" strokeOpacity="0.7" strokeLinecap="round" />

        {/* Sensor slots on bridge area */}
        <circle cx="98" cy="76" r="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <circle cx="122" cy="76" r="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />

        {/* M5Stick module on top */}
        <rect x="88" y="30" width="44" height="24" rx="4" fill="hsl(217,33%,17%)" stroke="hsl(186,100%,42%)" strokeWidth="1.5" strokeOpacity="0.8" />
        <rect x="93" y="34" width="28" height="14" rx="2" fill="hsl(186,100%,42%,0.15)" stroke="hsl(186,100%,42%,0.4)" strokeWidth="1" />
        <text x="110" y="43" textAnchor="middle" fill="hsl(186,100%,42%,0.7)" fontSize="5" fontFamily="monospace" fontWeight="bold">M5</text>

        {/* Stacked print layer lines — suggest layered FDM printing */}
        {[110, 115, 120, 125, 130].map((y, i) => (
          <g key={y}>
            {/* left lens layers */}
            <path
              d={`M${22} ${y} H${86}`}
              stroke="rgba(0,212,232,0.12)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* right lens layers */}
            <path
              d={`M${134} ${y} H${198}`}
              stroke="rgba(0,212,232,0.12)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          </g>
        ))}

        {/* print head moving above — simple triangle */}
        <g>
          <polygon points="60,22 68,8 76,22" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="68" y1="8" x2="68" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* print head animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;140,0;0,0"
            dur="4s"
            repeatCount="indefinite"
            additive="sum"
          />
        </g>

        {/* labels */}
        <text x="54" y="115" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace">PLA</text>
        <text x="166" y="115" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace">PLA</text>
      </svg>
      <p className="text-center text-xs text-muted-foreground/40 font-mono tracking-wider uppercase">
        Design Paramétrico · FDM Print
      </p>
    </div>
  );
}

/* ─── Data for the 4 tech items ─── */
type TechItem = {
  num: string;
  title: string;
  desc: string;
  visual: 'image' | 'sonar' | 'print';
  image?: string;
  imageAlt?: string;
};

const tech: TechItem[] = [
  {
    num: '01',
    title: 'M5Stick C Plus2',
    desc: 'O cérebro do sistema. Um microcontrolador ESP32 ultra-compacto com Bluetooth, Wi-Fi e bateria integrada que garante processamento veloz sem comprometer o peso.',
    visual: 'image',
    image: '/ng-closeup.png',
    imageAlt: 'M5Stick C Plus2 no NaviGlasses',
  },
  {
    num: '02',
    title: 'Sensor Ultrassônico HC-SR04',
    desc: 'Emite pulsos sonoros inaudíveis e mede o tempo de retorno para calcular distâncias com precisão milimétrica. Alcance de até 4 metros, cobrindo toda a zona de risco frontal.',
    visual: 'image',
    image: '/sensor-hcsr04.jpeg',
    imageAlt: 'Diagrama do sensor HC-SR04',
  },
  {
    num: '03',
    title: 'Carcaça Impressa em 3D',
    desc: 'Design paramétrico fabricado em PLA leve e resistente. Produzido integralmente no Brasil, com encaixe preciso para o M5Stick e posicionamento ideal dos sensores.',
    visual: 'print',
  },
  {
    num: '04',
    title: 'Alcance de 4 Metros',
    desc: 'O cone de detecção frontal cobre até 4 metros à frente do usuário — tempo suficiente para reagir com segurança a qualquer obstáculo no caminho.',
    visual: 'sonar',
  },
];

export function Technology() {
  return (
    <section
      id="tecnologia"
      className="bg-[#050914] relative"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,212,232,0.05) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }}
      data-testid="section-technology"
    >
      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">
            Tecnologia
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Engenharia de Precisão
          </h2>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/[0.07]">
          {tech.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6 }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-12 md:py-16 hover:bg-white/[0.01] transition-colors duration-500"
            >
              {/* Text */}
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <span className="text-primary/40 font-mono text-xs tracking-[0.2em] mb-4">
                  //{item.num}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mb-5 group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-primary/30 mb-5 group-hover:w-16 transition-all duration-500" />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Visual */}
              <div className={`flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative w-full max-w-sm md:max-w-none rounded-xl overflow-hidden bg-white/[0.03] border border-white/5 group-hover:border-primary/15 transition-colors duration-500 min-h-[200px] md:min-h-[260px]">
                  {item.visual === 'sonar' && <SonarAnimation />}
                  {item.visual === 'print' && <PrintIllustration />}
                  {item.visual === 'image' && item.image && (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-auto object-contain p-4 md:p-6 max-h-[280px] md:max-h-[320px] transition-transform duration-700 group-hover:scale-[1.03]"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
