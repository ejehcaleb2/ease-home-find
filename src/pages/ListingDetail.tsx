
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Star, Bed, Bath, Square, Car, Wifi, Shield, Zap, Users, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ListingDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample listing data (in real app, this would come from API)
  const listing = {
    id: parseInt(id || "1"),
    title: "Modern Self-Contained Apartment",
    location: "Ikeja, Lagos",
    price: 150000,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
    ],
    type: "Self-contained",
    bedrooms: 1,
    bathrooms: 1,
    size: "45 sqm",
    rating: 4.8,
    reviews: 24,
    amenities: ["Furnished", "Water", "Security", "Kitchen", "Generator", "Parking", "Wi-Fi", "24/7 Security"],
    available: true,
    description: "This beautiful self-contained apartment offers modern living in a serene environment. Perfect for young professionals or couples, it features contemporary fixtures, ample natural light, and is located in a secure, well-maintained building. The apartment comes fully furnished with quality appliances and furniture.",
    features: [
      "Modern kitchen with appliances",
      "Spacious living area",
      "Built-in wardrobes",
      "Tiled floors throughout",
      "Large windows for natural light",
      "Private bathroom",
      "Balcony with city view"
    ],
    propertyOwner: {
      name: "Mrs. Adebayo Johnson",
      phone: "+234 803 123 4567",
      email: "adebayo.johnson@email.com",
      verified: true,
      rating: 4.9,
      properties: 12
    },
    nearbyPlaces: [
      { name: "Ikeja City Mall", distance: "0.5 km", type: "Shopping" },
      { name: "Lagos State University", distance: "2.1 km", type: "Education" },
      { name: "Ikeja Bus Terminal", distance: "1.3 km", type: "Transport" },
      { name: "Central Hospital", distance: "0.8 km", type: "Healthcare" }
    ],
    rules: [
      "No smoking inside the apartment",
      "No pets allowed",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 occupants",
      "1-year minimum lease required"
    ]
  };

  const relatedListings = [
    {
      id: 2,
      title: "Spacious 2-Bedroom Flat",
      location: "Gbagada, Lagos",
      price: 250000,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      rating: 4.9
    },
    {
      id: 3,
      title: "Student-Friendly Room",
      location: "Yaba, Lagos",
      price: 80000,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
      rating: 4.5
    },
    {
      id: 5,
      title: "Cozy Studio Apartment",
      location: "Surulere, Lagos",
      price: 120000,
      image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
      rating: 4.3
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/listings">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-[16/10] rounded-lg overflow-hidden">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <p className="text-gray-600 flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    {listing.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <span>{listing.bedrooms} Bedroom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <span>{listing.bathrooms} Bathroom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-gray-400" />
                  <span>{listing.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{listing.rating} ({listing.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <Badge className={listing.available ? "bg-green-500" : "bg-red-500"}>
                  {listing.available ? "Available Now" : "Not Available"}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{listing.description}</p>
                
                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {listing.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {listing.amenities.map((amenity) => {
                    const getIcon = (amenity: string) => {
                      switch (amenity.toLowerCase()) {
                        case 'wi-fi': return <Wifi className="h-5 w-5" />;
                        case 'security': return <Shield className="h-5 w-5" />;
                        case '24/7 security': return <Shield className="h-5 w-5" />;
                        case 'generator': return <Zap className="h-5 w-5" />;
                        case 'parking': return <Car className="h-5 w-5" />;
                        case 'furnished': return <Users className="h-5 w-5" />;
                        default: return <div className="w-5 h-5 bg-blue-500 rounded-full"></div>;
                      }
                    };

                    return (
                      <div key={amenity} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        {getIcon(amenity)}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location & Nearby */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Map Placeholder */}
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-gray-500 text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">{listing.location}</p>
                  </div>
                </div>

                <h4 className="font-semibold mb-3">Nearby Places:</h4>
                <div className="space-y-3">
                  {listing.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{place.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({place.type})</span>
                      </div>
                      <span className="text-sm text-blue-600">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {listing.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact */}
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₦{listing.price.toLocaleString()}
                    <span className="text-lg text-gray-500">/year</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <a 
                  href={`https://wa.me/${listing.propertyOwner.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                    WhatsApp Owner
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Property Owner */}
            <Card>
              <CardHeader>
                <CardTitle>Property Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {listing.propertyOwner.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{listing.propertyOwner.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{listing.propertyOwner.rating}</span>
                      {listing.propertyOwner.verified && (
                        <Badge variant="secondary" className="text-xs ml-2">Verified</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {listing.propertyOwner.properties} properties listed
                </p>
                <Separator className="mb-4" />
                <div className="space-y-2 text-sm">
                  <p><strong>Phone:</strong> {listing.propertyOwner.phone}</p>
                  <p><strong>Email:</strong> {listing.propertyOwner.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedListings.map((relatedListing) => (
              <Card key={relatedListing.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={relatedListing.image}
                    alt={relatedListing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{relatedListing.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {relatedListing.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">
                      ₦{relatedListing.price.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{relatedListing.rating}</span>
                    </div>
                  </div>
                  <Link to={`/listing/${relatedListing.id}`}>
                    <Button className="w-full mt-3" size="sm">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListingDetail;
