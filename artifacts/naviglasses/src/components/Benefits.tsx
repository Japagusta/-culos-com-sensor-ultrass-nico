import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, Banknote, MapPin, Feather, LucideIcon } from 'lucide-react';

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: 'Autonomia', desc: 'Caminhe livremente sem depender constantemente de auxílio de terceiros.' },
  { icon: ShieldCheck, title: 'Segurança', desc: 'Evite colisões na altura da cabeça e tronco, cobrindo pontos cegos da bengala.' },
  { icon: Feather, title: 'Conforto', desc: 'Design ergonômico e ultraleve que não cansa durante o uso prolongado.' },
  { icon: HeartHandshake, title: 'Inclusivo', desc: 'Curva de aprendizado rápida. Vibrações intuitivas que o cérebro assimila facilmente.' },
  { icon: Banknote, title: 'Democratizado', desc: 'Preço de custo focado no impacto social, muito inferior a soluções importadas.' },
  { icon: MapPin, title: 'Feito no Brasil', desc: 'Desenvolvido e montado em Xique-Xique, Bahia. Tecnologia nacional com orgulho.' },
];

export function Benefits() {
  return (
    <section id="benefícios" className="py-28 relative overflow-hidden" data-testid="section-benefits">
      {/* Faint glasses in background */}
      <div className="absolute -left-48 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none w-[700px]">
        <img src="/ng-rear.png" alt="" draggable={false} className="w-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">Benefícios</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Por que escolher o NaviGlasses?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              data-testid={`benefit-card-${idx}`}
              className="group flex gap-4 p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,212,232,0.06)] transition-all duration-500"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1.5 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
