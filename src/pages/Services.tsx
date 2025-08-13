
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Truck, Wrench, PaintRoller, Sparkles, Star, Shield, CheckCircle, Phone, RefreshCw } from "lucide-react";

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
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            The Most Trusted Home Service Marketplace for Tenants
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            HomeEase Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Book verified home service professionals with confidence. Quality guaranteed, fair pricing, and full HomeEase protection on every booking.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              All Vendors Verified
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              Quality Guaranteed
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-purple-500" />
              Full Refund Policy
            </div>
          </div>
        </section>

        {/* Trust & Commission Section */}
        <section className="bg-secondary/30 rounded-2xl p-6 mb-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Choose HomeEase Services?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <Shield className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Vetted Professionals</h3>
                <p className="text-muted-foreground">Every vendor undergoes strict verification including background checks, insurance validation, and quality assessments.</p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <h3 className="font-semibold">Fair & Transparent</h3>
                <p className="text-muted-foreground">We take a small commission to maintain quality standards and provide 24/7 support, ensuring you get the best service at fair prices.</p>
              </div>
              <div className="space-y-2">
                <Phone className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-semibold">Full Support</h3>
                <p className="text-muted-foreground">Our customer support team is available 24/7 to help with any issues. Call us at +234-800-HOMEEASE for immediate assistance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section aria-label="Service categories" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Service</h2>
            <p className="text-muted-foreground">Professional services delivered by verified vendors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.name] || Sparkles;
              const active = selectedCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`group border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 focus-ring ${
                    active ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-card hover:bg-secondary/50"
                  }`}
                  aria-pressed={active}
                >
                  <div className={`inline-flex p-4 rounded-2xl mb-4 transition-colors ${
                    active ? "bg-primary-foreground/20" : "bg-accent group-hover:bg-primary/10"
                  }`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-lg">{cat.name}</div>
                    <div className={`text-sm line-clamp-3 ${
                      active ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {cat.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Vendors for selected category */}
        <section aria-label="Available vendors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory ? `${selectedCategory.name} Professionals` : "Available Vendors"}
              </h2>
              <p className="text-muted-foreground">
                {selectedCategory ? `Verified ${selectedCategory.name.toLowerCase()} specialists ready to help` : "Choose a category to see available vendors"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-12">
              <Loader2 className="h-6 w-6 animate-spin" /> 
              <span>Finding the best vendors for you...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No vendors available for this category yet.</div>
              <p className="text-sm text-muted-foreground">We're actively onboarding more verified professionals. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((svc) => (
                <Card key={svc.id} className="group overflow-hidden border-2 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {svc.vendor.photo_url ? (
                            <img
                              src={svc.vendor.photo_url}
                              alt={`${svc.vendor.name} vendor profile photo`}
                              className="w-12 h-12 rounded-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold">
                              {svc.vendor.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{svc.vendor.name}</div>
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Vendor
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₦{svc.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Starting from</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(svc.vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="font-medium">{svc.vendor.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">(120+ reviews)</span>
                      </div>
                    </div>
                    
                    {svc.vendor.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{svc.vendor.bio}</p>
                    )}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Background Checked
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3 text-blue-500" />
                          Insured
                        </div>
                      </div>
                      
                      <Dialog open={bookingOpen && bookingVendor?.id === svc.id} onOpenChange={(o) => {
                        if (!o) setBookingVendor(null);
                        setBookingOpen(o);
                      }}>
                        <DialogTrigger asChild>
                          <Button onClick={() => openBooking(svc)} className="group-hover:scale-105 transition-transform">
                            Book Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader className="text-center pb-4">
                            <DialogTitle className="text-2xl">Secure Your Booking</DialogTitle>
                            <p className="text-muted-foreground">Book with confidence - HomeEase protection included</p>
                          </DialogHeader>
                          
                          {/* Trust Signals */}
                          <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-center gap-6 text-sm">
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Quality Guaranteed
                              </div>
                              <div className="flex items-center gap-2 text-blue-600">
                                <Shield className="h-4 w-4" />
                                Secure Payment
                              </div>
                              <div className="flex items-center gap-2 text-purple-600">
                                <RefreshCw className="h-4 w-4" />
                                Full Refund Policy
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div>
                              <Label className="mb-3 block font-medium">Select date</Label>
                              <Calendar
                                mode="single"
                                selected={bookingDate}
                                onSelect={setBookingDate}
                                disabled={(d) => d < new Date()}
                                initialFocus
                                className="rounded-lg border"
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="time" className="font-medium">Preferred time</Label>
                                <select
                                  id="time"
                                  className="mt-2 w-full h-11 rounded-lg border bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                                <Label htmlFor="details" className="font-medium">Extra details / special requests</Label>
                                <Input
                                  id="details"
                                  className="mt-2 h-11 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  placeholder="e.g., bring packing boxes, focus on kitchen, door hinge repair..."
                                  value={details}
                                  onChange={(e) => setDetails(e.target.value)}
                                />
                              </div>
                              
                              {/* Booking Summary */}
                              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                                <div className="font-medium mb-2">Booking Summary:</div>
                                <div className="flex justify-between">
                                  <span>Service:</span>
                                  <span className="font-medium">{selectedCategory?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Vendor:</span>
                                  <span className="font-medium">{bookingVendor?.vendor.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Price:</span>
                                  <span className="font-semibold text-primary">₦{bookingVendor?.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Date/Time:</span>
                                  <span className="font-medium">
                                    {bookingDate && bookingTime ? `${format(bookingDate, 'MMM dd, yyyy')} at ${bookingTime}` : "Select date & time"}
                                  </span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>HomeEase service fee:</span>
                                  <span>Included in price</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Support Contact */}
                          <div className="text-center text-sm text-muted-foreground border-t pt-4">
                            Need help? Call our 24/7 support: <span className="font-medium text-primary">+234-800-HOMEEASE</span>
                          </div>

                          <DialogFooter className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setBookingOpen(false)} className="flex-1">
                              Cancel
                            </Button>
                            <Button onClick={submitBooking} className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                              Confirm Booking
                            </Button>
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
