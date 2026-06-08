import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';

export function Hero({ cart }: { cart: any }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], ['0%', '12%']);

  // Mouse parallax with motion values (no state)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 28);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [rawX, rawY]);

  return (
    <motion.section
      id="início"
      style={{ opacity, y: heroY }}
      className="relative h-[100vh] w-full overflow-hidden flex items-center bg-background"
      data-testid="section-hero"
    >
      {/* Radial ciano glow — right side */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,212,232,0.13),transparent)]" />
      {/* Left-to-center dark fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/85 to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/60 via-transparent to-transparent" />

      {/* Product image — mouse parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute right-[-8%] md:right-[-4%] top-1/2 -translate-y-1/2 w-[90vw] md:w-[58vw] pointer-events-none z-10"
      >
        <img
          src="/ng-front.png"
          alt="NaviGlasses"
          className="w-full h-auto object-contain select-none"
          draggable={false}
        />
      </motion.div>

      {/* Text content */}
      <div className="container relative z-20 mx-auto px-6 h-full flex items-center">
        <div className="w-full md:w-[52%] flex flex-col justify-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
              Protótipo de Lançamento
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.88] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
          >
            NaviGlasses
          </motion.h1>

          {/* Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-primary/60">
              Visão que vai
            </span>
            <br />
            <span className="text-foreground">além dos olhos.</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-[420px] mb-10 leading-relaxed"
          >
            Um wearable que detecta obstáculos e devolve autonomia a pessoas com deficiência visual — feito com tecnologia acessível, nascido no Brasil.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <button
              data-testid="hero-add-cart"
              onClick={() => cart.addToCart()}
              className="group bg-primary text-primary-foreground px-7 py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_32px_rgba(0,212,232,0.4)] transition-all duration-300"
            >
              Adicionar ao Carrinho
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              data-testid="hero-how-it-works"
              onClick={() => document.getElementById('funciona')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/10 text-foreground/70 px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 hover:border-primary/40 hover:text-primary transition-all duration-300 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
              Como funciona
            </button>
          </motion.div>

          {/* Price hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-sm text-muted-foreground/50"
          >
            A partir de{' '}
            <span className="text-primary font-bold">R$ 550,00</span>
            {' '}· Frete para todo o Brasil
          </motion.p>
        </div>
      </div>

      {/* Scroll line indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-primary/40 to-transparent overflow-hidden relative">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            className="absolute w-full h-1/2 bg-primary"
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase rotate-90 origin-center mt-2">
          Role
        </span>
      </motion.div>
    </motion.section>
  );
}
