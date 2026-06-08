import { motion } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';

function StatCounter({ target, label, prefix = '', suffix = '' }: { target: number; label: string; prefix?: string; suffix?: string }) {
  const { count, ref } = useCounter(target, 2000);
  
  return (
    <div ref={ref} className="flex flex-col border-l border-primary/20 pl-6">
      <div className="text-4xl md:text-6xl font-bold font-mono tracking-tighter mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" className="h-[100vh] w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Silhouette */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[80vw] max-w-[1000px] opacity-[0.03] pointer-events-none">
        <img src="/ng-rear.png" alt="" className="w-full h-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-[5vw] leading-[1.1] font-bold tracking-tight mb-8">
              285 milhões de pessoas no mundo não enxergam o espaço à sua volta.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-16">
              O NaviGlasses foi criado para que elas possam.
            </p>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-primary/50 to-transparent mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <StatCounter target={7} label="deficientes visuais no Brasil" suffix="M" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <StatCounter target={285} label="no mundo" suffix="M" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <StatCounter target={550} label="preço do protótipo" prefix="R$" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}