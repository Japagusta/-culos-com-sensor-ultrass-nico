import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { useRef } from 'react';

export function Hero({ cart }: { cart: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      id="início"
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,4%)] via-background to-background z-0" />

      {/* Ciano glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Product image — full right side, fills background */}
      <motion.div
        style={{ y: imgY, scale: imgScale, opacity: imgOpacity }}
        className="absolute inset-0 z-10 flex items-end justify-end md:items-center pointer-events-none"
      >
        <div className="relative w-full md:w-[65%] h-full flex items-end md:items-center justify-center md:justify-end">
          {/* Gradient mask: left fade + bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-20 md:via-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-20" />

          <img
            src="/ng-front.png"
            alt="NaviGlasses produto"
            className="w-[90%] md:w-[85%] max-w-[780px] object-contain drop-shadow-2xl select-none pr-0 md:pr-8"
            draggable={false}
          />

          {/* Subtle ciano glow behind product */}
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none z-10">
            <div className="w-[60%] h-[60%] bg-primary/12 rounded-full blur-[90px] mr-16" />
          </div>
        </div>
      </motion.div>

      {/* Foreground text content */}
      <motion.div
        style={{ y: textY }}
        className="container mx-auto px-6 relative z-30"
      >
        <div className="max-w-[560px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase">Protótipo de Lançamento</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] mb-6"
          >
            NaviGlasses —{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-400 mt-1">
              Visão que vai
            </span>
            <span className="block">além dos olhos.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[440px]"
          >
            Um óculos inteligente que detecta obstáculos e devolve autonomia real a pessoas com deficiência visual — feito com tecnologia acessível, nascido no Brasil.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              data-testid="hero-add-cart"
              onClick={() => cart.addToCart()}
              className="group bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_28px_rgba(0,212,232,0.45)] transition-all duration-300"
            >
              Adicionar ao Carrinho
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              data-testid="hero-how-it-works"
              onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border border-border/60 text-foreground/80 px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:border-primary/50 hover:text-primary transition-all duration-300 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
              Como funciona
            </button>
          </motion.div>

          {/* Price hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-muted-foreground/60"
          >
            A partir de{' '}
            <span className="text-primary font-bold text-base">R$ 550,00</span>
            {' '}· Frete para todo o Brasil
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">Role</span>
      </motion.div>
    </section>
  );
}
