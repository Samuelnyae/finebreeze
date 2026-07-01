import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, Users, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import AnimatedElement from "@/components/AnimatedElement";
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
        <AnimatedElement>
          <div className="max-w-lg w-full bg-card rounded-3xl border border-border/50 shadow-2xl p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-3">Booking Received!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you, {success.guest_name}. We've received your booking request for <strong>{success.room_name}</strong> ({success.nights} night{success.nights !== 1 ? "s" : ""}). Our team will confirm shortly.
            </p>
            <div className="bg-secondary rounded-2xl p-6 mb-8 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Check-in</span><span className="font-semibold">{success.check_in}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Check-out</span><span className="font-semibold">{success.check_out}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span className="font-semibold">{success.guests}</span></div>
              <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="text-muted-foreground">Estimated Total</span><span className="font-black text-primary text-lg">{formatPrice(success.total_price || 0)}</span></div>
            </div>
            <a href={`https://wa.me/254714447638?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 mb-3">
                <MessageCircle className="w-5 h-5 mr-2" /> Confirm on WhatsApp
              </Button>
            </a>
            <Button variant="outline" className="w-full" onClick={() => { setSuccess(null); setForm({ guest_name: "", email: "", phone: "", check_in: "", check_out: "", room_name: "", guests: 2, special_requests: "" }); }}>
              Make Another Booking
            </Button>
          </div>
        </AnimatedElement>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8df5bf0be_generated_image.png" alt="Book Your Stay" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <AnimatedElement>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Reservations</p>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-5">Book Your Stay</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto font-light">
              Reserve directly through our website for instant confirmation, or complete your booking via WhatsApp.
            </p>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedElement>
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border/50 shadow-xl p-8 md:p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guest_name">Full Name *</Label>
                  <Input id="guest_name" required value={form.guest_name} onChange={(e) => update("guest_name", e.target.value)} placeholder="John Doe" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0712 345 678" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label>Room / Suite</Label>
                <Select value={form.room_name} onValueChange={(v) => update("room_name", v)}>
                  <SelectTrigger className="h-12"><SelectValue placeholder="Select a room" /></SelectTrigger>
                  <SelectContent>
                    {(rooms.length > 0 ? rooms : [{ name: "Savanna Deluxe", price_per_night: 8500 }, { name: "Taita Hills Suite", price_per_night: 15000 }, { name: "Garden Twin", price_per_night: 5500 }]).map((r) => (
                      <SelectItem key={r.name} value={r.name}>{r.name} — {formatPrice(r.price_per_night || 0)}/night</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="check_in" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Check-in *</Label>
                  <Input id="check_in" type="date" required value={form.check_in} onChange={(e) => update("check_in", e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check_out" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Check-out *</Label>
                  <Input id="check_out" type="date" required value={form.check_out} onChange={(e) => update("check_out", e.target.value)} className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2"><Users className="w-4 h-4" /> Number of Guests</Label>
                <Input id="guests" type="number" min="1" max="10" value={form.guests} onChange={(e) => update("guests", e.target.value)} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="special_requests">Special Requests</Label>
                <Textarea id="special_requests" value={form.special_requests} onChange={(e) => update("special_requests", e.target.value)} placeholder="Airport pickup, dietary needs, early check-in, etc." rows={3} />
              </div>

              {nights > 0 && selectedRoom && (
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Nights</span><span className="font-semibold">{nights}</span></div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Rate</span><span className="font-semibold">{formatPrice(selectedRoom.price_per_night || 0)}/night</span></div>
                  <div className="flex justify-between border-t border-primary/20 pt-2"><span className="font-bold">Estimated Total</span><span className="font-black text-primary text-xl">{formatPrice(total)}</span></div>
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl">
                {submitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting…</> : "Confirm Booking"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting, you'll receive a confirmation. You can also confirm instantly via WhatsApp.
              </p>
            </form>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}