import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

const steps = [
  {
    num: "01",
    title: "Onda sonora emitida",
    desc: "O sensor HC-SR04 dispara pulsos acústicos inaudíveis continuamente no ambiente.",
    visual: (
      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
        <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-ping" style={{ animationDuration: '2s' }} />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
      </svg>
    )
  },
  {
    num: "02",
    title: "Obstáculo detectado",
    desc: "A onda bate no objeto e retorna ao sensor em uma fração de segundo.",
    visual: (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-8 h-32 bg-border absolute right-1/4" />
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-primary absolute left-1/4">
          <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    )
  },
  {
    num: "03",
    title: "Alerta ativado",
    desc: "O microcontrolador calcula a distância e aciona o motor vibratório na haste.",
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="w-16 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-24 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-16 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    )
  },
  {
    num: "04",
    title: "Navegação segura",
    desc: "O usuário percebe o obstáculo antes do contato e ajusta sua rota.",
    visual: (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute w-4 h-4 bg-primary rounded-full" />
      </div>
    )
  }
];

export function HowItWorks() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  if (isMobile) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          {steps.map((step, i) => (
            <div key={i} className="mb-16 last:mb-0 border-l-2 border-primary/20 pl-6 relative">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-background border-2 border-primary rounded-full" />
              <div className="text-primary font-mono font-bold mb-2">{step.num}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground mb-8">{step.desc}</p>
              <div className="h-48 w-full bg-card/50 rounded-xl border border-white/5 flex items-center justify-center p-8">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="h-[500vh] bg-background relative">
      <div className="sticky top-0 h-[100vh] overflow-hidden flex flex-col">
        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {steps.map((step, i) => (
            <div key={i} className="w-[100vw] h-full flex items-center justify-center p-24">
              <div className="w-full max-w-5xl flex gap-16">
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="text-primary font-mono text-8xl font-black mb-6 opacity-50">{step.num}</div>
                  <h2 className="text-5xl font-bold tracking-tight mb-6">{step.title}</h2>
                  <p className="text-2xl text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <div className="w-full aspect-square relative opacity-80 mix-blend-screen">
                    {step.visual}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-border">
          <motion.div 
            className="h-full bg-primary origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}