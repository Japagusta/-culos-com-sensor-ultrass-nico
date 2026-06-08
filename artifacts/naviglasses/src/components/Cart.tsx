import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export function Cart({ cart }: { cart: any }) {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, setIsCheckoutOpen } = cart;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-primary/20 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold">Seu Carrinho</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:text-primary transition-colors">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-background rounded-xl border border-border">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-card" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-primary font-bold">R$ {item.price.toFixed(2)}</div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-card hover:text-primary">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-card hover:text-primary">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <div className="grid gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                  >
                    Finalizar Compra
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-xl font-bold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
