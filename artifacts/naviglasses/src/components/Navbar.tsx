import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar({ cart }: { cart: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
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
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="nav-logo">
          <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
            N
          </div>
          <span className="font-bold text-xl tracking-tight">NaviGlasses</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Início', 'Sobre', 'Funciona', 'Tecnologia', 'Benefícios', 'Galeria', 'Preço'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            data-testid="nav-cart"
            onClick={() => cart.setIsOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-all duration-300 rounded-full hover:bg-primary/10"
          >
            <ShoppingCart className="w-5 h-5" />
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
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Início', 'Sobre', 'Funciona', 'Tecnologia', 'Benefícios', 'Galeria', 'Preço'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
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