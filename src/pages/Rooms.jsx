import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, ArrowRight, Wifi, Wind, Car, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedElement from "@/components/AnimatedElement";
import LazyImage from "@/components/LazyImage";
import { useCurrency } from "@/lib/CurrencyContext";

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
    base44.entities.Room.list()
      .then(setRooms)
      .catch(() => {})
      .finally(() => setLoading(false));
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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" alt="Executive Suite" eager className="w-full h-full" skeletonClass="bg-background" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <AnimatedElement>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Accommodations</p>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-5">Our Rooms & Suites</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              Each room at Fine Breeze is a sanctuary of comfort, blending modern luxury with authentic Kenyan charm.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === t ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading rooms…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room, i) => (
                <AnimatedElement key={room.name + i} delay={i * 100}>
                  <div className="group rounded-[2rem] overflow-hidden bg-card border border-border/50 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.2)] transition-all duration-500 h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <LazyImage src={room.image_url} alt={room.name} className="group-hover:scale-110 transition-transform duration-1000" skeletonClass="bg-card" />
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-0 px-4 py-1.5 text-sm font-bold">{room.room_type}</Badge>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1 relative">
                      <div className="absolute -top-8 right-8 z-20 bg-primary text-primary-foreground font-black px-6 py-3 rounded-xl shadow-xl">
                        {formatPrice(room.price_per_night || 0)} <span className="text-xs font-normal opacity-80">/night</span>
                      </div>
                      <h3 className="text-2xl font-black text-card-foreground mb-3 pr-24">{room.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Users className="w-4 h-4 text-primary" /> Sleeps {room.capacity || 2}
                      </div>
                      <p className="text-muted-foreground mb-5 leading-relaxed line-clamp-3 flex-1">{room.description}</p>
                      <div className="flex items-center gap-3 mb-6 text-primary">
                        {amenityIcons(room.amenities).map((a, j) => <a.icon key={j} className="w-5 h-5" />)}
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <Link to="/Booking" state={{ roomName: room.name, roomType: room.room_type, price: room.price_per_night }} className="flex-1">
                          <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl font-bold">
                            Book Now <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <a href={`https://wa.me/254714447638?text=Hello%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}%20room.`} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-4 rounded-xl">
                            <MessageCircle className="w-5 h-5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}