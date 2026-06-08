import { motion } from 'framer-motion';

const tech = [
  {
    num: '01',
    title: 'M5Stick C Plus2',
    desc: 'O cérebro do sistema. Um microcontrolador ESP32 ultra-compacto com Bluetooth, Wi-Fi e bateria integrada que garante processamento veloz sem comprometer o peso.',
    image: '/ng-closeup.png',
    imageAlt: 'M5Stick C Plus2 no NaviGlasses',
  },
  {
    num: '02',
    title: 'Sensor Ultrassônico HC-SR04',
    desc: 'Emite pulsos sonoros inaudíveis e mede o tempo de retorno para calcular distâncias com precisão milimétrica. Alcance de até 4 metros, cobrindo toda a zona de risco frontal.',
    image: '/sensor-hcsr04.jpeg',
    imageAlt: 'Diagrama do sensor HC-SR04 — transmissor, objeto e onda refletida',
  },
  {
    num: '03',
    title: 'Carcaça Impressa em 3D',
    desc: 'Design paramétrico fabricado em PLA leve e resistente. Produzido integralmente no Brasil, com encaixe preciso para o M5Stick e posicionamento ideal dos sensores.',
    image: '/ng-angle.png',
    imageAlt: 'Carcaça 3D do NaviGlasses em ângulo',
  },
  {
    num: '04',
    title: 'Alcance de 4 Metros',
    desc: 'O cone de detecção frontal cobre até 4 metros à frente do usuário — tempo suficiente para reagir com segurança a qualquer obstáculo no caminho.',
    image: '/ng-side.png',
    imageAlt: 'NaviGlasses de perfil mostrando o posicionamento do sensor',
  },
];

export function Technology() {
  return (
    <section
      id="tecnologia"
      className="bg-[#050914] relative"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(0,212,232,0.05) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }}
      data-testid="section-technology"
    >
      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">
            Tecnologia
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Engenharia de Precisão
          </h2>
        </motion.div>

        {/* Tech rows */}
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {tech.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6 }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-12 md:py-16 hover:bg-white/[0.01] transition-colors duration-500"
            >
              {/* Text side */}
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <span className="text-primary/40 font-mono text-xs tracking-[0.2em] mb-4">
                  //{item.num}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mb-5 group-hover:text-primary transition-colors duration-300 tracking-tight">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-primary/30 mb-5 group-hover:w-16 transition-all duration-500" />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Image side */}
              <div className={`flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative w-full max-w-sm md:max-w-none rounded-xl overflow-hidden bg-white/[0.03] border border-white/5 group-hover:border-primary/15 transition-colors duration-500">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-auto object-contain p-4 md:p-6 max-h-[280px] md:max-h-[320px] transition-transform duration-700 group-hover:scale-[1.03]"
                    draggable={false}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
