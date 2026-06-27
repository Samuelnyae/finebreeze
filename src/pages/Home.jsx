import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, Wifi, Coffee, Utensils, Car, Wind, Tv, ChevronRight, ArrowRight, MessageCircle, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/4ba5a5b13_generated_dc80709f.png"
          alt="Fine Breeze Hotel Voi Kenya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
      </div>
      {/* 3D floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" style={{ animation: "floatC 9s ease-in-out 1s infinite" }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-xs uppercase tracking-widest px-4 py-2 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" /> Voi, Taita Taveta County, Kenya
          </Badge>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="block text-foreground">Where the</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Fine Breeze</span>
            <span className="block text-foreground">Blows Free</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A luxury hotel & restaurant nestled at the foot of the Taita Hills. Experience world-class hospitality, authentic Kenyan cuisine, and breathtaking landscapes in the heart of Voi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 py-6 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-5 h-5 mr-2" />
                Book via WhatsApp
              </Button>
            </a>
            <Link to="/Rooms">
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-semibold text-base px-8 py-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                Explore Rooms <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            {[["4.9★", "Guest Rating"], ["50+", "Rooms"], ["15+", "Menu Items"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-primary">{val}</div>
                <div className="text-xs tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div style={{ animation: "bounce 2s infinite" }} className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi", desc: "Seamless connectivity throughout" },
    { icon: Utensils, label: "Fine Restaurant", desc: "Authentic Kenyan & International cuisine" },
    { icon: Wind, label: "Climate Control", desc: "Premium AC in every room" },
    { icon: Coffee, label: "Room Service", desc: "24/7 in-room dining" },
    { icon: Car, label: "Free Parking", desc: "Secure on-site parking" },
    { icon: Tv, label: "Smart TV", desc: "Premium entertainment system" },
  ];
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">World-Class Facilities</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every detail thoughtfully crafted for your ultimate comfort and pleasure in Voi.</p>
          </div>
        </AnimatedElement>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((a, i) => (
            <AnimatedElement key={a.label} delay={i * 80}>
              <div className="p-px rounded-xl bg-gradient-to-br from-primary/30 via-transparent to-accent/20 hover:from-primary/50 hover:to-accent/40 transition-all duration-500 group">
                <div className="rounded-xl bg-card p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <a.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{a.label}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomsSection() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    base44.entities.Room.list().then(setRooms).catch(() => {});
  }, []);
  const staticFallback = [
    { name: "Savanna Deluxe", description: "Spacious room with panoramic Taita Hills views, king-size bed and marble bathroom.", price_per_night: 8500, capacity: 2, room_type: "Deluxe", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png" },
    { name: "Taita Hills Suite", description: "Our flagship suite with floor-to-ceiling windows, soaking tub and butler service.", price_per_night: 15000, capacity: 2, room_type: "Suite", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" },
    { name: "Garden Twin", description: "Charming twin room with tropical garden views, Kenyan cultural décor.", price_per_night: 5500, capacity: 3, room_type: "Standard", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png" },
  ];
  const items = rooms.length > 0 ? rooms.slice(0, 3) : staticFallback;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Accommodations</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Our Rooms & Suites</h2>
            </div>
            <Link to="/Rooms">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                View All Rooms <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((room, i) => (
            <AnimatedElement key={room.name} delay={i * 100}>
              <div className="group rounded-2xl overflow-hidden bg-card border border-border hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-primary/15 text-primary text-xs border-0">{room.room_type}</Badge>
                    <span className="text-accent font-bold text-sm">KES {(room.price_per_night || 0).toLocaleString()}/night</span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{room.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{room.description}</p>
                  <a href={`https://wa.me/254714447638?text=Hello%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}%20room.`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                      <MessageCircle className="w-4 h-4 mr-2" /> Book Now
                    </Button>
                  </a>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function RestaurantSection() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    base44.entities.MenuItem.list().then(setMenuItems).catch(() => {});
  }, []);
  const staticFallback = [
    { name: "Nyama Choma Platter", description: "Tender slow-roasted goat meat with ugali and kachumbari salad.", price: 1200, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png", is_featured: true },
    { name: "Swahili Seafood Feast", description: "Fresh coastal prawns in coconut-tamarind sauce with saffron pilau rice.", price: 1800, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/709942548_generated_71a76177.png", is_featured: true },
    { name: "Taita Spice Chicken", description: "Charcoal-grilled chicken in Taita spice blend with sweet potato wedges.", price: 1100, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png", is_featured: true },
  ];
  const featured = menuItems.filter(m => m.is_featured).slice(0, 3);
  const items = featured.length > 0 ? featured : staticFallback;

  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Our Restaurant</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                A Culinary Journey<br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Through Kenya</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our kitchen celebrates the rich tapestry of Kenyan flavours — from the coastal Swahili traditions to the hearty Taita region specialties. Every dish tells a story of heritage, crafted with the freshest local ingredients.
              </p>
              <Link to="/Restaurant">
                <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                  Full Menu <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png" alt="Fine Breeze Restaurant" className="w-full h-full object-cover" />
            </div>
          </div>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedElement key={item.name} delay={i * 100}>
              <div className="group bg-card rounded-xl overflow-hidden border border-border hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-400">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <Badge className="bg-accent/15 text-accent text-xs border-0 mb-2">{item.category}</Badge>
                  <h3 className="font-bold text-card-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  <span className="text-primary font-bold">KES {(item.price || 0).toLocaleString()}</span>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedElement>
            <div className="relative">
              <div className="rounded-tl-3xl rounded-br-3xl overflow-hidden aspect-[4/3]">
                <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" alt="Fine Breeze Pool" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-card border border-border rounded-xl p-6 shadow-2xl backdrop-blur-sm">
                <div className="text-3xl font-black text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Born from the Spirit<br />of Voi
              </h2>
              <div className="border-l-4 border-primary pl-6 mb-6">
                <p className="text-lg italic text-muted-foreground">
                  "We built Fine Breeze to be a sanctuary where the warmth of Kenyan hospitality meets world-class luxury."
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nestled at the gateway to Tsavo, in the heart of Taita Taveta County, Fine Breeze Hotel & Restaurant was conceived as a beacon of excellence in Voi. Our story is one of passion for Kenya's remarkable natural beauty and deep respect for its cultural heritage.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From the sweeping Taita Hills views to our carefully curated menu of local and international dishes, every experience at Fine Breeze is designed to connect you with the soul of Kenya while surrounding you with uncompromising comfort.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[["500+", "Happy Guests"], ["15+", "Menu Items"], ["4.9★", "Rating"]].map(([val, label]) => (
                  <div key={label} className="text-center p-4 bg-secondary rounded-xl">
                    <div className="text-2xl font-black text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    base44.entities.Testimonial.list().then(setTestimonials).catch(() => {});
  }, []);
  const staticFallback = [
    { guest_name: "James & Sarah Omondi", review: "Fine Breeze exceeded every expectation. The views of the Taita Hills from our suite were absolutely breathtaking, and the Nyama Choma is the best we've had!", rating: 5, country: "Kenya", stay_type: "Honeymoon Suite" },
    { guest_name: "Dr. Amelia Thompson", review: "An extraordinary oasis in the heart of Voi. The staff were warm and the Swahili Seafood Feast was a revelation. Highly recommended!", rating: 5, country: "United Kingdom", stay_type: "Deluxe Room" },
    { guest_name: "Mohamed Al-Rashid", review: "Outstanding hospitality. Immaculate rooms, world-class food, and the Taita Hills backdrop is truly magical. Fine Breeze sets the gold standard.", rating: 5, country: "UAE", stay_type: "Executive Suite" },
  ];
  const items = testimonials.length > 0 ? testimonials.slice(0, 3) : staticFallback;

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">Guest Experiences</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">What Our Guests Say</h2>
          </div>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <AnimatedElement key={t.guest_name} delay={i * 100}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-accent/20 h-full">
                <div className="bg-card rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: Math.round(t.rating || 5) }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6 italic">"{t.review}"</p>
                  <div className="border-t border-border pt-4">
                    <div className="font-bold text-card-foreground text-sm">{t.guest_name}</div>
                    <div className="text-xs text-muted-foreground">{t.stay_type} · {t.country}</div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-background/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <AnimatedElement>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-4">Limited Availability</p>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Ready for Your Fine Breeze Experience?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Book directly via WhatsApp for the best rates and instant confirmation. Our team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 py-6 text-base hover:scale-105 transition-all duration-300 shadow-xl shadow-accent/30">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/15 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp: 0714 447 638
              </Button>
            </a>
            <a href="mailto:fynbriz@gmail.com">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6 text-base font-semibold">
                <Mail className="w-5 h-5 mr-2" /> Email Us
              </Button>
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 0714 447 638</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 0701 734 251</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> fynbriz@gmail.com</span>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function GallerySection() {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    base44.entities.GalleryImage.list().then(setGallery).catch(() => {});
  }, []);
  const staticFallback = [
    { title: "Infinity Pool at Sunset", category: "Facilities", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" },
    { title: "Fine Dining Restaurant", category: "Restaurant", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png" },
    { title: "Hotel Exterior", category: "Property", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/4ba5a5b13_generated_dc80709f.png" },
    { title: "Taita Hills Suite", category: "Rooms", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" },
  ];
  const items = gallery.length > 0 ? gallery : staticFallback;

  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-accent mb-3">Visual Tour</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Gallery</h2>
          </div>
        </AnimatedElement>
        <AnimatedElement>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((img, i) => (
              <div key={img.title} className={`group rounded-xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""} aspect-square hover:scale-[1.02] transition-transform duration-500`}>
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AmenitiesSection />
      <RoomsSection />
      <RestaurantSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <CTASection />
    </div>
  );
}