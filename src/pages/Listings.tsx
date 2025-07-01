
import { useState, useMemo } from "react";
import { Search, MapPin, Filter, Star, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [homeType, setHomeType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Comprehensive listings data with housing images
  const allListings = [
    {
      id: 1,
      title: "Modern Self-Contained Apartment",
      location: "Ikeja, Lagos",
      price: 150000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.8,
      amenities: ["Furnished", "Water", "Security", "Kitchen"],
      available: true,
      description: "Beautiful self-contained apartment in a serene environment."
    },
    {
      id: 2,
      title: "Spacious 2-Bedroom Flat",
      location: "Gbagada, Lagos",
      price: 250000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.9,
      amenities: ["Generator", "Parking", "Kitchen", "Water"],
      available: true,
      description: "Spacious 2-bedroom flat perfect for small families."
    },
    {
      id: 3,
      title: "Student-Friendly Room",
      location: "Yaba, Lagos",
      price: 80000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 4.5,
      amenities: ["Student Area", "Transport", "Water"],
      available: true,
      description: "Perfect for students, close to universities."
    },
    {
      id: 4,
      title: "Luxury 3-Bedroom Duplex",
      location: "Victoria Island, Lagos",
      price: 500000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 5.0,
      amenities: ["Furnished", "Security", "Generator", "Parking", "Kitchen"],
      available: true,
      description: "Luxury duplex in prime location with all amenities."
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      location: "Surulere, Lagos",
      price: 120000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "Studio",
      bedrooms: 1,
      rating: 4.3,
      amenities: ["Furnished", "Water", "Kitchen"],
      available: true,
      description: "Cozy studio perfect for young professionals."
    },
    // Adding 35 more listings with housing images
    {
      id: 6,
      title: "Executive 1-Bedroom Flat",
      location: "Lekki, Lagos",
      price: 200000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "1-Bedroom",
      bedrooms: 1,
      rating: 4.7,
      amenities: ["Generator", "Security", "Kitchen", "Water"],
      available: true,
      description: "Executive 1-bedroom in prime Lekki location."
    },
    {
      id: 7,
      title: "Family 3-Bedroom House",
      location: "Magodo, Lagos",
      price: 350000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.6,
      amenities: ["Parking", "Garden", "Security", "Generator"],
      available: true,
      description: "Perfect family home with garden space."
    },
    {
      id: 8,
      title: "Affordable Self-Contained",
      location: "Ketu, Lagos",
      price: 90000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.2,
      amenities: ["Water", "Kitchen", "Security"],
      available: true,
      description: "Budget-friendly self-contained apartment."
    },
    {
      id: 9,
      title: "Modern 2-Bedroom Terrace",
      location: "Ajah, Lagos",
      price: 280000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.8,
      amenities: ["Generator", "Parking", "Security", "Kitchen"],
      available: true,
      description: "Modern terrace house in developing Ajah."
    },
    {
      id: 10,
      title: "Luxury Studio",
      location: "Ikoyi, Lagos",
      price: 180000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "Studio",
      bedrooms: 1,
      rating: 4.9,
      amenities: ["Furnished", "Pool", "Gym", "Security"],
      available: true,
      description: "Luxury studio with premium amenities."
    },
    {
      id: 11,
      title: "Comfortable Room Share",
      location: "Ojota, Lagos",
      price: 60000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 4.1,
      amenities: ["Shared Kitchen", "Water", "Transport"],
      available: true,
      description: "Affordable room sharing option."
    },
    {
      id: 12,
      title: "Executive 4-Bedroom Duplex",
      location: "Banana Island, Lagos",
      price: 800000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "4-Bedroom",
      bedrooms: 4,
      rating: 5.0,
      amenities: ["Pool", "Garden", "Security", "Generator", "Parking"],
      available: true,
      description: "Ultra-luxury duplex in exclusive area."
    },
    {
      id: 13,
      title: "Student Hostel Room",
      location: "Akoka, Lagos",
      price: 70000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 4.0,
      amenities: ["Student Area", "Study Room", "Water"],
      available: true,
      description: "Clean hostel room near UNILAG."
    },
    {
      id: 14,
      title: "Serviced 1-Bedroom Apartment",
      location: "Ikate, Lagos",
      price: 220000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "1-Bedroom",
      bedrooms: 1,
      rating: 4.7,
      amenities: ["Furnished", "Housekeeping", "Security", "Generator"],
      available: true,
      description: "Fully serviced apartment with housekeeping."
    },
    {
      id: 15,
      title: "Spacious 3-Bedroom Flat",
      location: "Festac, Lagos",
      price: 300000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.5,
      amenities: ["Parking", "Playground", "Security", "Generator"],
      available: true,
      description: "Family-friendly flat in established estate."
    },
    // Continue with more listings...
    {
      id: 16,
      title: "Mini Flat",
      location: "Agege, Lagos",
      price: 100000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "Mini Flat",
      bedrooms: 1,
      rating: 4.2,
      amenities: ["Water", "Kitchen", "Security"],
      available: true,
      description: "Affordable mini flat for young professionals."
    },
    {
      id: 17,
      title: "2-Bedroom Bungalow",
      location: "Ipaja, Lagos",
      price: 180000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.4,
      amenities: ["Garden", "Parking", "Water", "Security"],
      available: true,
      description: "Detached bungalow with private garden."
    },
    {
      id: 18,
      title: "Executive Self-Contained",
      location: "Allen, Lagos",
      price: 170000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.6,
      amenities: ["Generator", "Security", "Kitchen", "Parking"],
      available: true,
      description: "Executive self-contained in Allen Avenue."
    },
    {
      id: 19,
      title: "Luxury 2-Bedroom Penthouse",
      location: "Victoria Island, Lagos",
      price: 450000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.9,
      amenities: ["Pool", "Gym", "Security", "Generator", "Ocean View"],
      available: true,
      description: "Penthouse with stunning ocean views."
    },
    {
      id: 20,
      title: "Student Lodge",
      location: "Bariga, Lagos",
      price: 65000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 4.0,
      amenities: ["Student Area", "Study Hall", "Water", "Security"],
      available: true,
      description: "Purpose-built student accommodation."
    },
    // Continue adding more listings with unique details...
    {
      id: 21,
      title: "4-Bedroom Terrace Duplex",
      location: "Chevron, Lagos",
      price: 600000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "4-Bedroom",
      bedrooms: 4,
      rating: 4.8,
      amenities: ["Garden", "Security", "Generator", "Parking", "BQ"],
      available: true,
      description: "Luxury terrace duplex with boys' quarters."
    },
    {
      id: 22,
      title: "Affordable 1-Bedroom",
      location: "Mushin, Lagos",
      price: 85000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "1-Bedroom",
      bedrooms: 1,
      rating: 4.1,
      amenities: ["Water", "Kitchen", "Transport"],
      available: true,
      description: "Budget-friendly apartment with good transport links."
    },
    {
      id: 23,
      title: "Executive Studio",
      location: "Oniru, Lagos",
      price: 160000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "Studio",
      bedrooms: 1,
      rating: 4.5,
      amenities: ["Beach Access", "Security", "Generator", "Furnished"],
      available: true,
      description: "Studio apartment with beach access."
    },
    {
      id: 24,
      title: "Family 3-Bedroom Flat",
      location: "Ogba, Lagos",
      price: 190000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.3,
      amenities: ["School Nearby", "Security", "Parking", "Playground"],
      available: true,
      description: "Perfect for families with school-age children."
    },
    {
      id: 25,
      title: "Shared Apartment Room",
      location: "Palmgrove, Lagos",
      price: 75000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 4.0,
      amenities: ["Shared Kitchen", "Water", "Security", "Wi-Fi"],
      available: true,
      description: "Room in shared apartment with Wi-Fi."
    },
    {
      id: 26,
      title: "Luxury 1-Bedroom Condo",
      location: "Eko Atlantic, Lagos",
      price: 400000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "1-Bedroom",
      bedrooms: 1,
      rating: 5.0,
      amenities: ["Ocean View", "Pool", "Gym", "Concierge", "Security"],
      available: true,
      description: "Ultra-modern condo in Eko Atlantic City."
    },
    {
      id: 27,
      title: "2-Bedroom Apartment",
      location: "Berger, Lagos",
      price: 140000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.2,
      amenities: ["Transport Hub", "Market Nearby", "Water", "Security"],
      available: true,
      description: "Convenient location near transport hub."
    },
    {
      id: 28,
      title: "Executive 3-Bedroom Flat",
      location: "Omole, Lagos",
      price: 320000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.7,
      amenities: ["Estate", "Security", "Generator", "Parking", "Garden"],
      available: true,
      description: "Executive flat in gated estate."
    },
    {
      id: 29,
      title: "Self-Contained Studio",
      location: "Maryland, Lagos",
      price: 130000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.4,
      amenities: ["Shopping Mall", "Water", "Security", "Kitchen"],
      available: true,
      description: "Near major shopping centers."
    },
    {
      id: 30,
      title: "Duplex 4-Bedroom",
      location: "Gbagada, Lagos",
      price: 550000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "4-Bedroom",
      bedrooms: 4,
      rating: 4.6,
      amenities: ["Duplex", "Garden", "Security", "Generator", "Parking"],
      available: true,
      description: "Spacious duplex with private garden."
    },
    {
      id: 31,
      title: "Budget Room",
      location: "Alaba, Lagos",
      price: 50000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 3.8,
      amenities: ["Affordable", "Water", "Market Access"],
      available: true,
      description: "Most affordable option with basic amenities."
    },
    {
      id: 32,
      title: "Modern 2-Bedroom",
      location: "Oregun, Lagos",
      price: 210000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 4.5,
      amenities: ["Modern", "Security", "Generator", "Kitchen"],
      available: true,
      description: "Newly renovated modern apartment."
    },
    {
      id: 33,
      title: "Executive Mini Flat",
      location: "Ogudu, Lagos",
      price: 110000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "Mini Flat",
      bedrooms: 1,
      rating: 4.3,
      amenities: ["Executive", "Water", "Security", "Parking"],
      available: true,
      description: "Well-finished mini flat."
    },
    {
      id: 34,
      title: "Luxury 5-Bedroom Mansion",
      location: "Lekki Phase 1, Lagos",
      price: 1200000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "5-Bedroom",
      bedrooms: 5,
      rating: 5.0,
      amenities: ["Pool", "Garden", "Security", "Generator", "Staff Quarters"],
      available: true,
      description: "Luxury mansion with all premium amenities."
    },
    {
      id: 35,
      title: "Cozy 1-Bedroom Flat",
      location: "Egbeda, Lagos",
      price: 95000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      type: "1-Bedroom",
      bedrooms: 1,
      rating: 4.2,
      amenities: ["Cozy", "Water", "Kitchen", "Transport"],
      available: true,
      description: "Comfortable flat with good transport links."
    },
    {
      id: 36,
      title: "Student Apartment",
      location: "Akoka, Lagos",
      price: 80000,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      type: "Self-contained",
      bedrooms: 1,
      rating: 4.1,
      amenities: ["Student Area", "Study Space", "Water", "Security"],
      available: true,
      description: "Perfect for university students."
    },
    {
      id: 37,
      title: "Premium 3-Bedroom Terrace",
      location: "Ikota, Lagos",
      price: 380000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.8,
      amenities: ["Terrace", "Garden", "Security", "Generator", "Modern"],
      available: true,
      description: "Premium terrace house in new development."
    },
    {
      id: 38,
      title: "Shared 2-Bedroom Flat",
      location: "Shomolu, Lagos",
      price: 65000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      type: "Room",
      bedrooms: 1,
      rating: 3.9,
      amenities: ["Shared", "Water", "Kitchen Access", "Transport"],
      available: true,
      description: "Room in shared 2-bedroom flat."
    },
    {
      id: 39,
      title: "Executive Duplex",
      location: "Anthony, Lagos",
      price: 290000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      bedrooms: 3,
      rating: 4.5,
      amenities: ["Duplex", "Security", "Generator", "Parking"],
      available: true,
      description: "Executive duplex in prime Anthony area."
    },
    {
      id: 40,
      title: "Waterfront Apartment",
      location: "Ikoyi, Lagos",
      price: 700000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "2-Bedroom",
      bedrooms: 2,
      rating: 5.0,
      amenities: ["Waterfront", "Pool", "Gym", "Security", "Concierge"],
      available: true,
      description: "Luxury waterfront apartment with premium amenities."
    }
  ];

  const amenityOptions = ["Water", "Security", "Kitchen", "Generator", "Parking", "Furnished", "Student Area", "Transport", "Pool", "Gym", "Garden"];

  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !location || listing.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const matchesType = !homeType || listing.type === homeType;
      const matchesBedrooms = !bedrooms || listing.bedrooms.toString() === bedrooms;
      const matchesAmenities = selectedAmenities.length === 0 || 
                              selectedAmenities.every(amenity => listing.amenities.includes(amenity));

      return matchesSearch && matchesLocation && matchesPrice && matchesType && matchesBedrooms && matchesAmenities;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.id - a.id; // newest first
      }
    });
  }, [searchQuery, location, priceRange, homeType, bedrooms, selectedAmenities, sortBy]);

  const toggleFavorite = (listingId: number) => {
    setFavorites(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setSelectedAmenities(prev => 
      checked 
        ? [...prev, amenity]
        : prev.filter(item => item !== amenity)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={homeType} onValueChange={setHomeType}>
              <SelectTrigger>
                <SelectValue placeholder="Home type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Room">Room</SelectItem>
                <SelectItem value="Self-contained">Self-contained</SelectItem>
                <SelectItem value="1-Bedroom">1-Bedroom</SelectItem>
                <SelectItem value="2-Bedroom">2-Bedroom</SelectItem>
                <SelectItem value="3-Bedroom">3-Bedroom</SelectItem>
                <SelectItem value="4-Bedroom">4-Bedroom</SelectItem>
                <SelectItem value="5-Bedroom">5-Bedroom</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Mini Flat">Mini Flat</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}</span>
              <div className="w-48">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
              </div>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                  <SheetDescription>
                    Narrow down your search with additional filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Bedrooms</label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 block">Amenities</label>
                    <div className="space-y-3">
                      {amenityOptions.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                          />
                          <label htmlFor={amenity} className="text-sm">{amenity}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredListings.length} of {allListings.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge className={listing.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500"}>
                    {listing.available ? "Available" : "Not Available"}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(listing.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                  />
                </button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{listing.rating.toFixed(1)}</span>
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {listing.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{listing.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                <Link to={`/listing/${listing.id}`}>
                  <Button className="w-full" disabled={!listing.available}>
                    {listing.available ? "View Details" : "Not Available"}
                    {listing.available && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredListings.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Listings
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={() => {
              setSearchQuery("");
              setLocation("");
              setPriceRange([0, 1000000]);
              setHomeType("");
              setBedrooms("");
              setSelectedAmenities([]);
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Listings;
