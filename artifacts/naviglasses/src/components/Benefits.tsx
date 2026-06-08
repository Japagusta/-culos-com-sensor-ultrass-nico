import { motion } from 'framer-motion';

const benefits = [
  {
    title: "Autonomia Espacial",
    desc: "Caminhe livremente em qualquer direção sem depender constantemente do auxílio visual de terceiros."
  },
  {
    title: "Segurança de Tronco e Cabeça",
    desc: "Detecta obstáculos aéreos (como galhos ou placas) que escapam à varredura da bengala tradicional."
  },
  {
    title: "Ergonomia Ultraleve",
    desc: "Design focado em conforto para uso contínuo, sem pesar no rosto ou causar incômodo nas orelhas."
  },
  {
    title: "Curva de Aprendizado Zero",
    desc: "Vibrações intuitivas que o cérebro assimila quase instantaneamente: mais perto, mais forte."
  },
  {
    title: "Impacto Social Real",
    desc: "Projeto open-source e hardware de baixo custo, democratizando o acesso a quem mais precisa."
  },
  {
    title: "Orgulho Nacional",
    desc: "Tecnologia desenvolvida, impressa e montada em Xique-Xique, Bahia, provando a força da inovação local."
  }
];

export function Benefits() {
  return (
    <section id="benefícios" className="bg-background py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          <div className="w-full lg:w-5/12 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                Por que o NaviGlasses muda tudo.
              </h2>
              <p className="text-xl text-muted-foreground">
                Não é apenas hardware. É a devolução do direito de ir e vir com dignidade e segurança.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1 }}
                className="group py-8 border-b border-border first:pt-0 hover:bg-white/[0.02] transition-colors -mx-6 px-6"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}