import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

const photos = [
  "/ng-front.png",
  "/ng-angle.png",
  "/ng-side.png",
  "/ng-closeup.png",
  "/ng-back.png",
  "/ng-rear.png"
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-60%']);

  if (isMobile) {
    return (
      <section id="galeria" className="py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Cada ângulo conta</h2>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 pb-8 gap-6">
          {photos.map((src, i) => (
            <div key={i} className="snap-center shrink-0 w-[80vw] bg-background rounded-2xl border border-white/5 p-4 relative">
              <img src={src} alt={`Ângulo ${i+1}`} className="w-full h-auto object-contain drop-shadow-xl" />
              <div className="absolute bottom-4 left-4 font-mono text-sm text-primary">0{i+1}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="galeria" className="h-[200vh] bg-card relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-6 mb-16 relative z-20">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Cada ângulo conta</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-16 relative z-10 px-32">
          {photos.map((src, i) => (
            <div key={i} className="relative shrink-0 flex items-center group">
              {i > 0 && <div className="absolute -left-8 top-1/4 bottom-1/4 w-[1px] bg-primary/20" />}
              <div className="h-[50vh] w-[40vw] flex items-center justify-center">
                <img 
                  src={src} 
                  alt={`Galeria ${i+1}`} 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
                  draggable={false}
                />
              </div>
              <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 font-mono text-primary text-xl font-bold">
                0{i+1}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}