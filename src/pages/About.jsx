import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Mountain, Utensils, Heart, Award, Compass, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LazyImage from "@/components/LazyImage";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const VOI_CENTER = [-3.3959, 38.5543];

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LazyImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" alt="Fine Breeze Hotel swimming pool and grounds at sunset in Voi, Kenya" eager priority className="w-full h-full animate-slow-zoom" skeletonClass="bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 z-10" />
      </div>
      <div className="relative z-20 w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
            <p className="kemp-label text-white/70 mb-5">Voi, Taita Taveta County</p>
            <h1 className="font-heading text-4xl md:text-6xl font-normal leading-[1.1] mb-5 text-white max-w-3xl">
              Our Story
              <span className="block italic font-light text-white/90 mt-1">Fine Breeze Hotel</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl font-light leading-relaxed">
              A sanctuary of Kenyan hospitality at the gateway to Tsavo, where the breeze of the Taita Hills meets world-class comfort.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="kemp-label text-primary mb-5">Born in Voi</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal mb-8 leading-[1.2]">
              Rooted in the Heart<br />of Taita Taveta
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Fine Breeze Hotel & Restaurant was born from a simple vision: to create a haven where travelers and locals alike could experience the very best of Kenyan hospitality. Nestled in Voi — a vibrant town at the crossroads of the Nairobi-Mombasa highway and the gateway to Tsavo National Park — our hotel stands as a testament to the warmth and richness of the Taita Taveta region.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Our name, "Fine Breeze," was inspired by the cool, refreshing winds that sweep down from the Taita Hills, offering respite from the coastal heat. It is this same breeze — natural, effortless, and welcoming — that we aim to capture in every guest experience.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Over the years, we have grown from a modest guesthouse into a full-fledged hotel and restaurant, yet our core values remain unchanged: genuine hospitality, authentic cuisine, and an unwavering commitment to making every guest feel at home.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative aspect-[4/3]"
          >
            <LazyImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/dbd4a4e59_u.png" alt="Fine Breeze Hotel & Restaurant building exterior in Voi, Taita Taveta County, Kenya" eager className="w-full h-full" skeletonClass="bg-muted" />
          </motion.div>
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
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="kemp-label text-primary mb-5">What We Stand For</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-foreground p-8 md:p-10"
            >
              <v.icon className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-heading text-xl mb-3">{v.title}</h3>
              <p className="text-background/60 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
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
    <section className="py-16 md:py-20 bg-primary">
      <div className="max-w-5xl mx-auto px-6">
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
              <div className="font-heading text-4xl md:text-5xl text-primary-foreground mb-2">{s.value}</div>
              <div className="kemp-label text-primary-foreground/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="kemp-label text-primary mb-5">Find Us</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal mb-5">Where We Are</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Located in Voi, Taita Taveta County — the gateway to Tsavo National Park and the Taita Hills.
          </p>
        </div>
        <div className="h-[400px] overflow-hidden">
          <MapContainer center={VOI_CENTER} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
            <Marker position={VOI_CENTER}>
              <Popup><strong>Fine Breeze Hotel & Restaurant</strong><br />Voi, Taita Taveta County, Kenya</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a href="https://www.google.com/maps/search/?api=1&query=Fine+Breeze+Hotel+Voi+Kenya" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 border border-border px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all">
              <MapPin className="w-4 h-4" strokeWidth={1.5} /> Open in Google Maps
            </span>
          </a>
          <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20directions%20to%20the%20hotel." target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-all">
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Get Directions via WhatsApp
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8061288ba_9.png" alt="Fine Breeze Hotel lobby and entrance in Voi, Kenya" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="kemp-label text-white/70 mb-6">Visit Us Today</p>
          <h2 className="font-heading text-4xl md:text-6xl font-normal text-white mb-6 leading-[1.2]">
            Experience the<br />Fine Breeze Difference
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Whether you're passing through Voi, planning a safari, or seeking a tranquil getaway, we'd love to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking." target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Book via WhatsApp
              </span>
            </a>
            <Link to="/Rooms">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                Explore Rooms <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <StatsSection />
      <LocationMap />
      <CTASection />
    </div>
  );
}