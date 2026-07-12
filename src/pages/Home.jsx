import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Star, ArrowRight, ChevronLeft, ChevronRight, X, MessageCircle, Mail, Phone, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PromotionWidget from "@/components/PromotionWidget";
import MapSection from "@/components/MapSection";
import LazyImage from "@/components/LazyImage";
import RoomCard from "@/components/RoomCard";
import { useCurrency } from "@/lib/CurrencyContext";
import { useCachedEntity } from "@/hooks/useCachedEntity";

const heroImages = [
  "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/dbd4a4e59_u.png",
  "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8061288ba_9.png",
  "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fef98d97e_7.png",
  "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02cdb469c_8.png",
];

const WA_LINK = "https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20would%20like%20to%20make%20a%20booking.";

function Hero() {
  const [idx, setIdx] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0 bg-black">
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Fine Breeze Hotel & Restaurant exterior and interior views in Voi, Kenya — luxury accommodation slide ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={i === 0 ? "high" : "auto"}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[2000ms]"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}

      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] mb-8 text-white">
            Experience Comfort
            <span className="block italic font-light text-white/90">in the Heart of Voi</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Where Kenyan warmth meets timeless luxury. Rooms, dining, and events crafted for the discerning traveller.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/Booking">
              <span className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <CalendarCheck className="w-4 h-4" strokeWidth={1.5} /> Book Your Stay
              </span>
            </Link>
            <Link to="/Rooms">
              <span className="kemp-link text-white border border-white/30 px-8 py-3.5 hover:bg-white/10 transition-all">
                Explore Rooms <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-[2px] transition-all duration-500 ${i === idx ? "w-10 bg-white" : "w-5 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="kemp-label text-primary mb-6">Voi · Taita Taveta County</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.3] mb-8">
            Explore the city in style and comfort by staying at the best luxury hotel in Voi.
            Offering the perfect fusion of European luxury and Kenyan hospitality,
            the hotel is a unique destination for both business and leisure.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Enjoy our elegant rooms and suites, exceptional restaurant, and warm hospitality — all at the gateway to Tsavo.
          </p>
          <Link to="/About" className="kemp-link">
            Hotel Details <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function RoomsSection() {
  const { items: rooms } = useCachedEntity("Room");
  const { formatPrice } = useCurrency();
  const items = rooms.slice(0, 3);

  return (
    <section className="bg-foreground text-background py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="kemp-label text-primary mb-5">Accommodations</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal mb-6 leading-[1.2]">
              Rooms & Suites
            </h2>
            <p className="text-background/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Each room at Fine Breeze is a sanctuary of comfort, blending modern luxury with authentic Kenyan charm. Enjoy beautifully designed spaces with premium amenities and stunning views.
            </p>
            <Link to="/Rooms" className="kemp-link text-background">
              Discover More <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative aspect-[4/5] md:aspect-[3/4]"
          >
            <LazyImage
              src={items[0]?.image_url || "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png"}
              alt="Luxury room interior at Fine Breeze Hotel in Voi, Kenya with premium bedding and modern amenities"
              eager
              className="w-full h-full"
              skeletonClass="bg-background/10"
            />
          </motion.div>
        </div>

        {/* Room cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} formatPrice={formatPrice} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RestaurantSection() {
  const { items: menuItems } = useCachedEntity("MenuItem");
  const { formatPrice } = useCurrency();
  const items = menuItems.filter((m) => m.is_featured).slice(0, 3);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] md:aspect-square order-2 lg:order-1"
          >
            {/* Colored offset shadow block */}
            <div className="absolute -bottom-5 -right-5 w-full h-full bg-primary/20" aria-hidden="true" />
            {/* Floating 5-Star badge */}
            <div className="absolute -top-4 -left-4 z-10 bg-background px-4 py-2.5 flex items-center gap-1.5 shadow-xl">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="w-3 h-3 fill-primary text-primary" />
              ))}
              <span className="text-xs font-medium tracking-wide ml-1.5 text-foreground">5-Star</span>
            </div>
            <LazyImage
              src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png"
              alt="Fine Breeze Hotel restaurant dining area in Voi, Kenya serving Kenyan and international cuisine"
              eager
              className="relative w-full h-full"
              skeletonClass="bg-muted"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="kemp-label text-primary mb-5">Restaurant & Bar</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal mb-6 leading-[1.2]">
              A Culinary Journey<br />Through Kenya
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Our kitchen celebrates the rich tapestry of Kenyan flavours — from coastal Swahili traditions to hearty Taita region specialties. Every dish tells a story of heritage, crafted with the freshest local ingredients.
            </p>
            <Link to="/Restaurant" className="kemp-link">
              Explore Full Menu <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Featured dishes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-[#1f2321]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={item.image_url}
                  alt={item.name}
                  className="group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  skeletonClass="bg-black/20"
                />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-white mb-4">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8899a6]">Price</span>
                  <span className="text-white font-bold text-sm">{formatPrice(item.price || 0)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/5]"
          >
            {/* Decorative offset glow */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/25 blur-3xl rounded-full" aria-hidden="true" />
            <div className="relative w-full h-full">
              <LazyImage
                src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png"
                alt="Fine Breeze Hotel swimming pool and outdoor facilities at sunset in Voi, Kenya"
                eager
                className="w-full h-full"
                skeletonClass="bg-muted"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="kemp-label text-primary mb-5">Our Story</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal mb-6 leading-[1.2]">
              Born from the<br />Spirit of Voi
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Nestled at the gateway to Tsavo, in the heart of Taita Taveta County, Fine Breeze Hotel & Restaurant was conceived as a beacon of excellence in Voi. Our story is one of passion for Kenya's remarkable natural beauty and deep respect for its cultural heritage.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              From the sweeping Taita Hills views to our carefully curated menu of local and international dishes, every experience at Fine Breeze is designed to connect you with the soul of Kenya while surrounding you with uncompromising comfort.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[["10+", "Years"], ["5k+", "Happy Guests"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-heading text-2xl md:text-3xl text-primary mb-1">{val}</div>
                  <div className="kemp-label text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/About" className="kemp-link">
                Read Our Story <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { items: testimonials } = useCachedEntity("Testimonial");
  const items = testimonials.length > 0 ? testimonials : [
    { guest_name: "Sarah K.", review: "An absolutely wonderful stay. The rooms were immaculate, the food was incredible, and the staff went above and beyond. The perfect base for our Tsavo safari.", rating: 5, country: "United Kingdom", stay_type: "Deluxe Room" },
    { guest_name: "James M.", review: "Fine Breeze exceeded all expectations. The Nyama Choma was the best I've had in Kenya, and the views of the Taita Hills are breathtaking.", rating: 5, country: "Kenya", stay_type: "Suite" },
    { guest_name: "Emma L.", review: "A hidden gem in Voi. The hospitality is warm and genuine, the rooms are comfortable and beautifully designed. We'll definitely be back.", rating: 5, country: "Australia", stay_type: "Garden Twin" },
  ];
  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="kemp-label text-primary mb-6">Guest Experiences</p>
          <h2 className="font-heading text-3xl md:text-5xl font-normal mb-16">What Our Guests Say</h2>
        </motion.div>

        <div className="relative">
          {reviewIdx > 0 && (
            <button onClick={() => setReviewIdx((i) => i - 1)} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 text-background/40 hover:text-primary transition-colors">
              <ChevronLeft className="w-8 h-8" strokeWidth={1} />
            </button>
          )}
          {reviewIdx < items.length - 1 && (
            <button onClick={() => setReviewIdx((i) => i + 1)} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 text-background/40 hover:text-primary transition-colors">
              <ChevronRight className="w-8 h-8" strokeWidth={1} />
            </button>
          )}

          <motion.div
            key={reviewIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: Math.round(items[reviewIdx]?.rating || 5) }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="font-heading text-xl md:text-3xl font-normal italic leading-relaxed mb-10 text-background/90">
              "{items[reviewIdx]?.review}"
            </p>
            <div>
              <p className="font-medium text-base mb-1">{items[reviewIdx]?.guest_name}</p>
              <p className="kemp-label text-background/40">{items[reviewIdx]?.stay_type} · {items[reviewIdx]?.country}</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setReviewIdx(i)}
              className={`h-[2px] transition-all duration-300 ${i === reviewIdx ? "w-8 bg-primary" : "w-4 bg-background/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { items: gallery } = useCachedEntity("GalleryImage");
  const items = gallery.slice(0, 6);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="kemp-label text-primary mb-5">Visual Tour</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal mb-6">A Glimpse of Paradise</h2>
          <Link to="/Gallery" className="kemp-link">
            View Full Gallery <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((img, i) => (
            <motion.div
              key={img.title + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setLightbox(img)}
              className={`group relative overflow-hidden cursor-pointer ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
            >
              <LazyImage src={img.image_url} alt={img.title} className="group-hover:scale-105 transition-transform duration-[1200ms] ease-out" skeletonClass="bg-muted" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <div>
                  <p className="kemp-label text-white/70 mb-1">{img.category}</p>
                  <h3 className="font-heading text-white text-lg">{img.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-10" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <LazyImage src={lightbox.image_url} alt={lightbox.title} eager className="max-h-[80vh] object-contain" skeletonClass="bg-muted" />
            <div className="text-center mt-4">
              <p className="kemp-label text-white/50 mb-2">{lightbox.category}</p>
              <h3 className="font-heading text-white text-xl">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02cdb469c_8.png')" }}
          role="img"
          aria-label="Fine Breeze Hotel & Restaurant building exterior in Voi, Taita Taveta County, Kenya"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      </div>
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="kemp-label text-white/70 mb-6">Ready for Your Stay?</p>
          <h2 className="font-heading text-4xl md:text-6xl font-normal text-white mb-6 leading-[1.2]">
            Experience the<br />Fine Breeze Difference
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Book directly via WhatsApp for the best rates and instant confirmation. Our hospitality team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> WhatsApp: 0714 447 638
              </span>
            </a>
            <a href="mailto:fynbriz@gmail.com">
              <span className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300">
                <Mail className="w-4 h-4" strokeWidth={1.5} /> Email Us
              </span>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
            <a href="tel:0714447638" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} /> 0714 447 638
            </a>
            <a href="tel:0701734251" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.5} /> 0701 734 251
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <PromotionWidget />
      <IntroSection />
      <RoomsSection />
      <RestaurantSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <MapSection />
      <CTASection />
    </div>
  );
}