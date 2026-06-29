import { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Phone, Mail, MapPin, MapPinned, CalendarCheck, Utensils, Send, Loader2, CheckCircle2, MessageCircle } from "lucide-react";

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
      setDone(true);
      setForm({ name: "", email: "", phone: "", category: "General Info", message: "" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Badge className="mb-6 bg-background/40 text-primary border-primary/30 uppercase tracking-widest px-5 py-2">
            <MapPin className="w-4 h-4 mr-2" /> Voi, Kenya
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Whether it's a reservation, an event, or a general inquiry — our team at Fine Breeze is ready to welcome you.
          </p>
        </div>
      </section>

      {/* Direct Inquiry */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-3">Direct Inquiry</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">Call Us Directly</h2>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedElement>
              <a href="tel:0714447638" className="group block bg-card rounded-3xl border border-border/50 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <CalendarCheck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">Reservations</h3>
                <p className="text-sm text-muted-foreground mb-4">Book your stay with our reservations desk.</p>
                <span className="text-2xl font-black text-primary flex items-center gap-2">
                  <Phone className="w-5 h-5" /> 0714 447 638
                </span>
              </a>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <a href="tel:0701734251" className="group block bg-card rounded-3xl border border-border/50 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Utensils className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-1">The Restaurant</h3>
                <p className="text-sm text-muted-foreground mb-4">Dining reservations and restaurant inquiries.</p>
                <span className="text-2xl font-black text-primary flex items-center gap-2">
                  <Phone className="w-5 h-5" /> 0701 734 251
                </span>
              </a>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-3">Location</p>
                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Find Us in Voi</h2>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">P.O. Box 228-80300</p>
                    <p className="text-lg text-muted-foreground">Voi, Kenya</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Voi%2C%20Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-12 px-8">
                    <MapPinned className="w-5 h-5 mr-2" /> View on Map
                  </Button>
                </a>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <div className="rounded-3xl overflow-hidden border border-border/50 shadow-2xl h-80 lg:h-96">
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

      {/* Social & Digital */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-14">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-3">Social & Digital</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground">Email Us</h2>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedElement>
              <a href="mailto:fynbriz@gmail.com" className="group block bg-card rounded-3xl border border-border/50 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">General Info</h3>
                <p className="text-sm text-muted-foreground mb-4">Questions, feedback, and general inquiries.</p>
                <span className="text-lg font-bold text-primary flex items-center gap-2 break-all">
                  fynbriz@gmail.com
                </span>
              </a>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <a href="mailto:fynbriz@gmail.com" className="group block bg-card rounded-3xl border border-border/50 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-1">Events & Weddings</h3>
                <p className="text-sm text-muted-foreground mb-4">Plan your special occasion with us.</p>
                <span className="text-lg font-bold text-primary flex items-center gap-2 break-all">
                  fynbriz@gmail.com
                </span>
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
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-3">Send an Inquiry</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will get back to you shortly.</p>
            </div>
          </AnimatedElement>

          {done ? (
            <AnimatedElement>
              <div className="bg-card rounded-3xl border border-border/50 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-black mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">Your inquiry has been received. We'll be in touch soon.</p>
                <Button onClick={() => setDone(false)} variant="outline" className="rounded-xl">
                  Send Another Inquiry
                </Button>
              </div>
            </AnimatedElement>
          ) : (
            <AnimatedElement>
              <form onSubmit={submit} className="bg-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-5">
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
                  <Button type="submit" disabled={saving} className="flex-1 h-12 rounded-xl text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                    {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                    {saving ? "Sending…" : "Send Inquiry"}
                  </Button>
                  <a href="https://wa.me/254714447638?text=Hello%20Fine%20Breeze%2C%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button type="button" variant="outline" className="w-full h-12 rounded-xl text-base font-bold border-primary/40 text-primary hover:bg-primary/10">
                      <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
                    </Button>
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