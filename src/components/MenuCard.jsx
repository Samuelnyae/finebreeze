import { motion } from "framer-motion";
import { Star, Wine } from "lucide-react";
import LazyImage from "@/components/LazyImage";

export default function MenuCard({ item, index = 0, formatPrice }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image_url ? (
          <LazyImage
            src={item.image_url}
            alt={`${item.name} — ${item.category} at Fine Breeze Hotel Restaurant in Voi, Kenya`}
            className="w-full h-full"
            skeletonClass="bg-white/5"
          />
        ) : (
          <div className="w-full h-full bg-[#222] flex items-center justify-center">
            <Wine className="w-12 h-12 text-white/20" strokeWidth={1} />
          </div>
        )}
        {item.category && (
          <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
            {item.category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-white mb-2 leading-tight">{item.name}</h3>
        {item.description && (
          <p className="text-[#b0b0b0] text-sm leading-relaxed line-clamp-3 mb-5">{item.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-white font-bold text-base">{formatPrice(item.price || 0)}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-[#c0a080] text-[#c0a080]" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}