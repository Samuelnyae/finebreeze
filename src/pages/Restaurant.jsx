import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Utensils, Wine, Coffee, Cake, Salad } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { useCurrency } from "@/lib/CurrencyContext";
import PageHero from "@/components/PageHero";

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
    <div className="bg-background min-h-screen">
      <PageHero
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/db37a39df_generated_image.png"
        label="Fine Dining"
        title="Restaurant & Menu"
        titleAccent="A Taste of Kenya"
        subtitle="A culinary journey through Kenya — from coastal Swahili traditions to hearty Taita specialties, plus a curated minibar."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                  filter === c.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                <c.icon className="w-3.5 h-3.5" strokeWidth={1.5} /> {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading menu…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.name + i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group"
                >
                  {item.image_url ? (
                    <div className="relative aspect-[4/3] overflow-hidden mb-5">
                      <LazyImage src={item.image_url} alt={`${item.name} — ${item.category} at Fine Breeze Hotel Restaurant in Voi, Kenya`} className="group-hover:scale-105 transition-transform duration-[1200ms] ease-out" skeletonClass="bg-muted" />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-secondary flex items-center justify-center mb-5">
                      <Wine className="w-12 h-12 text-muted-foreground/30" strokeWidth={1} />
                    </div>
                  )}
                  <p className="kemp-label text-primary mb-2">{item.category}</p>
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="font-heading text-xl">{item.name}</h3>
                    <span className="font-heading text-lg text-foreground shrink-0">{formatPrice(item.price || 0)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}