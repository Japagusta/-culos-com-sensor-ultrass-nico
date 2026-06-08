import React from 'react';
import { motion } from 'framer-motion';

export function Technology() {
  const tech = [
    { title: 'M5Stick C Plus2', desc: 'O cérebro do sistema. Um microcontrolador ESP32 ultra-compacto com Bluetooth, Wi-Fi e bateria integrada.' },
    { title: 'Sensor HC-SR04', desc: 'Módulo ultrassônico preciso que mapeia a distância de objetos refletindo ondas sonoras com precisão milimétrica.' },
    { title: 'Design Paramétrico 3D', desc: 'A carcaça é impressa em 3D, garantindo leveza extrema, resistência mecânica e facilidade de reparo.' },
    { title: 'Alcance de 4 Metros', desc: 'O sensor cobre uma área cônica frontal de até 4 metros, permitindo tempo de reação seguro ao caminhar.' }
  ];

  return (
    <section id="tecnologia" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engenharia de Precisão</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tech.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-background p-6 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,212,232,0.15)] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
