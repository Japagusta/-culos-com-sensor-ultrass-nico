import { motion } from 'framer-motion';
import { Waves, Cpu, Vibrate, Route } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Waves className="w-8 h-8" />,
      title: 'Detecção por Ultrassom',
      desc: 'O sensor frontal varre o ambiente emitindo ondas sonoras inaudíveis.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Processamento',
      desc: 'O M5Stick C Plus2 calcula a distância do obstáculo em tempo real.'
    },
    {
      icon: <Vibrate className="w-8 h-8" />,
      title: 'Alerta Vibratório',
      desc: 'A intensidade da vibração aumenta conforme o objeto se aproxima.'
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: 'Navegação Segura',
      desc: 'O usuário ajusta a rota com autonomia e confiança.'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Um fluxo invisível de tecnologia que traduz o espaço físico em estímulos táteis.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border/50 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-card rounded-full border-2 border-primary/30 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(0,212,232,0.1)] relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: `${idx * 0.5}s` }}/>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
