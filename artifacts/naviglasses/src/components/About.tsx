import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Heart } from 'lucide-react';

export function About() {
  return (
    <section id="sobre" className="py-24 bg-card relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nosso Propósito</h2>
          <p className="text-lg text-muted-foreground">
            Acreditamos que a tecnologia deve servir para capacitar as pessoas. O NaviGlasses nasceu do desejo de democratizar a acessibilidade, combinando hardware de baixo custo com inovação de alto impacto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background p-8 rounded-2xl border border-border/50 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">7 Milhões</h3>
            <p className="text-muted-foreground">de pessoas com deficiência visual no Brasil.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background p-8 rounded-2xl border border-border/50 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">285 Milhões</h3>
            <p className="text-muted-foreground">de deficientes visuais em todo o mundo.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-background p-8 rounded-2xl border border-border/50 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">1 Missão</h3>
            <p className="text-muted-foreground">Devolver a independência e a segurança diária.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
