import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Star, Mountain, Utensils, Heart, Award, Compass, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LazyImage from "@/components/LazyImage";
import ParallaxImage from "@/components/ParallaxImage";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const VOI_CENTER = [-3.3959, 38.5543];

function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LazyImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" alt="Fine Breeze Hotel Voi" eager priority className="w-full h-full animate-slow-zoom" skeletonClass="bg-background" />
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      </div>
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 bg-background/40 text-primary border-primary/30 text-xs sm:text-sm uppercase tracking-widest px-6 py-2.5 backdrop-blur-md">
            <MapPin className="w-4 h-4 mr-2" /> Voi, Taita Taveta County
          </Badge>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
            <span className="block text-foreground">Our Story</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Fine Breeze Hotel</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            A sanctuary of Kenyan hospitality at the gateway to Tsavo, where the breeze of the Taita Hills meets world-class comfort.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Born in Voi</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-[1.1]">
              Rooted in the Heart<br />of Taita Taveta
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
              Fine Breeze Hotel & Restaurant was born from a simple vision: to create a haven where travelers and locals alike could experience the very best of Kenyan hospitality. Nestled in Voi — a vibrant town at the crossroads of the Nairobi-Mombasa highway and the gateway to Tsavo National Park — our hotel stands as a testament to the warmth and richness of the Taita Taveta region.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
              Our name, "Fine Breeze," was inspired by the cool, refreshing winds that sweep down from the Taita Hills, offering respite from the coastal heat. It is this same breeze — natural, effortless, and welcoming — that we aim to capture in every guest experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              Over the years, we have grown from a modest guesthouse into a full-fledged hotel and restaurant, yet our core values remain unchanged: genuine hospitality, authentic cuisine, and an unwavering commitment to making every guest feel at home.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-border/50 shadow-2xl">
              <ParallaxImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/dbd4a4e59_u.png" alt="Fine Breeze Hotel" skeletonClass="bg-card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    { icon: Heart, title: "Genuine Hospitality", desc: "Every guest is family. We treat each visitor with the warmth and care that defines true Kenyan hospitality." },
    { icon: Leaf, title: "Local & Fresh", desc: "We source the freshest local ingredients, supporting Taita Taveta farmers and serving authentic regional flavors." },
    { icon: Mountain, title: "Gateway to Tsavo", desc: "Perfectly positioned for safaris and adventures into Kenya's largest national park and the surrounding hills." },
    { icon: Award, title: "Uncompromising Quality", desc: "From our rooms to our cuisine, we hold ourselves to the highest standards of comfort and excellence." },
    { icon: Compass, title: "Cultural Heritage", desc: "We celebrate the rich traditions of the Taita, Taveta, and coastal Swahili cultures in everything we do." },
    { icon: Utensils, title: "Culinary Excellence", desc: "Our kitchen blends Kenyan classics with international favorites, crafting memorable dining experiences." },
  ];
  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">What We Stand For</p>
          <h2 className="text-4xl md:text-6xl font-black text-foreground">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 hover:from-primary/40 hover:to-accent/30 transition-all duration-500"
            >
              <div className="rounded-[23px] bg-card/80 backdrop-blur-xl p-8 h-full border border-border/10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Find Us</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Where We Are</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Located in Voi, Taita Taveta County — the gateway to Tsavo National Park and the Taita Hills.
          </p>
        </div>
        <div className="rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl">
          <MapContainer center={VOI_CENTER} zoom={14} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={VOI_CENTER}>
              <Popup>
                <strong>Fine Breeze Hotel & Restaurant</strong><br />
                Voi, Taita Taveta County, Kenya
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a href="https://www.google.com/maps/search/?api=1&query=Fine+Breeze+Hotel+Voi+Kenya" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl px-8 h-12">
              <MapPin className="w-5 h-5 mr-2" /> Open in Google Maps
            </Button>
          </a>
          <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20directions%20to%20the%20hotel." target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 h-12">
              <MessageCircle className="w-5 h-5 mr-2" /> Get Directions via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "5k+", label: "Happy Guests" },
    { value: "4.9★", label: "Average Rating" },
    { value: "24/7", label: "Premium Service" },
  ];
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--primary-foreground))_1px,_transparent_1px)] bg-[length:32px_32px] opacity-[0.03]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-primary-foreground mb-2">{s.value}</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-primary-foreground/70 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-6">Visit Us Today</p>
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-[1.1]">
          Experience the<br />Fine Breeze Difference
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Whether you're passing through Voi, planning a safari, or seeking a tranquil getaway, we'd love to welcome you.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking." target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 py-7 text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300">
              <MessageCircle className="w-6 h-6 mr-3" /> Book via WhatsApp
            </Button>
          </a>
          <Link to="/Rooms">
            <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-10 py-7 text-lg rounded-2xl">
              Explore Rooms <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-primary-foreground">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <StatsSection />
      <LocationMap />
      <CTASection />
    </div>
  );
}