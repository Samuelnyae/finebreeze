import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
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
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10"
        >
          {promo.image_url ? (
            <div className="relative">
              <LazyImage src={promo.image_url} alt={promo.title} eager className="h-[280px] md:h-[340px]" skeletonClass="bg-muted" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="p-8 md:p-14 max-w-xl">
                  {promo.badge_label && (
                    <Badge className="mb-4 bg-accent/20 text-accent border border-accent/30 backdrop-blur-md uppercase tracking-wider text-xs font-bold">
                      <Sparkles className="w-3 h-3 mr-1.5" /> {promo.badge_label}
                    </Badge>
                  )}
                  <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">{promo.title}</h2>
                  {promo.description && (
                    <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">{promo.description}</p>
                  )}
                  <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-13 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent/20">
                      {isWhatsApp ? <MessageCircle className="w-5 h-5 mr-2" /> : null}
                      {promo.cta_text || "Claim Offer"} <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-secondary p-8 md:p-14">
              {promo.badge_label && (
                <Badge className="mb-4 bg-accent/20 text-accent border border-accent/30 uppercase tracking-wider text-xs font-bold">
                  <Sparkles className="w-3 h-3 mr-1.5" /> {promo.badge_label}
                </Badge>
              )}
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">{promo.title}</h2>
              {promo.description && (
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">{promo.description}</p>
              )}
              <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-13 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent/20">
                  {isWhatsApp ? <MessageCircle className="w-5 h-5 mr-2" /> : null}
                  {promo.cta_text || "Claim Offer"} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}