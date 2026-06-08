import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ cart }: { cart: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)} data-testid="nav-logo">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-xl">
            N
          </div>
          <span className="font-bold text-xl tracking-tight">NaviGlasses</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['Início', 'Sobre', 'Como Funciona', 'Tecnologia', 'Benefícios', 'Galeria', 'Preço'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            data-testid="nav-cart"
            onClick={() => cart.setIsOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-colors hover:scale-110 hover:shadow-[0_0_15px_rgba(0,212,232,0.5)] rounded-full"
          >
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {['Início', 'Sobre', 'Como Funciona', 'Tecnologia', 'Benefícios', 'Galeria', 'Preço'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="text-left text-foreground hover:text-primary"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
