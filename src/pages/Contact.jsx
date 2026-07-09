import { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Phone, Mail, MapPin, MapPinned, CalendarCheck, Utensils, Send, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const AnimatedElement = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "General Info", message: "" });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.ContactMessage.create(form);
      base44.functions.invoke("sendContactAlert", { data: form }).catch(() => {});
      setDone(true);
      setForm({ name: "", email: "", phone: "", category: "General Info", message: "" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        label="Voi, Kenya"
        title="Get in Touch"
        titleAccent="We're Here to Help"
        subtitle="Whether it's a reservation, an event, or a general inquiry — our team at Fine Breeze is ready to welcome you."
      />

      {/* Direct Inquiry */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedElement>
            <div className="text-center mb-14">
              <p className="kemp-label text-primary mb-4">Direct Inquiry</p>
              <h2 className="font-heading text-3xl md:text-5xl font-normal">Call Us Directly</h2>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedElement>
              <a href="tel:0714447638" className="group block bg-card border border-border p-8 md:p-10 hover:border-primary transition-all duration-500 h-full">
                <CalendarCheck className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">Reservations</h3>
                <p className="text-sm text-muted-foreground mb-5">Book your stay with our reservations desk.</p>
                <span className="font-heading text-2xl text-foreground flex items-center gap-2">
                  <Phone className="w-5 h-5" strokeWidth={1.5} /> 0714 447 638
                </span>
              </a>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <a href="tel:0701734251" className="group block bg-card border border-border p-8 md:p-10 hover:border-primary transition-all duration-500 h-full">
                <Utensils className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">The Restaurant</h3>
                <p className="text-sm text-muted-foreground mb-5">Dining reservations and restaurant inquiries.</p>
                <span className="font-heading text-2xl text-foreground flex items-center gap-2">
                  <Phone className="w-5 h-5" strokeWidth={1.5} /> 0701 734 251
                </span>
              </a>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <div>
                <p className="kemp-label text-primary mb-4">Location</p>
                <h2 className="font-heading text-3xl md:text-5xl font-normal mb-6">Find Us in Voi</h2>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-lg font-medium">P.O. Box 228-80300</p>
                    <p className="text-lg text-muted-foreground">Voi, Kenya</p>
                  </div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Voi%2C%20Kenya" target="_blank" rel="noopener noreferrer">
                  <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-all">
                    <MapPinned className="w-4 h-4" strokeWidth={1.5} /> View on Map
                  </span>
                </a>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <div className="h-80 lg:h-96 overflow-hidden">
                <iframe
                  title="Fine Breeze Hotel Location"
                  src="https://www.google.com/maps?q=Voi%2C%20Kenya&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedElement>
            <div className="text-center mb-14">
              <p className="kemp-label text-primary mb-4">Social & Digital</p>
              <h2 className="font-heading text-3xl md:text-5xl font-normal">Email Us</h2>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedElement>
              <a href="mailto:fynbriz@gmail.com" className="group block bg-card border border-border p-8 md:p-10 hover:border-primary transition-all duration-500 h-full">
                <Mail className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">General Info</h3>
                <p className="text-sm text-muted-foreground mb-5">Questions, feedback, and general inquiries.</p>
                <span className="text-base font-medium text-foreground break-all">fynbriz@gmail.com</span>
              </a>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <a href="mailto:fynbriz@gmail.com" className="group block bg-card border border-border p-8 md:p-10 hover:border-primary transition-all duration-500 h-full">
                <Mail className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-heading text-xl mb-2">Events & Weddings</h3>
                <p className="text-sm text-muted-foreground mb-5">Plan your special occasion with us.</p>
                <span className="text-base font-medium text-foreground break-all">fynbriz@gmail.com</span>
              </a>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-12">
              <p className="kemp-label text-primary mb-4">Send an Inquiry</p>
              <h2 className="font-heading text-3xl md:text-5xl font-normal mb-4">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will get back to you shortly.</p>
            </div>
          </AnimatedElement>

          {done ? (
            <AnimatedElement>
              <div className="bg-card border border-border p-10 md:p-12 text-center">
                <div className="w-16 h-16 border border-primary flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">Your inquiry has been received. We'll be in touch soon.</p>
                <button onClick={() => setDone(false)} className="kemp-link">
                  Send Another Inquiry
                </button>
              </div>
            </AnimatedElement>
          ) : (
            <AnimatedElement>
              <form onSubmit={submit} className="bg-card border border-border p-8 md:p-10 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0712 345 678" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(v) => set("category", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reservations">Reservations</SelectItem>
                        <SelectItem value="Events & Weddings">Events & Weddings</SelectItem>
                        <SelectItem value="General Info">General Info</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message *</Label>
                  <Textarea value={form.message} onChange={(e) => set("message", e.target.value)} required rows={5} placeholder="How can we help you?" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> : <Send className="w-4 h-4" strokeWidth={1.5} />}
                    {saving ? "Sending…" : "Send Inquiry"}
                  </button>
                  <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="flex-1">
                    <span className="inline-flex items-center justify-center gap-2 w-full border border-border px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all">
                      <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> WhatsApp Us
                    </span>
                  </a>
                </div>
              </form>
            </AnimatedElement>
          )}
        </div>
      </section>
    </div>
  );
}