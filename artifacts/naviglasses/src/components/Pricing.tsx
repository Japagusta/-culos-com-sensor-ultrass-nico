import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';

export function Pricing({ cart }: { cart: any }) {
  return (
    <section id="preço" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl border border-border/50 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black">
          
          {/* Info Side */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2">NaviGlasses</h2>
            <p className="text-muted-foreground mb-8">Protótipo de Lançamento</p>
            
            <div className="space-y-4 mb-8">
              {[
                'Óculos Inteligente NaviGlasses',
                'Módulo M5Stick C Plus2 Integrado',
                'Cabo de carregamento USB-C',
                'Manual de instruções acessível',
                'Suporte técnico direto'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Side */}
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border/50 items-center text-center md:w-[350px]">
            <div className="mb-2 text-sm text-muted-foreground">Preço Social</div>
            <div className="flex items-start justify-center gap-1 mb-6">
              <span className="text-2xl mt-1 text-primary">R$</span>
              <span className="text-6xl font-bold tracking-tighter text-foreground">550</span>
              <span className="text-xl mt-1">,00</span>
            </div>
            
            <div className="text-xs text-muted-foreground mb-8">+ Frete Fixo R$ 25,00</div>

            <button
              data-testid="pricing-add-cart"
              onClick={() => cart.addToCart()}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,212,232,0.4)] transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5" /> Adicionar ao Carrinho
            </button>
            <p className="mt-4 text-xs text-muted-foreground">
              Enviado de Xique-Xique, Bahia
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
