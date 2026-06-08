import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StickyFeatures } from './components/StickyFeatures';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { Technology } from './components/Technology';
import { Benefits } from './components/Benefits';
import { Gallery } from './components/Gallery';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { useCart } from './hooks/useCart';

function App() {
  const cart = useCart();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative selection:bg-primary/30">
      <Navbar cart={cart} />
      <main className="flex-1">
        <Hero cart={cart} />
        <StickyFeatures />
        <About />
        <HowItWorks />
        <Technology />
        <Benefits />
        <Gallery />
        <Pricing cart={cart} />
      </main>
      <Footer />
      
      <Cart cart={cart} />
      {cart.isCheckoutOpen && <CheckoutModal cart={cart} />}
    </div>
  );
}

export default App;