import { motion } from "framer-motion";

export default function PageHero({ image, label, title, titleAccent, subtitle, children }) {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {image ? (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" loading="eager" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/75 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-10" />
          <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(var(--background) / 0.7) 100%)" }} />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-secondary">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
        </div>
      )}
      {/* Warm accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[150px] pointer-events-none z-10" />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          {/* Luxury label with divider lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-primary/50" />
            <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-primary/90">{label}</span>
            <span className="h-px w-10 bg-primary/50" />
          </div>

          {/* Elegant serif heading */}
          <h1 className="font-heading font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6 text-foreground">
            {title}
            {titleAccent && <span className="block text-primary/90 italic font-light">{titleAccent}</span>}
          </h1>

          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">{subtitle}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}