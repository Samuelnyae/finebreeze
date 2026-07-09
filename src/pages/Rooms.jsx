import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useCurrency } from "@/lib/CurrencyContext";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";

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

  return (
    <div className="bg-[#1a1b1a] min-h-screen">
      <PageHero
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png"
        label="Accommodations"
        title="Rooms & Suites"
        titleAccent="Comfort Redefined"
        subtitle="Each room at Fine Breeze is a sanctuary of comfort, blending modern luxury with authentic Kenyan charm."
      />

      <section className="py-16 md:py-24 bg-[#1a1b1a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border rounded-lg ${
                  filter === t
                    ? "bg-[#82c91e] text-black border-[#82c91e]"
                    : "bg-transparent text-white/60 border-white/15 hover:border-white/40 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-white/50">Loading rooms…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((room, i) => (
                <RoomCard key={room.name + i} room={room} index={i} formatPrice={formatPrice} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}