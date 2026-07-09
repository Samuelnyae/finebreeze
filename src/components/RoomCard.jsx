import { motion } from "framer-motion";
import { MessageCircle, Wifi, Tv, Wind } from "lucide-react";
import LazyImage from "@/components/LazyImage";

export default function RoomCard({ room, index = 0, formatPrice }) {
  const waText = `Hello Fine Breeze, I would like to book the ${room.name}${room.room_type ? ` (${room.room_type})` : ""} at ${formatPrice(room.price_per_night || 0)}/night.`;
  const waLink = `https://wa.me/254714447638?text=${encodeURIComponent(waText)}`;

  const amenities = (room.amenities || "").toLowerCase();
  const Icon = amenities.includes("wifi") ? Wifi : amenities.includes("tv") ? Tv : Wind;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-[#1f2220] rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={room.image_url}
          alt={`${room.name} — ${room.room_type || "room"} at Fine Breeze Hotel in Voi, Kenya`}
          className="w-full h-full"
          skeletonClass="bg-white/5"
        />
        {room.room_type && (
          <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 rounded">
            {room.room_type}
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-[#d9c59f] text-black text-xs font-semibold px-4 py-1.5 rounded-full">
          {formatPrice(room.price_per_night || 0)} /night
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-xl text-white mb-2">{room.name}</h3>
        {room.amenities && (
          <p className="text-[#8bb3cf] text-sm mb-4">{room.amenities}</p>
        )}
        <Icon className="w-5 h-5 text-[#8bb3cf] mb-4" strokeWidth={1.5} />
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full bg-[#82c91e] text-black font-semibold text-sm py-3 rounded-lg hover:bg-[#74b816] transition-colors"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} /> Reserve Now
        </a>
      </div>
    </motion.div>
  );
}