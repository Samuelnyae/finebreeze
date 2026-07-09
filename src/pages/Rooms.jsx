import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, MessageCircle, Users, Wifi, Wind, Car, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";
import { useCurrency } from "@/lib/CurrencyContext";
import PageHero from "@/components/PageHero";

const staticFallback = [
  { name: "Savanna Deluxe", description: "Spacious room with panoramic Taita Hills views, king-size bed, luxury linens, and a stunning marble bathroom.", price_per_night: 8500, capacity: 2, room_type: "Deluxe", amenities: "WiFi, AC, Smart TV, Room Service", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png" },
  { name: "Taita Hills Suite", description: "Our flagship suite featuring floor-to-ceiling windows, a deep soaking tub, private terrace, and personal butler service.", price_per_night: 15000, capacity: 2, room_type: "Suite", amenities: "WiFi, AC, Smart TV, Minibar, Butler", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" },
  { name: "Garden Twin", description: "Charming twin room overlooking our lush tropical gardens, featuring vibrant Kenyan cultural décor and modern amenities.", price_per_night: 5500, capacity: 3, room_type: "Standard", amenities: "WiFi, AC, Smart TV", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png" },
];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    base44.entities.Room.list().then(setRooms).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const items = rooms.length > 0 ? rooms : staticFallback;
  const types = ["All", ...new Set(items.map((r) => r.room_type).filter(Boolean))];
  const filtered = filter === "All" ? items : items.filter((r) => r.room_type === filter);

  const amenityIcons = (amenities) => {
    const list = (amenities || "").toLowerCase();
    return [
      { icon: Wifi, show: list.includes("wifi") },
      { icon: Wind, show: list.includes("ac") || list.includes("air") },
      { icon: Coffee, show: list.includes("minibar") || list.includes("room service") },
      { icon: Car, show: list.includes("parking") },
    ].filter((a) => a.show);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png"
        label="Accommodations"
        title="Rooms & Suites"
        titleAccent="Comfort Redefined"
        subtitle="Each room at Fine Breeze is a sanctuary of comfort, blending modern luxury with authentic Kenyan charm."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                  filter === t
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading rooms…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((room, i) => (
                <motion.div
                  key={room.name + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    <LazyImage src={room.image_url} alt={`${room.name} — ${room.room_type} room at Fine Breeze Hotel in Voi, Kenya`} className="group-hover:scale-105 transition-transform duration-[1200ms] ease-out" skeletonClass="bg-muted" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="kemp-label text-primary">{room.room_type}</p>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" strokeWidth={1.5} /> {room.capacity || "—"}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl mb-3">{room.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{room.description}</p>
                  <div className="flex items-center gap-4 mb-5 text-muted-foreground">
                    {amenityIcons(room.amenities).map((a, j) => (
                      <a.icon key={j} className="w-4 h-4" strokeWidth={1.5} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-border">
                    <span className="font-heading text-xl text-foreground">
                      {formatPrice(room.price_per_night || 0)}
                      <span className="text-xs text-muted-foreground font-body ml-1">/ night</span>
                    </span>
                    <Link to="/Booking" state={{ roomName: room.name, roomType: room.room_type, price: room.price_per_night }}>
                      <span className="kemp-link">
                        Book <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}