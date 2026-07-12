import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PageHero({ image, label, title, titleAccent, subtitle, children, fullScreen = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className={`relative ${fullScreen ? "min-h-[100dvh]" : "min-h-[65vh] md:min-h-[70vh]"} flex items-end overflow-hidden`}>
      {image ? (
        <motion.div style={fullScreen ? { y } : undefined} className="absolute inset-0 z-0 bg-black">
          <img src={image} alt={title ? `${title} — Fine Breeze Hotel Voi, Kenya` : "Fine Breeze Hotel Voi, Kenya"} loading="eager" decoding="async" fetchpriority="high" className="w-full h-full object-contain" />

        </motion.div>
      ) : (
        <div className="absolute inset-0 z-0 bg-foreground" />
      )}

      <motion.div style={fullScreen ? { opacity } : undefined} className="relative z-20 w-full px-6 md:px-10 pb-14 md:pb-20 pt-32">
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
      </motion.div>
    </section>
  );
}