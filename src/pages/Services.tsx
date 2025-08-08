
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Truck, Wrench, PaintRoller, Sparkles, Star } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

interface VendorService {
  id: string;
  price: number;
  vendor: {
    id: string;
    name: string;
    rating: number;
    photo_url?: string | null;
    bio?: string | null;
    commission_rate?: number | null;
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Moving: Truck,
  Cleaning: Sparkles,
  Repairs: Wrench,
  Painting: PaintRoller,
  Others: Sparkles,
};

export default function Services() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [services, setServices] = useState<VendorService[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVendor, setBookingVendor] = useState<VendorService | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState<string>("");
  const [details, setDetails] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // SEO: title, description, canonical
    document.title = "HomeEase Services – Book Trusted Home Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "HomeEase Services: moving, cleaning, repairs, and painting by verified vendors. Book now.";
      document.head.appendChild(m);
    } else {
      metaDesc.setAttribute(
        "content",
        "HomeEase Services: moving, cleaning, repairs, and painting by verified vendors. Book now."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    const href = `${window.location.origin}/services`;
    if (!canonical) {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      l.setAttribute("href", href);
      document.head.appendChild(l);
    } else {
      canonical.setAttribute("href", href);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: cats } = await supabase
        .from("service_categories")
        .select("id,name,description,icon")
        .order("name");
      setCategories(cats || []);
      const defaultCat = (cats || [])[0] || null;
      setSelectedCategory(defaultCat);
      if (defaultCat) {
        await loadServices(defaultCat.id);
      }
      setLoading(false);
    };
    load();
  }, []);

  const loadServices = async (categoryId: string) => {
    const { data, error } = await supabase
      .from("vendor_services")
      .select(
        `id, price, vendor:vendors(id,name,rating,photo_url,bio,commission_rate)`
      )
      .eq("category_id", categoryId)
      .eq("active", true)
      .order("price", { ascending: true });

    if (error) {
      console.error(error);
      setServices([]);
      return;
    }
    setServices((data as unknown as VendorService[]) || []);
  };

  const timeOptions = useMemo(() => {
    const opts: string[] = [];
    for (let h = 8; h <= 18; h++) {
      ["00", "30"].forEach((m) => {
        const hh = h.toString().padStart(2, "0");
        opts.push(`${hh}:${m}`);
      });
    }
    return opts;
  }, []);

  const onSelectCategory = async (cat: Category) => {
    setSelectedCategory(cat);
    await loadServices(cat.id);
  };

  const openBooking = (svc: VendorService) => {
    setBookingVendor(svc);
    setBookingOpen(true);
  };

  const submitBooking = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "Log in to book a service." });
      return;
    }
    if (!bookingVendor || !selectedCategory || !bookingDate || !bookingTime) {
      toast({ title: "Missing info", description: "Pick a date and time." });
      return;
    }
    const [hh, mm] = bookingTime.split(":");
    const scheduled = new Date(bookingDate);
    scheduled.setHours(parseInt(hh), parseInt(mm), 0, 0);

    const { error } = await supabase.from("service_bookings").insert({
      user_id: user.id,
      vendor_id: bookingVendor.vendor.id,
      category_id: selectedCategory.id,
      scheduled_at: scheduled.toISOString(),
      details,
      price: bookingVendor.price,
    });

    if (error) {
      console.error(error);
      toast({ title: "Booking failed", description: error.message });
      return;
    }

    toast({ title: "Booking requested", description: "We’ll notify the vendor to confirm." });
    setBookingOpen(false);
    setDetails("");
    setBookingDate(undefined);
    setBookingTime("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">HomeEase Services</h1>
          <p className="text-muted-foreground max-w-2xl">
            Book trusted home services from verified vendors: moving, cleaning, repairs, painting, and more.
          </p>
        </header>

        {/* Categories */}
        <section aria-label="Service categories" className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.name] || Sparkles;
              const active = selectedCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`border rounded-xl p-4 text-left transition-all hover:shadow-sm focus-ring ${
                    active ? "bg-secondary" : "bg-card"
                  }`}
                  aria-pressed={active}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{cat.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {cat.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Vendors for selected category */}
        <section aria-label="Available vendors">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory ? `${selectedCategory.name} vendors` : "Vendors"}
          </h2>

          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className="text-muted-foreground">No vendors available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => (
                <Card key={svc.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {svc.vendor.photo_url ? (
                          <img
                            src={svc.vendor.photo_url}
                            alt={`${svc.vendor.name} vendor profile photo`}
                            className="w-8 h-8 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                            {svc.vendor.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {svc.vendor.name}
                      </span>
                      <span className="text-primary font-semibold">₦{svc.price.toLocaleString()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{svc.vendor.rating.toFixed(1)} / 5.0</span>
                    </div>
                    {svc.vendor.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{svc.vendor.bio}</p>
                    )}
                    <div className="flex justify-end">
                      <Dialog open={bookingOpen && bookingVendor?.id === svc.id} onOpenChange={(o) => {
                        if (!o) setBookingVendor(null);
                        setBookingOpen(o);
                      }}>
                        <DialogTrigger asChild>
                          <Button onClick={() => openBooking(svc)}>Book Now</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Confirm your booking</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                            <div>
                              <Label className="mb-2 block">Select date</Label>
                              <Calendar
                                mode="single"
                                selected={bookingDate}
                                onSelect={setBookingDate}
                                disabled={(d) => d < new Date()}
                                initialFocus
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="time">Preferred time</Label>
                                <select
                                  id="time"
                                  className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm"
                                  value={bookingTime}
                                  onChange={(e) => setBookingTime(e.target.value)}
                                >
                                  <option value="">Select time</option>
                                  {timeOptions.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="details">Extra details / requests</Label>
                                <Input
                                  id="details"
                                  placeholder="e.g., bring packing boxes, focus on kitchen, door hinge repair..."
                                  value={details}
                                  onChange={(e) => setDetails(e.target.value)}
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <div>Service: {selectedCategory?.name}</div>
                                <div>Vendor: {svc.vendor.name}</div>
                                <div>Price: ₦{svc.price.toLocaleString()}</div>
                                <div>
                                  Date/Time: {bookingDate && bookingTime ? `${format(bookingDate, 'PPP')} at ${bookingTime}` : "Select date & time"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setBookingOpen(false)}>Cancel</Button>
                            <Button onClick={submitBooking}>Confirm Booking</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
