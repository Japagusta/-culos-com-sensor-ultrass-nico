import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, Banknote, MapPin, Feather } from 'lucide-react';

export function Benefits() {
  const benefits = [
    { icon: <Zap />, title: 'Autonomia', desc: 'Caminhe livremente sem depender constantemente de auxílio de terceiros.' },
    { icon: <ShieldCheck />, title: 'Segurança', desc: 'Evite colisões na altura da cabeça e tronco, cobrindo pontos cegos da bengala.' },
    { icon: <Feather />, title: 'Conforto', desc: 'Design ergonômico e ultraleve que não cansa durante o uso prolongado.' },
    { icon: <HeartHandshake />, title: 'Inclusivo', desc: 'Curva de aprendizado rápida. Vibrações intuitivas que o cérebro assimila facilmente.' },
    { icon: <Banknote />, title: 'Democratizado', desc: 'Preço de custo focado no impacto social, muito inferior a soluções importadas.' },
    { icon: <MapPin />, title: 'Feito no Brasil', desc: 'Desenvolvido e montado em Xique-Xique, Bahia. Tecnologia nacional com orgulho.' },
  ];

  return (
    <section id="benefícios" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o NaviGlasses?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="text-primary shrink-0">
                {React.cloneElement(b.icon as React.ReactElement, { className: 'w-6 h-6' })}
              </div>
              <div>
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
