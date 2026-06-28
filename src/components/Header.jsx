import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2.5 px-4 hidden sm:flex items-center justify-between font-medium tracking-wide">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:0714447638" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
              <Phone className="w-3.5 h-3.5" /> 0714 447 638
            </a>
            <a href="tel:0701734251" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
              <Phone className="w-3.5 h-3.5" /> 0701 734 251
            </a>
            <a href="mailto:fynbriz@gmail.com" className="flex items-center gap-1.5 hover:text-primary-foreground/70 transition-colors">
              <Mail className="w-3.5 h-3.5" /> fynbriz@gmail.com
            </a>
          </div>
          <span className="flex items-center gap-1.5 text-primary-foreground/80">
            <MapPin className="w-3.5 h-3.5" /> Voi, Taita Taveta County, Kenya
          </span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-2xl shadow-background/20 py-2" : "bg-background/50 backdrop-blur-md border-b border-border/30 py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-500 ring-2 ring-primary/30">
              <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02538d30c_generated_image.png" alt="Fine Breeze Hotel Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-black text-foreground text-xl leading-none tracking-tight group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Helvetica Neue', system-ui, sans-serif" }}>
                Fine Breeze
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-300">
                Hotel & Restaurant
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/") && location.pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Home
            </Link>
            <Link
              to="/Rooms"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/Rooms") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Rooms
            </Link>
            <Link
              to="/Restaurant"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/Restaurant") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Restaurant
            </Link>
            <Link
              to="/Gallery"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/Gallery") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Gallery
            </Link>
            <Link
              to="/Booking"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/Booking") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Book
            </Link>
            <Link
              to="/Admin"
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive("/Admin") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              Admin
            </Link>
            <a
              href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent/20 h-10 px-5 rounded-xl font-bold">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-4 h-4 mr-2" /> Book Now
              </Button>
            </a>
          </nav>

          {/* Mobile */}
          <div className="flex sm:hidden items-center gap-3">
            <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20book." target="_blank" rel="noopener noreferrer">
              <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 w-9 rounded-full shadow-md hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary rounded-full h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card/95 backdrop-blur-xl border-border w-80 flex flex-col">
                <div className="flex items-center gap-3 mb-8 mt-4">
                   <div className="w-11 h-11 rounded-full overflow-hidden shadow-lg ring-2 ring-primary/30">
                     <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02538d30c_generated_image.png" alt="Fine Breeze Hotel Logo" className="w-full h-full object-cover" />
                   </div>
                  <div>
                    <div className="font-black text-foreground text-lg leading-none">Fine Breeze</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Hotel & Restaurant</div>
                  </div>
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                  <Link to="/" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/") && location.pathname === "/" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Home
                  </Link>
                  <Link to="/Rooms" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/Rooms") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Rooms
                  </Link>
                  <Link to="/Restaurant" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/Restaurant") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Restaurant & Menu
                  </Link>
                  <Link to="/Gallery" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/Gallery") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Gallery
                  </Link>
                  <Link to="/Booking" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/Booking") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Book a Stay
                  </Link>
                  <Link to="/Admin" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive("/Admin") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>
                    Admin Dashboard
                  </Link>
                </nav>
                <div className="border-t border-border/50 mt-auto pt-6 space-y-4 pb-6">
                  <a href="tel:0714447638" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Phone className="w-4 h-4 text-primary" /></div> 0714 447 638
                  </a>
                  <a href="tel:0701734251" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Phone className="w-4 h-4 text-primary" /></div> 0701 734 251
                  </a>
                  <a href="mailto:fynbriz@gmail.com" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Mail className="w-4 h-4 text-primary" /></div> fynbriz@gmail.com
                  </a>
                  <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20book." target="_blank" rel="noopener noreferrer" className="block mt-6">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-xl font-bold shadow-lg shadow-accent/20 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                      <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}