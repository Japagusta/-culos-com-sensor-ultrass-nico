import { motion } from 'framer-motion';
import { Check, ShoppingBag, MapPin } from 'lucide-react';

export function Pricing({ cart }: { cart: any }) {
  const includes = [
    'Óculos Inteligente NaviGlasses',
    'Módulo M5Stick C Plus2 Integrado',
    'Cabo de carregamento USB-C',
    'Manual de instruções acessível',
    'Suporte técnico direto com o desenvolvedor',
  ];

  return (
    <section id="preço" className="py-28 relative overflow-hidden" data-testid="section-pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70 block mb-3">Preço</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Tecnologia acessível de verdade</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-card rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/60"
        >
          {/* Product image column */}
          <div className="relative md:w-2/5 min-h-[280px] md:min-h-0 bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-center overflow-hidden p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 z-10 hidden md:block" />
            <div className="absolute inset-0 bg-primary/6 blur-3xl" />
            <img
              src="/ng-angle.png"
              alt="NaviGlasses"
              className="relative z-0 w-full max-w-[320px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              draggable={false}
            />
          </div>

          {/* Info column */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* What's included */}
            <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5">
              <h3 className="text-xl font-bold mb-1">NaviGlasses</h3>
              <p className="text-muted-foreground text-sm mb-8">Kit completo — Protótipo de Lançamento</p>

              <div className="space-y-3.5">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/60">
                <MapPin className="w-3.5 h-3.5 text-primary/50" />
                Enviado de Xique-Xique, Bahia
              </div>
            </div>

            {/* CTA column */}
            <div className="p-8 md:p-10 flex flex-col justify-center items-center text-center md:w-[280px]">
              <div className="text-xs text-muted-foreground/70 mb-1 tracking-wide uppercase">Preço Social</div>
              <div className="flex items-start justify-center gap-1 mb-1">
                <span className="text-lg mt-2 text-primary font-semibold">R$</span>
                <span className="text-7xl font-black tracking-tighter text-foreground leading-none">550</span>
                <span className="text-xl mt-4 text-foreground/70">,00</span>
              </div>
              <div className="text-xs text-muted-foreground/60 mb-8">+ Frete fixo R$ 25,00</div>

              <button
                data-testid="pricing-add-cart"
                onClick={() => cart.addToCart()}
                className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(0,212,232,0.45)] transition-all duration-300 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Adicionar ao Carrinho
              </button>
              <p className="mt-4 text-xs text-muted-foreground/50">
                Pagamento via PIX · Entrega garantida
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
