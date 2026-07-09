import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { X } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import PageHero from "@/components/PageHero";

const staticFallback = [
  { title: "Infinity Pool at Sunset", category: "Facilities", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png" },
  { title: "Fine Dining Restaurant", category: "Restaurant", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png" },
  { title: "Hotel Exterior", category: "Property", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/4ba5a5b13_generated_dc80709f.png" },
  { title: "Taita Hills Suite", category: "Rooms", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png" },
  { title: "Savanna Deluxe Room", category: "Rooms", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png" },
  { title: "Garden Twin Room", category: "Rooms", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png" },
  { title: "Signature Nyama Choma", category: "Cuisine", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png" },
  { title: "Swahili Seafood Feast", category: "Cuisine", image_url: "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/709942548_generated_71a76177.png" },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.GalleryImage.list().then(setImages).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const all = images.length > 0 ? images : staticFallback;
  const categories = ["All", ...new Set(all.map((g) => g.category).filter(Boolean))];
  const filtered = filter === "All" ? all : all.filter((g) => g.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/856595890_generated_image.png"
        label="Visual Tour"
        title="Gallery"
        titleAccent="A Glimpse of Paradise"
        subtitle="Explore our rooms, cuisine, and the breathtaking surroundings of Voi."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                  filter === c
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading gallery…</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.title + i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => setLightbox(img)}
                  className={`group relative overflow-hidden cursor-pointer ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
                >
                  <LazyImage src={img.image_url} alt={`${img.title} — ${img.category} at Fine Breeze Hotel & Restaurant in Voi, Kenya`} className="group-hover:scale-105 transition-transform duration-[1200ms] ease-out" skeletonClass="bg-muted" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <div>
                      <p className="kemp-label text-white/70 mb-1">{img.category}</p>
                      <h3 className="font-heading text-white text-lg">{img.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-10" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <LazyImage src={lightbox.image_url} alt={`${lightbox.title} — ${lightbox.category} at Fine Breeze Hotel & Restaurant in Voi, Kenya`} eager className="max-h-[80vh] object-contain" skeletonClass="bg-muted" />
            <div className="text-center mt-4">
              <p className="kemp-label text-white/50 mb-2">{lightbox.category}</p>
              <h3 className="font-heading text-white text-xl">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}