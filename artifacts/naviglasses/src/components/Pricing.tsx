import { MapPin } from 'lucide-react';
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
    <section id="preço" className="min-h-screen w-full flex bg-[#050914] relative overflow-hidden flex-col md:flex-row border-t border-border">
      
      {/* Divider */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      {/* Left: Product Drama */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,232,0.15)_0%,transparent_60%)]" />
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/ng-angle.png"
          className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_0_50px_rgba(0,212,232,0.2)]"
        />
      </div>

      {/* Right: Pricing info */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 tracking-tight">NaviGlasses</h2>
          
          <div className="mb-12">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl text-primary font-bold">R$</span>
              <span className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter">550</span>
            </div>
            <p className="text-lg text-muted-foreground">+ frete fixo R$ 25,00</p>
          </div>

          <div className="space-y-4 mb-12">
            {includes.map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-foreground/90">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => cart.addToCart()}
            className="w-full bg-primary text-primary-foreground py-6 text-xl font-bold rounded-none hover:bg-primary/90 transition-colors flex items-center justify-center gap-4 group"
          >
            Comprar Agora
            <div className="w-6 h-[1px] bg-primary-foreground group-hover:w-10 transition-all" />
          </button>

          <div className="mt-8 flex items-center gap-3 text-muted-foreground font-mono text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            ENVIADO DE XIQUE-XIQUE, BAHIA
          </div>
        </motion.div>
      </div>

    </section>
  );
}