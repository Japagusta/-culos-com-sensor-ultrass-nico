import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const features = [
  {
    title: 'Detecção Ultrassônica',
    desc: 'O sensor HC-SR04 emite ondas de alta frequência que varrem até 4 metros à frente, mapeando o espaço continuamente.',
    image: '/ng-front.png',
    num: '01',
  },
  {
    title: 'Processamento em Tempo Real',
    desc: 'O M5Stick C Plus2 calcula a distância do obstáculo em milissegundos, transformando dados brutos em decisões instantâneas.',
    image: '/ng-angle.png',
    num: '02',
  },
  {
    title: 'Alerta Vibratório Intuitivo',
    desc: 'A intensidade da vibração aumenta à medida que o obstáculo se aproxima. O corpo aprende sem esforço consciente.',
    image: '/ng-closeup.png',
    num: '03',
  },
  {
    title: 'Carcaça Impressa em 3D',
    desc: 'Design ergonômico fabricado no Brasil. Leve, resistente e pensado para o uso diário sem abrir mão do conforto.',
    image: '/ng-side.png',
    num: '04',
  },
  {
    title: 'Autonomia Real',
    desc: 'Usar o NaviGlasses é reconquistar a confiança de caminhar livremente, compreendendo cada centímetro do espaço ao redor.',
    image: '/ng-rear.png',
    num: '05',
  },
];

export function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeIndex, setActiveIndex] = useState(0);

  const featureIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, features.length - 0.001]
  );

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
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,212,232,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        {/* Left — product viewer */}
        <div className="w-full md:w-1/2 h-full relative flex items-center justify-center p-8 md:p-16">
          {/* Ciano glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] bg-primary/8 rounded-full blur-[80px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={features[activeIndex].image}
              alt={features[activeIndex].title}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-[85%] max-h-[75%] object-contain drop-shadow-[0_0_40px_rgba(0,212,232,0.12)]"
              draggable={false}
            />
          </AnimatePresence>

          {/* Step dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {features.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 24 : 6,
                  backgroundColor: i === activeIndex ? 'hsl(186,100%,42%)' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Right — text */}
        <div className="hidden md:flex w-1/2 h-full flex-col justify-center px-12 lg:px-20 relative border-l border-white/[0.04]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <span className="font-mono text-sm text-primary/60 tracking-[0.2em]">
                {features[activeIndex].num} / {String(features.length).padStart(2, '0')}
              </span>

              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-foreground">
                {features[activeIndex].title}
              </h2>

              <div className="w-12 h-px bg-primary/40" />

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                {features[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-12 lg:left-20 text-xs text-muted-foreground/40 tracking-widest uppercase flex items-center gap-3">
            <div className="w-8 h-px bg-current" />
            Role para explorar
          </div>
        </div>
      </div>
    </section>
  );
}
