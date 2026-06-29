import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Utensils, Wine, Coffee, Cake, Salad } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";

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

  useEffect(() => {
    base44.entities.MenuItem.list()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const all = items.length > 0 ? items : staticFallback;
  const filtered = filter === "All" ? all : all.filter((m) => m.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/db37a39df_generated_image.png" alt="Food & Drinks" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <AnimatedElement>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Fine Dining</p>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-5">Our Restaurant & Menu</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              A culinary journey through Kenya — from coastal Swahili traditions to hearty Taita specialties, plus a curated minibar.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === c.key ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                <c.icon className="w-4 h-4" /> {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading menu…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item, i) => (
                <AnimatedElement key={item.name + i} delay={i * 80}>
                  <div className="group bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(var(--accent)/0.2)] transition-all duration-500 flex flex-col h-full">
                    {item.image_url ? (
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md text-foreground border-0 px-3 py-1">{item.category}</Badge>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                        <Wine className="w-16 h-16 text-primary/30" />
                        <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md text-foreground border-0 px-3 py-1">{item.category}</Badge>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-black text-card-foreground mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{item.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</span>
                        <span className="text-2xl font-black text-primary">KES {(item.price || 0).toLocaleString()}</span>
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