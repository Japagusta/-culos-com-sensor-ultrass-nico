import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import productImg from '/naviglasses-product.png';

export function Hero({ cart }: { cart: any }) {
  return (
    <section id="início" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase">Protótipo de Lançamento</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Visão que vai <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">além dos olhos</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[500px]">
              O óculos inteligente que devolve a autonomia. Tecnologia assistiva projetada para transformar a forma como pessoas com deficiência visual navegam pelo mundo.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                data-testid="hero-add-cart"
                onClick={() => cart.addToCart()}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,212,232,0.4)] transition-all duration-300"
              >
                Adicionar ao Carrinho <ArrowRight className="w-5 h-5" />
              </button>
              <button
                data-testid="hero-how-it-works"
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-secondary/80 transition-all duration-300"
              >
                <Eye className="w-5 h-5" /> Ver como funciona
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src={productImg} 
              alt="NaviGlasses Smart Glasses" 
              className="relative z-10 w-full max-w-[600px] mx-auto drop-shadow-2xl drop-shadow-primary/20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
