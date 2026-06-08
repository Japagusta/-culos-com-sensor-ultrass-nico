import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

const steps = [
  {
    num: '01',
    title: 'Onda sonora emitida',
    desc: 'O sensor HC-SR04 dispara pulsos acústicos inaudíveis continuamente, varrendo o ambiente à frente.',
    image: '/sensor-hcsr04.jpeg',
    visual: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        {[22, 36, 50].map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-ping"
            style={{ animationDuration: '2s', animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Obstáculo detectado',
    desc: 'A onda retorna ao receptor após bater no objeto. O M5Stick calcula a distância em milissegundos.',
    image: '/ng-front.png',
    visual: (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-8 h-28 bg-border/50 absolute right-1/4 rounded" />
        <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 text-primary absolute left-[10%]">
          <path d="M5,50 Q30,20 55,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M55,50 Q70,70 100,50" fill="none" stroke="rgba(0,212,232,0.4)" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Alerta ativado',
    desc: 'O microcontrolador aciona o motor vibratório. A intensidade aumenta conforme o obstáculo se aproxima.',
    image: '/ng-closeup.png',
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        {[16, 24, 20, 28, 16].map((w, i) => (
          <div
            key={i}
            className="h-2 bg-primary rounded-full animate-bounce"
            style={{ width: `${w * 4}px`, animationDelay: `${i * 0.08}s`, animationDuration: '0.6s' }}
          />
        ))}
      </div>
    ),
  },
  {
    num: '04',
    title: 'Navegação segura',
    desc: 'O usuário interpreta o alerta e ajusta a rota com autonomia, sem depender de terceiros.',
    image: '/ng-angle.png',
    visual: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" style={{ animationDuration: '2.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  if (isMobile) {
    return (
      <section
        id="como-funciona"
        className="py-20 bg-background border-t border-white/[0.05]"
        data-testid="section-how-mobile"
      >
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">Como Funciona</span>
            <h2 className="text-3xl font-bold tracking-tight">Do sensor ao alerta</h2>
          </div>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative pl-10 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-3.5 top-6 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <div className="text-primary font-mono font-bold text-xs mb-1 tracking-widest">{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{step.desc}</p>

                {/* Real product image */}
                <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] p-3">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto max-h-48 object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="como-funciona"
      className="bg-background relative"
      style={{ height: '500vh' }}
      data-testid="section-how-desktop"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Section label */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/50">
            Como Funciona
          </span>
        </div>

        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {steps.map((step, i) => (
            <div
              key={i}
              className="w-screen h-full flex items-center justify-center px-8 md:px-20 lg:px-28"
            >
              <div className="w-full max-w-6xl grid grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text */}
                <div className="flex flex-col">
                  <div className="text-primary font-mono text-[6vw] font-black mb-4 opacity-25 leading-none">
                    {step.num}
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
                    {step.title}
                  </h2>
                  <div className="w-10 h-px bg-primary/40 mb-5" />
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>

                {/* Visual — real image + SVG overlay */}
                <div className="relative flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    {/* Product image */}
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] p-6">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto max-h-64 object-contain"
                        draggable={false}
                      />
                    </div>
                    {/* SVG overlay animation */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 mix-blend-screen">
                      <div className="w-1/2 h-1/2">{step.visual}</div>
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl -z-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/[0.06]">
          <motion.div className="h-full bg-primary origin-left" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
