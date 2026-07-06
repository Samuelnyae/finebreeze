import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LazyImage from "@/components/LazyImage";

export default function ParallaxImage({ src, alt, className, skeletonClass, eager, height = "120%" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div style={{ y, height }} className="w-full">
        <LazyImage src={src} alt={alt} eager={eager} skeletonClass={skeletonClass} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}