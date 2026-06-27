import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-black text-sm">FB</span>
              </div>
              <div>
                <div className="font-black text-background text-lg leading-none">Fine Breeze</div>
                <div className="text-xs text-background/60 leading-none mt-0.5">Hotel & Restaurant</div>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Where luxury meets the spirit of Kenya. Experience world-class hospitality in the heart of Voi, Taita Taveta County.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-background" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-background" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-background" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background text-sm uppercase tracking-widest mb-5 after:block after:w-8 after:h-0.5 after:bg-primary after:mt-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/70 text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/Rooms" className="text-background/70 text-sm hover:text-primary transition-colors">Rooms & Suites</Link></li>
              <li><a href="#" className="text-background/70 text-sm hover:text-primary transition-colors">Restaurant & Menu</a></li>
              <li><a href="#" className="text-background/70 text-sm hover:text-primary transition-colors">Gallery</a></li>
              <li><Link to="/Admin" className="text-background/70 text-sm hover:text-primary transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-background text-sm uppercase tracking-widest mb-5 after:block after:w-8 after:h-0.5 after:bg-primary after:mt-2">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0714447638" className="flex items-center gap-2 text-background/70 text-sm hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" /> 0714 447 638
                </a>
              </li>
              <li>
                <a href="tel:0701734251" className="flex items-center gap-2 text-background/70 text-sm hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" /> 0701 734 251
                </a>
              </li>
              <li>
                <a href="mailto:fynbriz@gmail.com" className="flex items-center gap-2 text-background/70 text-sm hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" /> fynbriz@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-background/70 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Voi, Taita Taveta County<br />Kenya</span>
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-bold text-background text-sm uppercase tracking-widest mb-5 after:block after:w-8 after:h-0.5 after:bg-accent after:mt-2">Book Directly</h4>
            <p className="text-background/70 text-sm mb-5 leading-relaxed">
              Get instant confirmation and best rates when you book directly with us via WhatsApp.
            </p>
            <a
              href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-3 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-4 h-4 mr-2" /> Book Now on WhatsApp
              </Button>
            </a>
            <p className="text-xs text-background/50 text-center">Available 24/7 for inquiries</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-background/50 text-xs">
            &copy; {new Date().getFullYear()} Fine Breeze Hotel & Restaurant, Voi, Kenya. All rights reserved.
          </p>
          <p className="text-background/40 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}