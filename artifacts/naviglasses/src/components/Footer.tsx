export function Footer() {
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
              N
            </div>
            <span className="font-bold text-2xl tracking-tight">NaviGlasses</span>
          </div>
          <p className="text-muted-foreground">Visão que vai além dos olhos.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground">
          <p>PIX para doações/compras:</p>
          <p className="text-primary font-mono select-all text-base">ChaolinMatadorDePorco@gmail.com</p>
          <div className="mt-4 opacity-50">
            &copy; {new Date().getFullYear()} NaviGlasses. Feito no Brasil.
          </div>
        </div>

      </div>
    </footer>
  );
}