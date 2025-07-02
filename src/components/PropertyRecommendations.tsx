
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Heart, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  type: string;
  featured: boolean;
}

const PropertyRecommendations = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Simulate fetching personalized recommendations
    const mockProperties: Property[] = [
      {
        id: "1",
        title: "Modern Downtown Apartment",
        price: "$450,000",
        location: "Downtown District",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,200 sq ft",
        image: "/placeholder.svg",
        type: "Apartment",
        featured: true
      },
      {
        id: "2",
        title: "Cozy Suburban House",
        price: "$650,000",
        location: "Maple Heights",
        bedrooms: 3,
        bathrooms: 2,
        area: "1,800 sq ft",
        image: "/placeholder.svg",
        type: "House",
        featured: false
      },
      {
        id: "3",
        title: "Luxury Condo with View",
        price: "$850,000",
        location: "Riverside",
        bedrooms: 2,
        bathrooms: 3,
        area: "1,500 sq ft",
        image: "/placeholder.svg",
        type: "Condo",
        featured: true
      }
    ];
    setProperties(mockProperties);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {user ? `Recommended for ${user.email}` : "Featured Properties"}
        </h2>
        <p className="text-gray-600">
          Discover properties that match your preferences and budget
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              {property.featured && (
                <Badge className="absolute top-2 left-2 bg-blue-600">
                  Featured
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <Badge variant="outline">{property.type}</Badge>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-600 mb-3">
                {property.price}
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.bedrooms} bed
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.bathrooms} bath
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {property.area}
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyRecommendations;
