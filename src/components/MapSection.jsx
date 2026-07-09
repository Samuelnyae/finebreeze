import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
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
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="kemp-label text-primary mb-5">Visit Us</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal mb-5">Find Your Way to Fine Breeze</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Located in Voi, Taita Taveta County — the gateway to Tsavo National Park and the beautiful Taita Hills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] overflow-hidden">
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

          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <MapPin className="w-5 h-5 text-primary mb-3" strokeWidth={1.5} />
              <h3 className="font-heading text-lg mb-2">Our Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Voi Town<br />
                Taita Taveta County<br />
                Kenya
              </p>
            </div>
            <div className="flex-1 pt-6 border-t border-border">
              <Phone className="w-5 h-5 text-primary mb-3" strokeWidth={1.5} />
              <h3 className="font-heading text-lg mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:0714447638" className="block hover:text-primary transition-colors">0714 447 638</a>
                <a href="tel:0701734251" className="block hover:text-primary transition-colors">0701 734 251</a>
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              <a href="https://www.google.com/maps/search/?api=1&query=Fine+Breeze+Hotel+Voi+Kenya" target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center justify-center gap-2 w-full border border-border text-foreground px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all">
                  <Navigation className="w-4 h-4" strokeWidth={1.5} /> Google Maps
                </span>
              </a>
              <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20directions%20to%20the%20hotel." target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-all">
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Get Directions
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}