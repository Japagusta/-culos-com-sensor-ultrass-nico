import { motion } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';

function StatCounter({
  target,
  label,
  prefix = '',
  suffix = '',
}: {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const { count, ref } = useCounter(target, 2000);

  return (
    <div ref={ref} className="flex flex-col border-l-2 border-primary/25 pl-5 md:pl-7">
      <div className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tighter mb-1.5 text-foreground">
        {prefix}{count.toLocaleString('pt-BR')}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="sobre"
      className="w-full flex items-center justify-center relative overflow-hidden bg-background py-24 md:py-0 md:min-h-screen"
      data-testid="section-about"
    >
      <div className="container mx-auto px-6 py-0 md:py-32 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-6">
              Sobre o Projeto
            </span>
            <h2
              className="font-bold tracking-tight leading-[1.1] mb-6 text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)' }}
            >
              285 milhões de pessoas no mundo não enxergam o espaço à sua volta.
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium mb-12 md:mb-16">
              O NaviGlasses foi criado para que elas possam.
            </p>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-primary/40 to-transparent mb-12 md:mb-16" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {[
              { target: 7, suffix: 'M', label: 'deficientes visuais no Brasil', delay: 0.2 },
              { target: 285, suffix: 'M', label: 'no mundo', delay: 0.4 },
              { target: 550, prefix: 'R$', label: 'preço do protótipo', delay: 0.6 },
            ].map(({ target, suffix, prefix, label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, duration: 0.8 }}
              >
                <StatCounter
                  target={target}
                  label={label}
                  prefix={prefix}
                  suffix={suffix}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
