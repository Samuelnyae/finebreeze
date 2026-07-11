import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Utensils, Wine, Cake, Salad } from "lucide-react";
import { useCurrency } from "@/lib/CurrencyContext";
import PageHero from "@/components/PageHero";
import MenuCard from "@/components/MenuCard";

const staticFallback = [
  { name: "Nyama Choma Platter", description: "Tender slow-roasted goat meat with ugali and kachumbari salad.", price: 1200, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png", is_featured: true },
  { name: "Swahili Seafood Feast", description: "Fresh coastal prawns in coconut-tamarind sauce with saffron pilau rice.", price: 1800, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/709942548_generated_71a76177.png", is_featured: true },
  { name: "Taita Spice Chicken", description: "Charcoal-grilled chicken in Taita spice blend with sweet potato wedges.", price: 1100, category: "Main Course", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png", is_featured: true },
  { name: "Tusker Lager", description: "Kenya's iconic crisp lager, served ice cold.", price: 350, category: "Minibar", image_url: "", is_featured: false },
  { name: "Fresh Mango Juice", description: "Hand-pressed local mango, no added sugar.", price: 300, category: "Minibar", image_url: "", is_featured: false },
  { name: "Dawa Cocktail", description: "Vodka, honey, lime — Kenya's signature cocktail.", price: 700, category: "Minibar", image_url: "", is_featured: false },
];

const categories = [
  { key: "All", label: "All", icon: Utensils },
  { key: "Starter", label: "Starters", icon: Salad },
  { key: "Main Course", label: "Main Courses", icon: Utensils },
  { key: "Dessert", label: "Desserts", icon: Cake },
  { key: "Minibar", label: "Minibar & Drinks", icon: Wine },
];

export default function Restaurant() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    base44.entities.MenuItem.list().then(setItems).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const all = items.length > 0 ? items : staticFallback;
  const filtered = filter === "All" ? all : all.filter((m) => m.category === filter);

  return (
    <div className="bg-[#000000] min-h-screen">
      <PageHero
        fullScreen
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/db37a39df_generated_image.png"
        label="Fine Dining"
        title="Restaurant & Menu"
        titleAccent="A Taste of Kenya"
        subtitle="A culinary journey through Kenya — from coastal Swahili traditions to hearty Taita specialties, plus a curated minibar."
      />

      <section className="py-16 md:py-24 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-full ${
                  filter === c.key
                    ? "bg-[#c5b69c] text-black"
                    : "bg-[#1a1a1a] text-white/60 hover:text-white"
                }`}
              >
                <c.icon className="w-3.5 h-3.5" strokeWidth={1.5} /> {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-white/40">Loading menu…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((item, i) => (
                <MenuCard key={item.name + i} item={item} index={i} formatPrice={formatPrice} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}