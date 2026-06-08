import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Users, Heart } from 'lucide-react';
import { useRef } from 'react';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);

  const stats = [
    { icon: Users, value: '7 Milhões', label: 'de pessoas com deficiência visual no Brasil.' },
    { icon: Globe, value: '285 Milhões', label: 'de deficientes visuais em todo o mundo.' },
    { icon: Heart, value: '1 Missão', label: 'Devolver a independência e a segurança diária.' },
  ];

  return (
    <section id="sobre" ref={ref} className="py-28 bg-card relative overflow-hidden" data-testid="section-about">
      {/* Ghost product image floating in background */}
      <motion.div
        style={{ x: imgX, opacity: imgOpacity }}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[700px] pointer-events-none select-none"
      >
        <img src="/ng-side.png" alt="" draggable={false} className="w-full" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-20"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-4">Sobre o Projeto</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Tecnologia que abre <span className="text-primary">portas.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              O NaviGlasses nasceu de uma convicção simples: toda pessoa merece se mover pelo mundo com confiança. Combinamos hardware acessível com design cuidadoso para criar uma ferramenta que é ao mesmo tempo técnica e profundamente humana.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group bg-background/70 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
