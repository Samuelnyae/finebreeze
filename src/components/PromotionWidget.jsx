import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import LazyImage from "@/components/LazyImage";

export default function PromotionWidget() {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    base44.entities.Promotion.list().then((items) => {
      const active = items.find((p) => p.is_active !== false) || items[0];
      setPromo(active || null);
    }).catch(() => {});
    const unsub = base44.entities.Promotion.subscribe(() => {
      base44.entities.Promotion.list().then((items) => {
        const active = items.find((p) => p.is_active !== false) || items[0];
        setPromo(active || null);
      }).catch(() => {});
    });
    return unsub;
  }, []);

  if (!promo) return null;

  const ctaLink = promo.cta_link || `https://wa.me/254714447638?text=${encodeURIComponent("Hello Fine Breeze, I'm interested in your special offer: " + promo.title)}`;
  const isWhatsApp = ctaLink.includes("wa.me");

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] md:h-[480px]">
        {promo.image_url ? (
          <LazyImage src={promo.image_url} alt={`Special offer: ${promo.title} at Fine Breeze Hotel in Voi, Kenya`} eager className="w-full h-full" skeletonClass="bg-muted" />
        ) : (
          <div className="w-full h-full bg-foreground" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-10 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-lg"
            >
              {promo.badge_label && (
                <p className="kemp-label text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /> {promo.badge_label}
                </p>
              )}
              <h2 className="font-heading text-3xl md:text-5xl font-normal text-white mb-5 leading-[1.2]">{promo.title}</h2>
              {promo.description && (
                <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">{promo.description}</p>
              )}
              <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  {isWhatsApp ? <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> : null}
                  {promo.cta_text || "View Offer"} <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}