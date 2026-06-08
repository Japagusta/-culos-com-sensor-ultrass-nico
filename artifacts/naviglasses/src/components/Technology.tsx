import { motion } from 'framer-motion';

const tech = [
  {
    num: "01",
    title: "M5Stick C Plus2",
    desc: "O cérebro do sistema. Um microcontrolador ESP32 ultra-compacto com Bluetooth, Wi-Fi e bateria integrada que garante processamento veloz sem comprometer o peso."
  },
  {
    num: "02",
    title: "Sensor HC-SR04",
    desc: "Módulo ultrassônico preciso que mapeia a distância de objetos refletindo ondas sonoras, oferecendo leitura confiável do ambiente frontal."
  },
  {
    num: "03",
    title: "Design Paramétrico 3D",
    desc: "Carcaça modelada e impressa em 3D, garantindo leveza extrema, resistência mecânica e facilidade de reparo com baixo custo de produção."
  },
  {
    num: "04",
    title: "Alcance de 4 Metros",
    desc: "O sensor cobre uma área cônica frontal de até 4 metros, permitindo tempo de reação seguro para desviar de obstáculos antes do contato."
  }
];

export function Technology() {
  return (
    <section id="tecnologia" className="bg-[#050914] bg-[radial-gradient(hsl(186,100%,42%,0.05)_1px,transparent_1px)] [background-size:24px_24px] relative">
      <div className="container mx-auto px-6 py-32 flex flex-col md:flex-row gap-16">
        
        {/* Sticky Left Column */}
        <div className="w-full md:w-1/3 md:sticky md:top-32 md:h-[calc(100vh-8rem)] flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Engenharia de Precisão</h2>
          <div className="flex-1 w-full relative min-h-[300px]">
            <img 
              src="/ng-closeup.png" 
              alt="NaviGlasses Closeup" 
              className="absolute inset-0 w-full h-full object-contain object-left-top drop-shadow-2xl opacity-80"
              draggable={false}
            />
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="w-full md:w-2/3 flex flex-col pt-16 md:pt-32 pb-32">
          {tech.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
              className="group relative pb-12 mb-12 border-b border-white/10 hover:border-primary/50 transition-colors duration-500"
            >
              <div className="text-primary/50 font-mono text-sm mb-4">//{item.num}</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {item.desc}
              </p>
              
              {/* Bottom glow line on hover */}
              <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}