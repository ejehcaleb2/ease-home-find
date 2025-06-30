
import { useState } from "react";
import { Search, Home, Shield, Clock, MapPin, Users, Star, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const featuredListings = [
    {
      id: 1,
      title: "Modern Self-Contained Apartment",
      location: "Ikeja, Lagos",
      price: "₦150,000",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      tags: ["Furnished", "Water", "Security"]
    },
    {
      id: 2,
      title: "Spacious 2-Bedroom Flat",
      location: "Gbagada, Lagos",
      price: "₦250,000",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      tags: ["Generator", "Parking", "Kitchen"]
    },
    {
      id: 3,
      title: "Student-Friendly Room",
      location: "Yaba, Lagos",
      price: "₦80,000",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      tags: ["Student Area", "Affordable", "Transport"]
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Oluwaseun",
      location: "Lagos",
      text: "Found my perfect apartment in just 3 days! No agent fees, no stress. HomeEase is a game-changer.",
      rating: 5
    },
    {
      name: "Chioma Nwachukwu",
      location: "Abuja",
      text: "Finally, a platform that actually verifies listings. Saved me from so many fake apartments.",
      rating: 5
    },
    {
      name: "Ibrahim Musa",
      location: "Port Harcourt",
      text: "The best part? Direct contact with landlords. No middleman charging extra fees!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Affordable homes. <span className="text-blue-600">Zero stress.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
            HomeEase helps you find real, verified rental homes in Nigeria—without agent fees.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Home type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="self-contained">Self-contained</SelectItem>
                  <SelectItem value="1-bedroom">1-Bedroom</SelectItem>
                  <SelectItem value="2-bedroom">2-Bedroom</SelectItem>
                  <SelectItem value="3-bedroom">3-Bedroom</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={searchPrice} onValueChange={setSearchPrice}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100k">Under ₦100k</SelectItem>
                  <SelectItem value="100k-200k">₦100k - ₦200k</SelectItem>
                  <SelectItem value="200k-300k">₦200k - ₦300k</SelectItem>
                  <SelectItem value="300k-500k">₦300k - ₦500k</SelectItem>
                  <SelectItem value="above-500k">Above ₦500k</SelectItem>
                </SelectContent>
              </Select>
              
              <Link to="/listings">
                <Button size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2 h-5 w-5" />
                  Search Homes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Listings</h2>
            <p className="text-gray-600">Discover verified homes from trusted landlords</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                    Available
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{listing.price}<span className="text-sm text-gray-500">/year</span></span>
                    <span className="text-gray-500">{listing.bedrooms} bed</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/listing/${listing.id}`}>
                    <Button className="w-full" variant="outline">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/listings">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Listings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Finding your perfect home in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Search & Filter</h3>
              <p className="text-gray-600">Use our advanced filters to find homes that match your needs and budget perfectly.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. View Verified Listings</h3>
              <p className="text-gray-600">Browse only verified properties with real photos and accurate information.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Move In</h3>
              <p className="text-gray-600">Contact landlords directly, schedule viewings, and move into your dream home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HomeEase?</h2>
            <p className="text-gray-600">Experience the difference of a truly tenant-focused platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">No Agent Fees</h3>
              <p className="text-sm text-gray-600">Connect directly with landlords and save on commission fees</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Verified Listings</h3>
              <p className="text-sm text-gray-600">All properties are verified for authenticity and accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Direct Contact</h3>
              <p className="text-sm text-gray-600">Communicate directly with property owners</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Quality Homes</h3>
              <p className="text-sm text-gray-600">Curated selection of quality, affordable properties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Tenants Say</h2>
            <p className="text-gray-600">Real stories from people who found their perfect homes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <p className="text-gray-300">Verified Homes Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1,200+</div>
              <p className="text-gray-300">Happy Tenants</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-gray-300">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of Nigerians who have found their dream homes with HomeEase</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Browse Listings
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/2341234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        <Phone className="h-6 w-6" />
      </a>

      <Footer />
    </div>
  );
};

export default Index;
