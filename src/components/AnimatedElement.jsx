import { motion } from "framer-motion";

const variants = {
  "fade-up": { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
  "fade-down": { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
  "fade-left": { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
  "scale-in": { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
  "blur-in": { hidden: { opacity: 0, filter: "blur(14px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
};

export default function AnimatedElement({ children, className, delay = 0, variant = "fade-up" }) {
  const v = variants[variant] || variants["fade-up"];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={v}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}