import { MapPin, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export function Pricing({ cart }: { cart: any }) {
  const includes = [
    'Óculos Inteligente NaviGlasses',
    'Módulo M5Stick C Plus2 Integrado',
    'Cabo de carregamento USB-C',
    'Manual de instruções acessível',
    'Suporte técnico direto do desenvolvedor',
  ];

  return (
    <section
      id="preço"
      className="w-full bg-[#050914] relative overflow-hidden border-t border-white/[0.05]"
      data-testid="section-pricing"
    >
      {/* Vertical divider (desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row md:min-h-screen">
        {/* ── Left: Product image ── */}
        <div className="w-full md:w-1/2 min-h-[50vw] md:min-h-0 relative flex items-center justify-center p-8 md:p-16 order-2 md:order-1">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,232,0.1),transparent)] pointer-events-none" />
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src="/ng-angle.png"
            alt="NaviGlasses"
            className="relative z-10 w-full max-w-[400px] md:max-w-[500px] object-contain drop-shadow-[0_0_60px_rgba(0,212,232,0.18)]"
            draggable={false}
          />
        </div>

        {/* ── Right: Pricing info ── */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 md:py-24 order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-6">
              Preço
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">NaviGlasses</h2>

            {/* Price — responsive, not giant on mobile */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl md:text-2xl text-primary font-bold">R$</span>
                <span
                  className="font-black leading-none tracking-tighter text-foreground"
                  style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
                >
                  550
                </span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                + frete fixo R$ 25,00 · Entrega para todo o Brasil
              </p>
            </div>

            {/* Includes */}
            <div className="space-y-3 mb-10">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground/85">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              data-testid="pricing-add-cart"
              onClick={() => cart.addToCart()}
              className="w-full bg-primary text-primary-foreground py-4 md:py-5 text-base font-bold flex items-center justify-center gap-3 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,212,232,0.4)] active:scale-[0.98] transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>

            <div className="mt-6 flex items-center gap-2 text-muted-foreground/60 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-primary/50 shrink-0" />
              ENVIADO DE XIQUE-XIQUE, BAHIA
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
