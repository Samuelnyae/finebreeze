import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { LayoutDashboard, BedDouble, Utensils, CalendarCheck, Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const ADMIN_PASS = "admin";
const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#10b981", "#f59e0b", "#ef4444"];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("dashboard");

  if (!authed) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-sm w-full bg-card rounded-3xl border border-border/50 shadow-2xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
            <LayoutDashboard className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black text-center mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Enter the admin password to continue.</p>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className="h-12 mb-4" onKeyDown={(e) => e.key === "Enter" && setAuthed(pass === ADMIN_PASS)} />
          <Button className="w-full h-12" onClick={() => { if (pass === ADMIN_PASS) setAuthed(true); else alert("Wrong password"); }}>Enter Dashboard</Button>
          <p className="text-xs text-muted-foreground text-center mt-4">Default password: <code className="font-mono">admin</code></p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "rooms", label: "Rooms", icon: BedDouble },
    { key: "menu", label: "Menu Items", icon: Utensils },
    { key: "bookings", label: "Bookings", icon: CalendarCheck },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage rooms, menu, and bookings for Fine Breeze.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.key ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <Dashboard />}
        {tab === "rooms" && <RoomsManager />}
        {tab === "menu" && <MenuManager />}
        {tab === "bookings" && <BookingsManager />}
      </div>
    </div>
  );
}

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [menu, setMenu] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    base44.entities.Room.list().then(setRooms).catch(() => {});
    base44.entities.MenuItem.list().then(setMenu).catch(() => {});
    base44.entities.Booking.list().then(setBookings).catch(() => {});
  }, []);

  const stats = [
    { label: "Total Rooms", value: rooms.length, icon: BedDouble },
    { label: "Menu Items", value: menu.length, icon: Utensils },
    { label: "Bookings", value: bookings.length, icon: CalendarCheck },
    { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Loader2 },
  ];

  const barData = [
    { name: "Home", visits: 1240 },
    { name: "Rooms", visits: 890 },
    { name: "Restaurant", visits: 670 },
    { name: "Gallery", visits: 520 },
    { name: "Booking", visits: 340 },
  ];
  const lineData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({ name: m, revenue: 450000 + i * 120000 + Math.random() * 80000 }));
  const pieData = [
    { name: "Direct", value: 40 },
    { name: "WhatsApp", value: 30 },
    { name: "Google", value: 20 },
    { name: "Social", value: 10 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
            </div>
            <div className="text-3xl font-black text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <h3 className="font-bold mb-4">Page Views</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <h3 className="font-bold mb-4">Revenue Growth (KES)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: "hsl(var(--accent))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <h3 className="font-bold mb-4">Booking Sources</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RoomsManager() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = () => { setLoading(true); base44.entities.Room.list().then(setRooms).finally(() => setLoading(false)); };
  useEffect(load, []);

  const blank = { name: "", description: "", price_per_night: 0, capacity: 2, amenities: "", image_url: "", room_type: "Standard" };

  const save = async (data) => {
    if (editing?.id) await base44.entities.Room.update(editing.id, data);
    else await base44.entities.Room.create(data);
    setOpen(false); setEditing(null); load();
  };

  const remove = async (id) => { if (confirm("Delete this room?")) { await base44.entities.Room.delete(id); load(); } };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">Rooms ({rooms.length})</h2>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild><Button onClick={() => { setEditing(blank); setOpen(true); }}><Plus className="w-4 h-4 mr-2" /> Add Room</Button></DialogTrigger>
          <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{editing?.id ? "Edit Room" : "Add Room"}</DialogTitle></DialogHeader>{editing && <RoomForm initial={editing} onSave={save} />}</DialogContent>
        </Dialog>
      </div>
      {loading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((r) => (
            <div key={r.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {r.image_url && <img src={r.image_url} alt={r.name} className="w-full h-32 object-cover" />}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{r.name}</h3>
                  <Badge>{r.room_type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{r.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-black text-primary">KES {(r.price_per_night || 0).toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => { setEditing(r); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RoomForm({ initial, onSave }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSaving(true); onSave(data).finally(() => setSaving(false)); }} className="space-y-4">
      <div className="space-y-2"><Label>Name</Label><Input value={data.name || ""} onChange={(e) => set("name", e.target.value)} required /></div>
      <div className="space-y-2"><Label>Description</Label><Textarea value={data.description || ""} onChange={(e) => set("description", e.target.value)} rows={2} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Price / night</Label><Input type="number" value={data.price_per_night || 0} onChange={(e) => set("price_per_night", Number(e.target.value))} /></div>
        <div className="space-y-2"><Label>Capacity</Label><Input type="number" value={data.capacity || 1} onChange={(e) => set("capacity", Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Room Type</Label><Input value={data.room_type || ""} onChange={(e) => set("room_type", e.target.value)} /></div>
        <div className="space-y-2"><Label>Amenities</Label><Input value={data.amenities || ""} onChange={(e) => set("amenities", e.target.value)} placeholder="WiFi, AC, TV" /></div>
      </div>
      <div className="space-y-2"><Label>Image URL</Label><Input value={data.image_url || ""} onChange={(e) => set("image_url", e.target.value)} /></div>
      <Button type="submit" disabled={saving} className="w-full">{saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save Room"}</Button>
    </form>
  );
}

function MenuManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const load = () => { setLoading(true); base44.entities.MenuItem.list().then(setItems).finally(() => setLoading(false)); };
  useEffect(load, []);

  const blank = { name: "", description: "", price: 0, category: "Main Course", image_url: "", is_featured: false };
  const save = async (data) => {
    if (editing?.id) await base44.entities.MenuItem.update(editing.id, data);
    else await base44.entities.MenuItem.create(data);
    setOpen(false); setEditing(null); load();
  };
  const remove = async (id) => { if (confirm("Delete this item?")) { await base44.entities.MenuItem.delete(id); load(); } };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">Menu Items ({items.length})</h2>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild><Button onClick={() => { setEditing(blank); setOpen(true); }}><Plus className="w-4 h-4 mr-2" /> Add Item</Button></DialogTrigger>
          <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{editing?.id ? "Edit Item" : "Add Item"}</DialogTitle></DialogHeader>{editing && <MenuForm initial={editing} onSave={save} />}</DialogContent>
        </Dialog>
      </div>
      {loading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((m) => (
            <div key={m.id} className="bg-card rounded-2xl border border-border/50 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{m.name}</h3>
                <div className="flex gap-1"><Badge>{m.category}</Badge>{m.is_featured && <Badge className="bg-accent text-accent-foreground">★</Badge>}</div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{m.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-black text-primary">KES {(m.price || 0).toLocaleString()}</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => { setEditing(m); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuForm({ initial, onSave }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSaving(true); onSave(data).finally(() => setSaving(false)); }} className="space-y-4">
      <div className="space-y-2"><Label>Name</Label><Input value={data.name || ""} onChange={(e) => set("name", e.target.value)} required /></div>
      <div className="space-y-2"><Label>Description</Label><Textarea value={data.description || ""} onChange={(e) => set("description", e.target.value)} rows={2} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Price</Label><Input type="number" value={data.price || 0} onChange={(e) => set("price", Number(e.target.value))} /></div>
        <div className="space-y-2"><Label>Category</Label>
          <Select value={data.category || "Main Course"} onValueChange={(v) => set("category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Starter">Starter</SelectItem>
              <SelectItem value="Main Course">Main Course</SelectItem>
              <SelectItem value="Dessert">Dessert</SelectItem>
              <SelectItem value="Minibar">Minibar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2"><Label>Image URL</Label><Input value={data.image_url || ""} onChange={(e) => set("image_url", e.target.value)} /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!data.is_featured} onChange={(e) => set("is_featured", e.target.checked)} /> Featured item</label>
      <Button type="submit" disabled={saving} className="w-full">{saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save Item"}</Button>
    </form>
  );
}

function BookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => { setLoading(true); base44.entities.Booking.list("-created_date").then(setBookings).finally(() => setLoading(false)); };
  useEffect(load, []);

  const updateStatus = async (id, status) => { await base44.entities.Booking.update(id, { status }); load(); };

  if (loading) return <p className="text-muted-foreground">Loading bookings…</p>;
  if (bookings.length === 0) return <p className="text-muted-foreground">No bookings yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Bookings ({bookings.length})</h2>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="bg-card rounded-2xl border border-border/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold">{b.guest_name}</h3>
                <Badge className={b.status === "confirmed" ? "bg-green-500" : b.status === "cancelled" ? "bg-destructive" : "bg-yellow-500"}>{b.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{b.room_name} · {b.check_in} → {b.check_out} · {b.guests} guests · {b.nights} nights</p>
              <p className="text-xs text-muted-foreground mt-1">{b.email} · {b.phone}</p>
              {b.special_requests && <p className="text-xs text-muted-foreground mt-1 italic">"{b.special_requests}"</p>}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-black text-primary text-lg">KES {(b.total_price || 0).toLocaleString()}</span>
              <Select value={b.status || "pending"} onValueChange={(v) => updateStatus(b.id, v)}>
                <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}