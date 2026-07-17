import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, Users, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useCurrency } from "@/lib/CurrencyContext";

export default function Booking() {
  const location = useLocation();
  const passed = location.state || {};
  const [rooms, setRooms] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const { formatPrice } = useCurrency();
  const [form, setForm] = useState({
    guest_name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
    room_name: passed.roomName || "",
    guests: 2,
    special_requests: "",
  });

  useEffect(() => {
    base44.entities.Room.list().then(setRooms).catch(() => {});
  }, []);

  const nights = (() => {
    if (!form.check_in || !form.check_out) return 0;
    const diff = new Date(form.check_out) - new Date(form.check_in);
    return Math.max(0, Math.round(diff / 86400000));
  })();

  const selectedRoom = rooms.find((r) => r.name === form.room_name) || (passed.roomName ? { price_per_night: passed.price, room_type: passed.roomType } : null);
  const total = nights * (selectedRoom?.price_per_night || 0);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        guests: Number(form.guests),
        room_type: selectedRoom?.room_type || passed.roomType || "",
        nights,
        total_price: total,
        status: "pending",
      };
      await base44.entities.Booking.create(payload);
      setSuccess(payload);
    } catch (err) {
      alert(err.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const waText = success
    ? `Hello Fine Breeze, I just submitted a booking online:\nName: ${success.guest_name}\nRoom: ${success.room_name}\nCheck-in: ${success.check_in}\nCheck-out: ${success.check_out}\nGuests: ${success.guests}\nNights: ${success.nights}\nTotal: KES ${success.total_price?.toLocaleString()}`
    : `Hello Fine Breeze, I would like to make a booking.`;

  if (success) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg w-full bg-card border border-border p-10 md:p-12 text-center"
        >
          <div className="w-20 h-20 border border-primary flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-3xl mb-3">Booking Received!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thank you, {success.guest_name}. We've received your booking request for <strong>{success.room_name}</strong> ({success.nights} night{success.nights !== 1 ? "s" : ""}). Our team will confirm shortly.
          </p>
          <div className="bg-secondary p-6 mb-8 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-medium">{success.check_in}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-medium">{success.check_out}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-medium">{success.guests}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-medium">Estimated Total</span><span className="font-heading text-xl text-primary">{formatPrice(success.total_price || 0)}</span></div>
          </div>
          <a href={`https://wa.me/254714447638?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="block mb-3">
            <span className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-accent transition-all">
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Confirm on WhatsApp
            </span>
          </a>
          <button onClick={() => { setSuccess(null); setForm({ guest_name: "", email: "", phone: "", check_in: "", check_out: "", room_name: "", guests: 2, special_requests: "" }); }} className="kemp-link">
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        image="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8df5bf0be_generated_image.png"
        label="Reservations"
        title="Book Your Stay"
        titleAccent="Reserve Your Escape"
        subtitle="Reserve directly through our website for instant confirmation, or complete your booking via WhatsApp."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border p-8 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="guest_name">Full Name *</Label>
                <Input id="guest_name" required value={form.guest_name} onChange={(e) => update("guest_name", e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0712 345 678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Room / Suite</Label>
              <Select value={form.room_name} onValueChange={(v) => update("room_name", v)}>
                <SelectTrigger><SelectValue placeholder="Select a room" /></SelectTrigger>
                <SelectContent>
                  {(rooms.length > 0 ? rooms : [{ name: "Savanna Deluxe", price_per_night: 8500 }, { name: "Taita Hills Suite", price_per_night: 15000 }, { name: "Garden Twin", price_per_night: 5500 }]).map((r) => (
                    <SelectItem key={r.name} value={r.name}>{r.name} — {formatPrice(r.price_per_night || 0)}/night</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="check_in" className="flex items-center gap-2"><Calendar className="w-4 h-4" strokeWidth={1.5} /> Check-in *</Label>
                <Input id="check_in" type="date" required value={form.check_in} onChange={(e) => update("check_in", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check_out" className="flex items-center gap-2"><Calendar className="w-4 h-4" strokeWidth={1.5} /> Check-out *</Label>
                <Input id="check_out" type="date" required value={form.check_out} onChange={(e) => update("check_out", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests" className="flex items-center gap-2"><Users className="w-4 h-4" strokeWidth={1.5} /> Number of Guests</Label>
              <Input id="guests" type="number" min="1" max="10" value={form.guests} onChange={(e) => update("guests", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="special_requests">Special Requests</Label>
              <Textarea id="special_requests" value={form.special_requests} onChange={(e) => update("special_requests", e.target.value)} placeholder="Airport pickup, dietary needs, early check-in, etc." rows={3} />
            </div>

            {nights > 0 && selectedRoom && (
              <div className="bg-secondary p-5 border-l-2 border-primary">
                <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Nights</span><span className="font-medium">{nights}</span></div>
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Rate</span><span className="font-medium">{formatPrice(selectedRoom.price_per_night || 0)}/night</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="font-medium">Estimated Total</span><span className="font-heading text-xl text-primary">{formatPrice(total)}</span></div>
              </div>
            )}

            <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} /> Submitting…</> : "Confirm Booking"}
            </button>
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <a
              href={`https://wa.me/254714447638?text=${encodeURIComponent("Hello Fine Breeze, I would like to make a booking.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 border border-green-600/40 text-green-700 bg-green-50 px-6 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-green-100 transition-all"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Book via WhatsApp
            </a>
          </motion.form>
        </div>
      </section>
    </div>
  );
}