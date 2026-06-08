
export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-xs">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">NaviGlasses</span>
          </div>
          <p className="text-sm text-muted-foreground">Visão que vai além dos olhos.</p>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>PIX para doações/compras:</p>
          <p className="text-primary font-mono select-all">ChaolinMatadorDePorco@gmail.com</p>
        </div>

        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} NaviGlasses. Feito em Xique-Xique, BA.
        </div>
      </div>
    </footer>
  );
}
