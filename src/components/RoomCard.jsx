import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";

export default function RoomCard({ room, index = 0, formatPrice }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-[#1e1e1e] rounded-2xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={room.image_url}
          alt={`${room.name} — ${room.room_type || "room"} at Fine Breeze Hotel in Voi, Kenya`}
          className="w-full h-full"
          skeletonClass="bg-white/5"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
          {room.capacity || 2} Guests
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {room.room_type && (
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#c0a080] mb-2">
            {room.room_type}
          </p>
        )}
        <h3 className="font-heading text-xl text-white mb-3 leading-tight">{room.name}</h3>
        {room.description && (
          <p className="text-[#b0b0b0] text-sm leading-relaxed line-clamp-3 mb-5">{room.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c0a080] mb-1">
              Starting From
            </p>
            <p className="text-white font-bold text-lg leading-none">
              {formatPrice(room.price_per_night || 0)}
            </p>
          </div>
          <Link
            to="/Booking"
            className="flex items-center justify-center w-11 h-11 bg-[#c5b69c] text-[#1d2120] rounded-full hover:bg-[#b5a68c] transition-colors"
            aria-label={`Book ${room.name}`}
          >
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}