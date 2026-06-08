import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';

export function Hero({ cart }: { cart: any }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 24);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [rawX, rawY]);

  return (
    <motion.section
      id="início"
      style={{ opacity }}
      className="relative w-full overflow-hidden bg-background"
      data-testid="section-hero"
    >
      {/* ── MOBILE layout (flex column) ── */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Text block */}
        <div className="flex flex-col justify-center px-6 pt-28 pb-8 z-20 relative">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.22em] text-primary uppercase">
              Protótipo de Lançamento
            </span>
          </div>
          <h1 className="font-black leading-[0.88] tracking-tighter mb-4 text-[13vw]">
            NaviGlasses
          </h1>
          <div className="font-bold leading-[1.05] mb-5 text-[7vw]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-primary/60">
              Visão que vai
            </span>
            <br />
            <span className="text-foreground">além dos olhos.</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Um wearable que detecta obstáculos e devolve autonomia a pessoas com deficiência visual — feito no Brasil.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <button
              data-testid="hero-add-cart"
              onClick={() => cart.addToCart()}
              className="bg-primary text-primary-foreground px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              Adicionar ao Carrinho <ArrowRight className="w-4 h-4" />
            </button>
            <button
              data-testid="hero-how-it-works"
              onClick={() => document.getElementById('funciona')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/10 text-foreground/70 px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> Como funciona
            </button>
          </div>
          <p className="text-xs text-muted-foreground/50">
            A partir de <span className="text-primary font-bold">R$ 550,00</span> · Frete para todo o Brasil
          </p>
        </div>

        {/* Product image below text on mobile */}
        <div className="relative flex-1 min-h-[40vw] flex items-end justify-center px-8 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(0,212,232,0.12),transparent)]" />
          <img
            src="/ng-front.png"
            alt="NaviGlasses"
            className="relative z-10 w-full max-w-[360px] object-contain drop-shadow-2xl select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* ── DESKTOP layout (absolute positioned image) ── */}
      <div className="hidden md:flex relative h-screen items-center">
        {/* Strong left gradient so title is ALWAYS readable */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background from-40% via-background/80 via-60% to-transparent" />
        {/* Top fade */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
        {/* Ciano glow right side */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_75%_at_82%_52%,rgba(0,212,232,0.13),transparent)]" />

        {/* Product image — right side, behind the gradient */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[52vw] pointer-events-none z-0"
        >
          <img
            src="/ng-front.png"
            alt="NaviGlasses"
            className="w-full h-auto object-contain select-none"
            draggable={false}
          />
        </motion.div>

        {/* Text — always in front */}
        <div className="container relative z-20 mx-auto px-8 lg:px-16 h-full flex items-center">
          <div className="w-[50%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
                Protótipo de Lançamento
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88] tracking-tighter mb-5"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
            >
              NaviGlasses
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold tracking-tight leading-[1.05] mb-7"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-primary/60">
                Visão que vai
              </span>
              <br />
              <span className="text-foreground">além dos olhos.</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base lg:text-lg text-muted-foreground max-w-[400px] mb-10 leading-relaxed"
            >
              Um wearable que detecta obstáculos e devolve autonomia a pessoas com deficiência visual — feito com tecnologia acessível, nascido no Brasil.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-row gap-3 mb-8"
            >
              <button
                data-testid="hero-add-cart-desktop"
                onClick={() => cart.addToCart()}
                className="group bg-primary text-primary-foreground px-7 py-3.5 text-sm font-bold flex items-center gap-2 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_28px_rgba(0,212,232,0.4)] transition-all duration-300"
              >
                Adicionar ao Carrinho
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                data-testid="hero-how-it-works-desktop"
                onClick={() => document.getElementById('funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/10 text-foreground/70 px-7 py-3.5 text-sm font-semibold flex items-center gap-2 hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                <Eye className="w-4 h-4" /> Como funciona
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="text-sm text-muted-foreground/50"
            >
              A partir de <span className="text-primary font-bold">R$ 550,00</span> · Frete para todo o Brasil
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-8 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-px h-14 overflow-hidden relative bg-white/5">
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              className="absolute w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
