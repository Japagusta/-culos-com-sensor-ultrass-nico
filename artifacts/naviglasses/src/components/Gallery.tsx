import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const shots = [
  {
    src: '/ng-front.png',
    label: 'Vista Frontal',
    desc: 'Design limpo e funcional. Os dois sensores ultrassônicos ficam integrados discretamente na armação.',
  },
  {
    src: '/ng-angle.png',
    label: 'Vista em Ângulo',
    desc: 'O M5Stick C Plus2 encaixa perfeitamente no suporte impresso em 3D, mantendo o centro de gravidade estável.',
  },
  {
    src: '/ng-closeup.png',
    label: 'Close Lateral',
    desc: 'Cada detalhe foi projetado para uso real. Botões acessíveis, visor luminoso e encaixe seguro.',
  },
  {
    src: '/ng-side.png',
    label: 'Perfil 45°',
    desc: 'A carcaça impressa em 3D é leve, resistente e ajustável para diferentes rostos.',
  },
  {
    src: '/ng-back.png',
    label: 'Vista Traseira',
    desc: 'Ergonomia pensada para longas horas de uso com conforto e segurança.',
  },
  {
    src: '/ng-rear.png',
    label: 'Vista Superior',
    desc: 'O módulo de processamento fica posicionado no topo, liberando a visão periférica.',
  },
];

function ShotCard({ shot, index }: { shot: typeof shots[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.2'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const y = useSpring(rawY, { stiffness: 80, damping: 22 });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.93, 1, 1, 0.96]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center my-12 md:my-20`}
      data-testid={`gallery-shot-${index}`}
    >
      {/* Image */}
      <div className="relative w-full md:w-3/5 flex-shrink-0 group">
        {/* Glow behind image */}
        <div className="absolute inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
          <img
            src={shot.src}
            alt={shot.label}
            className="w-full h-auto object-contain max-h-[480px] transition-transform duration-700 group-hover:scale-[1.02]"
            draggable={false}
          />
          {/* Subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Text */}
      <div className={`flex flex-col gap-4 md:w-2/5 ${isEven ? '' : ''}`}>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70">
          0{index + 1} / 0{shots.length}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {shot.label}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          {shot.desc}
        </p>
        {/* Decorative line */}
        <div className="w-12 h-px bg-primary/40 mt-2" />
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.07, 0]);

  return (
    <section
      id="galeria"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      data-testid="section-gallery"
    >
      {/* Animated background glow tied to scroll */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary rounded-full blur-[160px]" />
      </motion.div>

      {/* Faint glasses silhouette in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none select-none w-full max-w-5xl">
        <img src="/ng-front.png" alt="" className="w-full" draggable={false} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">
            Galeria
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Cada ângulo conta uma história
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Um produto feito à mão, componente por componente — para ser visto em todos os detalhes.
          </p>
        </motion.div>

        {/* Shots list */}
        <div className="max-w-5xl mx-auto">
          {shots.map((shot, i) => (
            <ShotCard key={shot.src} shot={shot} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
