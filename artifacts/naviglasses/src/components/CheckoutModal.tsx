import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, Loader2, Check } from 'lucide-react';

export function CheckoutModal({ cart }: { cart: any }) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const { items, total, clearCart, setIsCheckoutOpen } = cart;
  const shipping = 25.00;
  const finalTotal = total + shipping;

  const handleCopy = () => {
    navigator.clipboard.writeText("ChaolinMatadorDePorco@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    setStep(4);
    setTimeout(() => {
      setStep(5);
    }, 2500);
  };

  const handleClose = () => {
    if (step === 5) {
      clearCart();
    }
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden relative"
      >
        {step !== 4 && step !== 5 && (
          <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground z-10">
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">x{item.quantity}</span>
                      </div>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-muted-foreground pt-4 border-t border-border">
                    <span>Frete Fixo</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-border text-primary">
                    <span>Total</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                  Continuar
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold mb-6">Dados de Entrega</h2>
                <form className="space-y-4 mb-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome Completo</label>
                    <input required type="text" placeholder="Maria Silva" className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Endereço</label>
                    <input required type="text" placeholder="Rua das Flores, 123" className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Cidade / Estado</label>
                      <input required type="text" placeholder="Xique-Xique - BA" className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">CEP</label>
                      <input required type="text" placeholder="44900-000" className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl font-bold text-muted-foreground hover:bg-background transition-colors">Voltar</button>
                    <button type="submit" className="flex-[2] bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">Continuar</button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                <h2 className="text-2xl font-bold mb-2">Pague via PIX</h2>
                <p className="text-muted-foreground mb-6">Escaneie o QR Code ou copie a chave.</p>
                
                <div className="bg-white p-4 rounded-xl inline-block mb-6">
                  {/* Fake QR Code Pattern */}
                  <div className="w-48 h-48 grid grid-cols-6 grid-rows-6 gap-1 opacity-80">
                    {Array.from({length: 36}).map((_, i) => (
                      <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl p-3 flex justify-between items-center mb-6">
                  <span className="font-mono text-sm truncate select-all">ChaolinMatadorDePorco@gmail.com</span>
                  <button onClick={handleCopy} className="ml-4 p-2 bg-card rounded-lg hover:text-primary transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-3xl font-bold text-primary mb-8">R$ {finalTotal.toFixed(2)}</div>

                <button onClick={simulatePayment} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                  Pagar com PIX (Simular)
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                <h2 className="text-xl font-bold">Confirmando pagamento...</h2>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative">
                {/* Confetti simulation overlay would go here if using a real library, simulating with CSS */}
                
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">Pagamento confirmado!</h2>
                <p className="text-muted-foreground mb-8">Pedido #NVG-2024-{Math.floor(Math.random() * 9000) + 1000}</p>
                
                <div className="bg-background rounded-xl p-6 border border-border text-left mb-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0"><Check className="w-3 h-3"/></div>
                    <div>
                      <p className="font-bold text-sm">Pedido confirmado</p>
                      <p className="text-xs text-muted-foreground">Xique-Xique, Bahia</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="absolute left-[11px] -top-6 bottom-6 w-0.5 bg-border -z-10" />
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 animate-pulse"><div className="w-2 h-2 bg-primary rounded-full"/></div>
                    <div>
                      <p className="font-bold text-sm text-primary">Em preparação para envio</p>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-50 relative">
                    <div className="absolute left-[11px] -top-6 bottom-6 w-0.5 bg-border -z-10" />
                    <div className="w-6 h-6 rounded-full bg-card border-2 border-muted flex items-center justify-center shrink-0"></div>
                    <div>
                      <p className="font-bold text-sm">Chegando em breve...</p>
                    </div>
                  </div>
                </div>

                <button onClick={handleClose} className="w-full bg-secondary text-secondary-foreground py-4 rounded-xl font-bold hover:bg-secondary/80 transition-colors">
                  Fechar
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
