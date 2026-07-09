import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const LOGO_URL = "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02538d30c_generated_image.png";

export default function Footer() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* Brand row */}
        <div className="flex flex-col items-center text-center mb-14 pb-14 border-b border-background/10">
          <img src={LOGO_URL} alt="Fine Breeze Hotel" className="w-14 h-14 rounded-full object-cover mb-4" />
          <h2 className="font-heading text-2xl mb-1">Fine Breeze</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-background/50">Hotel & Restaurant · Voi, Kenya</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About */}
          <div className="md:col-span-1">
            <p className="text-background/60 text-sm leading-relaxed">
              Where luxury meets the spirit of Kenya. Experience world-class hospitality in the heart of Voi, Taita Taveta County.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-background/50 hover:text-primary transition-colors"><Facebook className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-background/50 hover:text-primary transition-colors"><Instagram className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-background/50 hover:text-primary transition-colors"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-background/50 hover:text-primary transition-colors"><TikTokIcon className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="kemp-label text-background/40 mb-5">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/70 text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/Rooms" className="text-background/70 text-sm hover:text-primary transition-colors">Rooms & Suites</Link></li>
              <li><Link to="/Restaurant" className="text-background/70 text-sm hover:text-primary transition-colors">Restaurant & Menu</Link></li>
              <li><Link to="/Gallery" className="text-background/70 text-sm hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/About" className="text-background/70 text-sm hover:text-primary transition-colors">About Us</Link></li>
              {isAdmin && <li><Link to="/Admin" className="text-background/70 text-sm hover:text-primary transition-colors">Admin Dashboard</Link></li>}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="kemp-label text-background/40 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0714447638" className="flex items-start gap-2.5 text-background/70 text-sm hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} /> 0714 447 638
                </a>
              </li>
              <li>
                <a href="tel:0701734251" className="flex items-start gap-2.5 text-background/70 text-sm hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} /> 0701 734 251
                </a>
              </li>
              <li>
                <a href="mailto:fynbriz@gmail.com" className="flex items-start gap-2.5 text-background/70 text-sm hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} /> fynbriz@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-background/70 text-sm">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span>Voi, Taita Taveta County, Kenya</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Book Directly */}
          <div>
            <h4 className="kemp-label text-background/40 mb-5">Reservations</h4>
            <p className="text-background/60 text-sm mb-5 leading-relaxed">
              Get instant confirmation and best rates when you book directly with us via WhatsApp.
            </p>
            <a
              href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Book Now
            </a>
            <p className="text-xs text-background/40 mt-4">Available 24/7 for inquiries</p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <p className="text-background/40 text-xs">
            &copy; {new Date().getFullYear()} Fine Breeze Hotel & Restaurant, Voi, Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}