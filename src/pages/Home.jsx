import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
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
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className || ""}`}>
      {children}
    </div>
  );
};

function GlobalStyles() {
  return (
    <style>{`
      @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(4deg); } }
      @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(-3deg); } }
      @keyframes floatC { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -52%) scale(1.05); } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes gradient-x { 0%, 100% { background-size: 200% 200%; background-position: left center; } 50% { background-size: 200% 200%; background-position: right center; } }
      @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
      @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-12px); } 60% { transform: translateY(-6px); } }
      .text-glow { text-shadow: 0 0 20px hsl(var(--primary) / 0.3); }
    `}</style>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
        <img
          src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/4ba5a5b13_generated_dc80709f.png"
          alt="Fine Breeze Hotel Voi Kenya"
          className="w-full h-full object-cover"
          style={{ animation: "slowZoom 25s ease-in-out infinite alternate" }}
        />
      </div>

      {/* 3D floating orbs */}
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-10" style={{ animation: "floatA 10s ease-in-out infinite" }} />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none z-10" style={{ animation: "floatB 8s ease-in-out 2s infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-10" style={{ animation: "floatC 12s ease-in-out 1s infinite" }} />

      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto w-full pt-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <Badge className="mb-8 bg-background/40 text-primary border-primary/30 text-xs sm:text-sm uppercase tracking-widest px-6 py-2.5 backdrop-blur-md shadow-xl shadow-primary/5 hover:bg-background/60 transition-colors cursor-default">
            <MapPin className="w-4 h-4 mr-2" /> Voi, Taita Taveta County, Kenya
          </Badge>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
            <span className="block text-foreground mb-2">Where the</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x text-glow pb-2">Fine Breeze</span>
            <span className="block text-foreground">Blows Free</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            A luxury hotel & restaurant nestled at the foot of the Taita Hills. Experience world-class hospitality, authentic Kenyan cuisine, and breathtaking landscapes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href={`https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-10 py-7 shadow-[0_0_40px_-10px_hsl(var(--accent))] hover:shadow-[0_0_60px_-15px_hsl(var(--accent))] hover:scale-105 active:scale-95 transition-all duration-300 rounded-2xl">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-6 h-6 mr-3" />
                Book via WhatsApp
              </Button>
            </a>
            <Link to="/Rooms" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 font-semibold text-lg px-10 py-7 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 rounded-2xl shadow-xl shadow-black/20">
                Explore Rooms <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 sm:gap-16 mt-20 text-sm">
            {[["4.9★", "Guest Rating"], ["50+", "Luxury Rooms"], ["15+", "Menu Items"]].map(([val, label], i) => (
              <motion.div 
                key={label} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.6 + (i * 0.2) }}
                className="text-center group"
              >
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">{val}</div>
                <div className="text-xs sm:text-sm tracking-widest uppercase text-muted-foreground font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div style={{ animation: "bounce 2s infinite" }} className="w-7 h-12 border-2 border-primary/40 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi", desc: "Seamless connectivity throughout the entire property." },
    { icon: Utensils, label: "Fine Restaurant", desc: "Authentic Kenyan & International cuisine crafted daily." },
    { icon: Wind, label: "Climate Control", desc: "Premium AC and natural ventilation in every room." },
    { icon: Coffee, label: "Room Service", desc: "24/7 in-room dining for your absolute convenience." },
    { icon: Car, label: "Free Parking", desc: "Secure, monitored on-site parking for all our guests." },
    { icon: Tv, label: "Smart Entertainment", desc: "Premium screens with international streaming services." },
  ];
  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">World-Class Facilities</p>
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">Everything You Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">Every detail thoughtfully crafted for your ultimate comfort and pleasure during your stay in Voi.</p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a, i) => (
            <AnimatedElement key={a.label} delay={i * 100}>
              <div className="p-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 hover:from-primary/50 hover:to-accent/40 transition-all duration-700 group h-full shadow-lg shadow-background/5">
                <div className="rounded-[23px] bg-card/80 backdrop-blur-xl p-8 h-full hover:-translate-y-2 transition-transform duration-500 flex flex-col items-start border border-border/10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                    <a.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{a.label}</h3>
                  <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
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
    { name: "Savanna Deluxe", description: "Spacious room with panoramic Taita Hills views, king-size bed, luxury linens, and a stunning marble bathroom.", price_per_night: 8500, capacity: 2, room_type: "Deluxe", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png" },
    { name: "Taita Hills Suite", description: "Our flagship suite featuring floor-to-ceiling windows, a deep soaking tub, private terrace, and personal butler service.", price_per_night: 15000, capacity: 2, room_type: "Suite", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" },
    { name: "Garden Twin", description: "Charming twin room overlooking our lush tropical gardens, featuring vibrant Kenyan cultural décor and modern amenities.", price_per_night: 5500, capacity: 3, room_type: "Standard", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png" },
  ];
  const items = rooms.length > 0 ? rooms.slice(0, 3) : staticFallback;

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Accommodations</p>
              <h2 className="text-5xl md:text-6xl font-black text-foreground">Our Rooms & Suites</h2>
            </div>
            <Link to="/Rooms">
              <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl px-8">
                View All Rooms <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((room, i) => (
            <AnimatedElement key={room.name} delay={i * 150}>
              <div className="group rounded-[2rem] overflow-hidden bg-card border border-border/50 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.2)] transition-all duration-500 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-0 px-4 py-1.5 text-sm font-bold shadow-xl">
                      {room.room_type}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 relative">
                  <div className="absolute -top-8 right-8 z-20 bg-primary text-primary-foreground font-black px-6 py-3 rounded-xl shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    KES {(room.price_per_night || 0).toLocaleString()} <span className="text-xs font-normal opacity-80">/night</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-card-foreground mb-3 pr-24">{room.name}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3 flex-1">{room.description}</p>
                  
                  <a href={`https://wa.me/254714447638?text=Hello%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}%20room.`} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden h-14 rounded-xl text-base font-bold group/btn shadow-lg shadow-accent/20">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                      <MessageCircle className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" /> Reserve Now
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
    <section className="py-32 bg-muted relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Our Restaurant</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-[1.1]">
                A Culinary Journey<br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">Through Kenya</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-light border-l-4 border-primary/50 pl-6">
                Our kitchen celebrates the rich tapestry of Kenyan flavours — from the coastal Swahili traditions to the hearty Taita region specialties. Every dish tells a story of heritage, crafted with the freshest local ingredients.
              </p>
              <Link to="/Restaurant">
                <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl px-10 h-14 text-lg">
                  Explore Full Menu <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-border/50 shadow-2xl">
                <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png" alt="Fine Breeze Restaurant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <AnimatedElement key={item.name} delay={i * 150}>
              <div className="group bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(var(--accent)/0.2)] transition-all duration-500 flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 opacity-60" />
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md text-foreground border-0 px-3 py-1 font-semibold">
                    {item.category}
                  </Badge>
                </div>
                <div className="p-8 flex flex-col flex-1 relative z-20 -mt-6 bg-card rounded-t-[2rem]">
                  <h3 className="text-2xl font-black text-card-foreground mb-3">{item.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Price</span>
                    <span className="text-2xl font-black text-primary">KES {(item.price || 0).toLocaleString()}</span>
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

function AboutSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedElement>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] border-4 border-background shadow-2xl">
                <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" alt="Fine Breeze Pool" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="absolute -bottom-10 -right-4 md:-right-10 bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl group-hover:-translate-y-4 transition-transform duration-500">
                <div className="text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">10+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <div className="pl-0 lg:pl-10 mt-16 lg:mt-0">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Our Story</p>
              <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8 leading-[1.1]">
                Born from the Spirit<br />of Voi
              </h2>
              
              <div className="relative mb-10">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20 -z-10" />
                <p className="text-2xl italic text-foreground/90 font-light leading-relaxed pl-6 border-l-4 border-primary">
                  "We built Fine Breeze to be a sanctuary where the warmth of Kenyan hospitality meets world-class luxury."
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                Nestled at the gateway to Tsavo, in the heart of Taita Taveta County, Fine Breeze Hotel & Restaurant was conceived as a beacon of excellence in Voi. Our story is one of passion for Kenya's remarkable natural beauty and deep respect for its cultural heritage.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-light">
                From the sweeping Taita Hills views to our carefully curated menu of local and international dishes, every experience at Fine Breeze is designed to connect you with the soul of Kenya while surrounding you with uncompromising comfort.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {[["5k+", "Happy Guests"], ["24/7", "Premium Service"], ["4.9★", "Average Rating"]].map(([val, label], i) => (
                  <div key={label} className="text-center p-6 bg-secondary/50 rounded-2xl border border-border/30 hover:bg-secondary transition-colors duration-300 hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-black text-primary">{val}</div>
                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground mt-2">{label}</div>
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
    <section className="py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Guest Experiences</p>
            <h2 className="text-5xl md:text-6xl font-black text-foreground">What Our Guests Say</h2>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <AnimatedElement key={t.guest_name} delay={i * 150}>
              <div className="p-px rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/20 h-full group hover:shadow-[0_20px_40px_-15px_hsl(var(--primary)/0.15)] transition-all duration-500 hover:-translate-y-2">
                <div className="bg-card/90 backdrop-blur-xl rounded-[31px] p-10 h-full flex flex-col border border-border/30">
                  <div className="flex mb-8 gap-1">
                    {Array.from({ length: Math.round(t.rating || 5) }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors duration-500" />
                  <p className="text-foreground/80 text-lg leading-relaxed flex-1 mb-10 font-light italic">"{t.review}"</p>
                  <div className="border-t border-border/50 pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-lg">
                      {t.guest_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-card-foreground text-base mb-1">{t.guest_name}</div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.stay_type} · {t.country}</div>
                    </div>
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
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-20">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Visual Tour</p>
            <h2 className="text-5xl md:text-6xl font-black text-foreground">A Glimpse of Paradise</h2>
          </div>
        </AnimatedElement>
        
        <AnimatedElement>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((img, i) => (
              <div key={img.title} className={`group rounded-[2rem] overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""} aspect-square relative shadow-lg`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Badge className="bg-primary/90 text-primary-foreground border-0 mb-3 backdrop-blur-md">{img.category}</Badge>
                  <h3 className="text-white font-bold text-xl md:text-2xl">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-background/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--primary-foreground))_1px,_transparent_1px)] bg-[length:32px_32px] opacity-[0.03]" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <AnimatedElement>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-foreground/70 mb-6 drop-shadow-sm">Limited Availability</p>
          <h2 className="text-5xl md:text-7xl font-black text-primary-foreground mb-8 leading-[1.1] drop-shadow-lg">
            Ready for Your<br />Fine Breeze Experience?
          </h2>
          <p className="text-primary-foreground/90 text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Book directly via WhatsApp for the best rates and instant confirmation. Our hospitality team is available around the clock to tailor your perfect stay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 font-black px-12 py-8 text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_20px_50px_-15px_hsl(var(--accent))]">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <MessageCircle className="w-6 h-6 mr-3" /> WhatsApp: 0714 447 638
              </Button>
            </a>
            <a href="mailto:fynbriz@gmail.com" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-12 py-8 text-xl font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm">
                <Mail className="w-6 h-6 mr-3" /> Email Us
              </Button>
            </a>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/80 text-sm font-semibold tracking-wider uppercase">
            <span className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-lg backdrop-blur-md border border-primary-foreground/10"><Phone className="w-4 h-4" /> 0714 447 638</span>
            <span className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-lg backdrop-blur-md border border-primary-foreground/10"><Phone className="w-4 h-4" /> 0701 734 251</span>
            <span className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-lg backdrop-blur-md border border-primary-foreground/10"><Mail className="w-4 h-4" /> fynbriz@gmail.com</span>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-primary-foreground">
      <GlobalStyles />
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