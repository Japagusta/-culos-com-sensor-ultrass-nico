import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import productImg from '/naviglasses-product.png';

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="galeria" className="py-32 bg-card relative overflow-hidden" ref={containerRef}>
      {/* Background Particles/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Funcional</h2>
          <p className="text-muted-foreground">Minimalista. Robusto. Desenvolvido para o dia a dia.</p>
        </motion.div>

        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-[1000px]">
          <motion.div 
            style={{ rotateY, y }}
            className="relative w-full max-w-[600px] preserve-3d cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            whileDrag={{ scale: 1.05 }}
          >
            <img 
              src={productImg} 
              alt="NaviGlasses 3D View" 
              className="w-full h-auto drop-shadow-2xl pointer-events-none"
            />
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-primary/50 animate-pulse">
              &lt; Arraste para inspecionar &gt;
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
