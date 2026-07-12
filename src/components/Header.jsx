import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Phone, Mail, Home as HomeIcon, BedDouble, Utensils, Images, Info, CalendarCheck, Phone as PhoneIcon, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import CurrencySelector from "@/components/CurrencySelector";

const LOGO_URL = "https://media.base44.com/images/public/6a430e1bc280ec2de39f8442/b7041c0be_02538d30c_generated_image.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const isActive = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/Rooms", label: "Rooms" },
    { to: "/Restaurant", label: "Dining" },
    { to: "/Gallery", label: "Gallery" },
    { to: "/About", label: "About" },
    { to: "/Contact", label: "Contact" },
    ...(isAdmin ? [{ to: "/Admin", label: "Admin" }] : []),
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="hidden">
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-r border-white/10 w-full sm:w-[420px] p-0 flex flex-col">
              <div className="flex items-center gap-3 px-8 h-16 md:h-20 border-b border-white/10">
                <img src={LOGO_URL} alt="Fine Breeze Hotel & Restaurant logo" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-heading text-lg leading-none text-white">Fine Breeze</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 mt-0.5">Hotel & Restaurant</div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto px-8 py-8">
                <p className="kemp-label text-white/40 mb-6">Navigation</p>
                <div className="space-y-1">
                  {mobileNavItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 py-3.5 border-b border-white/10 text-sm transition-colors ${isActive(item.to) ? "text-[#c5b69c]" : "text-white hover:text-[#c5b69c]"}`}
                    >
                      <item.icon className="w-4 h-4" strokeWidth={1.5} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="px-8 py-6 border-t border-white/10 space-y-4">
                <a href="tel:0714447638" className="flex items-center gap-3 text-sm text-white/60 hover:text-[#c5b69c] transition-colors">
                  <Phone className="w-4 h-4" strokeWidth={1.5} /> 0714 447 638
                </a>
                <a href="tel:0701734251" className="flex items-center gap-3 text-sm text-white/60 hover:text-[#c5b69c] transition-colors">
                  <Phone className="w-4 h-4" strokeWidth={1.5} /> 0701 734 251
                </a>
                <a href="mailto:fynbriz@gmail.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-[#c5b69c] transition-colors">
                  <Mail className="w-4 h-4" strokeWidth={1.5} /> fynbriz@gmail.com
                </a>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-white/40">Currency:</span>
                  <CurrencySelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-3 group" aria-label="Fine Breeze Hotel & Restaurant — Home">
            <img
              src={LOGO_URL}
              alt="Fine Breeze Hotel & Restaurant — luxury hotel in Voi, Kenya"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-1 ring-white/20"
            />
            <div className="hidden sm:block">
              <div className="font-heading text-base md:text-lg leading-none text-white">Fine Breeze</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-white/40 mt-0.5">Hotel & Restaurant · Voi</div>
            </div>
          </Link>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[11px] font-medium tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-colors ${
                isActive(item.to)
                  ? "bg-[#c5b69c] text-black"
                  : "text-white hover:text-[#c5b69c]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Book Stay button + Hamburger menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/Booking"
            className="hidden sm:inline-flex items-center gap-2 bg-[#c5b69c] text-black px-5 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-[#b5a68c] transition-colors"
          >
            <CalendarCheck className="w-4 h-4" strokeWidth={1.5} /> Book Stay
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden flex items-center gap-2 text-white">
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </header>
  );
}