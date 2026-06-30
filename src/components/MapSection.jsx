import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const VOI_CENTER = [-3.3959, 38.5543];

export default function MapSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Visit Us</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">Find Your Way to Fine Breeze</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Located in Voi, Taita Taveta County — the gateway to Tsavo National Park and the beautiful Taita Hills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl h-[400px]">
            <MapContainer center={VOI_CENTER} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
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

          <div className="flex flex-col gap-4">
            <div className="bg-card rounded-2xl border border-border/50 p-6 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-card-foreground mb-2">Our Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Voi Town<br />
                Taita Taveta County<br />
                Kenya
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/50 p-6 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-card-foreground mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:0714447638" className="block hover:text-primary transition-colors">0714 447 638</a>
                <a href="tel:0701734251" className="block hover:text-primary transition-colors">0701 734 251</a>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://www.google.com/maps/search/?api=1&query=Fine+Breeze+Hotel+Voi+Kenya" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary/10 rounded-xl h-12">
                  <Navigation className="w-4 h-4 mr-2" /> Google Maps
                </Button>
              </a>
              <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20directions%20to%20the%20hotel." target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-12">
                  <MessageCircle className="w-4 h-4 mr-2" /> Get Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}