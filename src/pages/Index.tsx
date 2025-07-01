import { useState } from "react";
import { Search, MapPin, Home, Users, Shield, Star, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [homeType, setHomeType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (homeType) params.set('type', homeType);
    if (priceRange) params.set('price', priceRange);
    navigate(`/listings?${params.toString()}`);
  };

  const featuredListings = [
    {
      id: 1,
      title: "Modern Self-Contained Apartment",
      location: "Ikeja, Lagos",
      price: 150000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.8
    },
    {
      id: 2,
      title: "Spacious 2-Bedroom Flat",
      location: "Gbagada, Lagos", 
      price: 250000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.9
    },
    {
      id: 4,
      title: "Luxury 3-Bedroom Duplex",
      location: "Victoria Island, Lagos",
      price: 500000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "3-Bedroom", 
      bedrooms: 3,
      rating: 5.0
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "No Agent Fees",
      description: "Connect directly with verified landlords. Zero middleman charges or hidden fees."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Verified Properties",
      description: "Every listing is thoroughly verified for authenticity and quality before going live."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Direct Communication",
      description: "Chat, call, or WhatsApp property owners directly without any intermediaries."
    }
  ];

  const testimonials = [
    {
      name: "Adunni Bakare",
      location: "Lagos",
      text: "I found my perfect apartment in just 3 days! No agent stress, no extra fees. HomeEase made everything so simple.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Okonkwo", 
      location: "Abuja",
      text: "As a student, saving on agent fees was crucial. HomeEase helped me find affordable accommodation near my university.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Fatima Ahmed",
      location: "Port Harcourt", 
      text: "The verification process gave me confidence. I knew the property and landlord were legitimate before viewing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-blue-900/90 to-blue-800/90 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Affordable homes. <span className="text-yellow-400">Zero stress.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
            HomeEase helps you find real, verified rental homes in Nigeria—without agent fees.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 shadow-2xl max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location (e.g., Lagos, Abuja)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 text-gray-900"
                />
              </div>
              
              <Select value={homeType} onValueChange={setHomeType}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Home type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="self-contained">Self-contained</SelectItem>
                  <SelectItem value="1-bedroom">1-Bedroom</SelectItem>
                  <SelectItem value="2-bedroom">2-Bedroom</SelectItem>
                  <SelectItem value="3-bedroom">3-Bedroom</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="0-100000">Under ₦100k</SelectItem>
                  <SelectItem value="100000-200000">₦100k - ₦200k</SelectItem>
                  <SelectItem value="200000-500000">₦200k - ₦500k</SelectItem>
                  <SelectItem value="500000-1000000">₦500k - ₦1M</SelectItem>
                  <SelectItem value="1000000+">Above ₦1M</SelectItem>
                </SelectContent>
              </Select>
              
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
                <Search className="h-5 w-5 mr-2" />
                Search Homes
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              Over 5,000 verified properties • No agent fees • Direct landlord contact
            </p>
          </form>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Finding your perfect home is easier than ever with our simple 3-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced search to find properties that match your exact needs, budget, and location preferences.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. View & Verify</h3>
              <p className="text-gray-600">
                Browse verified listings with real photos, detailed descriptions, and direct landlord contact information.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Home className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Connect & Move In</h3>
              <p className="text-gray-600">
                Contact landlords directly, schedule viewings, and secure your new home without any agent fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Listings</h2>
              <p className="text-gray-600">Discover quality homes from verified landlords</p>
            </div>
            <Link to="/listings">
              <Button variant="outline">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-500">Available</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{listing.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₦{listing.price.toLocaleString()}
                      <span className="text-sm text-gray-500">/year</span>
                    </span>
                    <span className="text-gray-500">{listing.bedrooms} bed</span>
                  </div>
                  <Link to={`/listing/${listing.id}`}>
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HomeEase?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're revolutionizing the housing market in Nigeria with transparency, affordability, and trust
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 text-lg">
              Join thousands of satisfied tenants who found their perfect homes through HomeEase
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-300">Happy Tenants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">5,000+</div>
              <div className="text-gray-300">Verified Properties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">₦2B+</div>
              <div className="text-gray-300">Saved in Agent Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of Nigerians who have found quality, affordable homes through HomeEase
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link to="/listings">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full md:w-auto">
                Browse Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 w-full md:w-auto">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/2348031234567"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
