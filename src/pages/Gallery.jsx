import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";
import LazyImage from "@/components/LazyImage";

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
    base44.entities.GalleryImage.list()
      .then(setImages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const all = images.length > 0 ? images : staticFallback;
  const categories = ["All", ...new Set(all.map((g) => g.category).filter(Boolean))];
  const filtered = filter === "All" ? all : all.filter((g) => g.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/856595890_generated_image.png" alt="Our Rooms" eager className="w-full h-full" skeletonClass="bg-background" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <AnimatedElement>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Visual Tour</p>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-5">Gallery</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              A glimpse of paradise — explore our rooms, cuisine, and the breathtaking surroundings of Voi.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === c ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading gallery…</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((img, i) => (
                <AnimatedElement key={img.title + i} delay={i * 60}>
                  <div
                    onClick={() => setLightbox(img)}
                    className="group rounded-2xl overflow-hidden cursor-pointer aspect-square relative shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <LazyImage src={img.image_url} alt={img.title} className="group-hover:scale-110 transition-transform duration-1000" skeletonClass="bg-card" />
                    <div className="absolute bottom-0 left-0 p-5 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Badge className="bg-primary/90 text-primary-foreground border-0 mb-2">{img.category}</Badge>
                      <h3 className="text-white font-bold text-lg">{img.title}</h3>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <LazyImage src={lightbox.image_url} alt={lightbox.title} eager className="max-h-[80vh] object-contain rounded-2xl" skeletonClass="bg-muted" />
            <div className="text-center mt-4">
              <Badge className="bg-primary text-primary-foreground border-0 mb-2">{lightbox.category}</Badge>
              <h3 className="text-white font-bold text-xl">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}