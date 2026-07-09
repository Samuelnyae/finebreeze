import { motion } from "framer-motion";

export default function PageHero({ image, label, title, titleAccent, subtitle, children }) {
  return (
    <section className="relative min-h-[65vh] md:min-h-[70vh] flex items-end overflow-hidden">
      {image ? (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" loading="eager" decoding="async" fetchpriority="high" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-foreground" />
      )}

      <div className="relative z-20 w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {label && (
              <p className="kemp-label text-white/70 mb-5">{label}</p>
            )}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-5 text-white max-w-3xl">
              {title}
              {titleAccent && <span className="block italic font-light text-white/90 mt-1">{titleAccent}</span>}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-white/70 max-w-xl font-light leading-relaxed">{subtitle}</p>
            )}
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}