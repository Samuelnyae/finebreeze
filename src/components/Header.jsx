import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Phone, Mail, MapPin, Home as HomeIcon, BedDouble, Utensils, Images, Info, CalendarCheck, Phone as PhoneIcon, ShieldCheck, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import CurrencySelector from "@/components/CurrencySelector";

const LOGO_URL = "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02538d30c_generated_image.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  const isHome = location.pathname === "/";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/Rooms", label: "Rooms" },
    { to: "/Restaurant", label: "Dining" },
    { to: "/Gallery", label: "Gallery" },
    { to: "/About", label: "About" },
    { to: "/Contact", label: "Contact" },
  ];

  const mobileNavItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/Rooms", label: "Rooms & Suites", icon: BedDouble },
    { to: "/Restaurant", label: "Restaurant & Bar", icon: Utensils },
    { to: "/Gallery", label: "Gallery", icon: Images },
    { to: "/About", label: "About Us", icon: Info },
    { to: "/Booking", label: "Book a Stay", icon: CalendarCheck },
    { to: "/Contact", label: "Contact", icon: PhoneIcon },
    ...(isAdmin ? [{ to: "/Admin", label: "Admin Dashboard", icon: ShieldCheck }] : []),
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background border-b border-border" : "bg-transparent"}`}>
        <div className="px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left: Hamburger */}
          <div className="flex-1 flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className={`flex items-center gap-2.5 transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase hidden md:inline">Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background border-r border-border w-full sm:w-[420px] p-0 flex flex-col">
                <div className="flex items-center justify-between px-8 h-16 md:h-20 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img src={LOGO_URL} alt="Fine Breeze" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-heading text-lg leading-none">Fine Breeze</div>
                      <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">Hotel & Restaurant</div>
                    </div>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-8 py-8">
                  <p className="kemp-label text-muted-foreground mb-6">Navigation</p>
                  <div className="space-y-1">
                    {mobileNavItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 py-3.5 border-b border-border/50 text-sm transition-colors ${isActive(item.to) ? "text-primary" : "text-foreground hover:text-primary"}`}
                      >
                        <item.icon className="w-4 h-4" strokeWidth={1.5} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="px-8 py-6 border-t border-border space-y-4">
                  <a href="tel:0714447638" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" strokeWidth={1.5} /> 0714 447 638
                  </a>
                  <a href="tel:0701734251" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" strokeWidth={1.5} /> 0701 734 251
                  </a>
                  <a href="mailto:fynbriz@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" strokeWidth={1.5} /> fynbriz@gmail.com
                  </a>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs text-muted-foreground">Currency:</span>
                    <CurrencySelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Brand */}
          <Link to="/" className="flex-1 flex flex-col items-center justify-center group">
            <span className={`font-heading text-base md:text-xl font-medium leading-none transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
              Fine Breeze
            </span>
            <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.3em] mt-1 transition-colors ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
              Hotel & Restaurant
            </span>
          </Link>

          {/* Right: Nav + Book Now */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors ${isActive(item.to) ? "text-primary" : scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/70"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] font-medium tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 ${scrolled ? "bg-primary text-primary-foreground hover:bg-foreground" : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"}`}
            >
              Book Now
            </a>
          </div>
        </div>
      </header>
    </>
  );
}