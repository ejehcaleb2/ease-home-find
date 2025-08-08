
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Search, User, Settings, LogOut, MessageCircle, History, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const [savedListings] = useState([
    {
      id: 1,
      title: "Modern Self-Contained Apartment",
      location: "Ikeja, Lagos",
      price: 150000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      type: "Self-contained",
      savedDate: "2 days ago"
    },
    {
      id: 4,
      title: "Luxury 3-Bedroom Duplex",
      location: "Victoria Island, Lagos",
      price: 500000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      type: "3-Bedroom",
      savedDate: "1 week ago"
    }
  ]);

  const [searchHistory] = useState([
    { query: "2 bedroom apartment Lagos", date: "Today" },
    { query: "Self contained Ikeja", date: "Yesterday" },
    { query: "Student accommodation Yaba", date: "3 days ago" },
  ]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = userProfile?.full_name || user?.user_metadata?.full_name || 'User';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your saved listings, search history, and profile settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Listings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Saved Listings ({savedListings.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedListings.length > 0 ? (
                  <div className="space-y-4">
                    {savedListings.map((listing) => (
                      <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <p className="text-gray-600 text-sm">{listing.location}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-blue-600">
                              ₦{listing.price.toLocaleString()}/year
                            </span>
                            <span className="text-xs text-gray-500">Saved {listing.savedDate}</span>
                          </div>
                        </div>
                        <Link to={`/listing/${listing.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No saved listings yet</p>
                    <Link to="/listings">
                      <Button className="mt-2">Browse Listings</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-blue-500" />
                  <span>Recent Searches</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {searchHistory.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span>{search.query}</span>
                      </div>
                      <span className="text-xs text-gray-500">{search.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span>Messages</span>
                  <Badge variant="secondary">2</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">Property Owner - Ikeja Apartment</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Hi, the apartment is still available. Would you like to schedule a viewing?</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">HomeEase Support</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Welcome to HomeEase! Let us know if you need any help finding your perfect home.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">{userName.charAt(0).toUpperCase()}</span>
                  </div>
                  <h3 className="font-semibold">{userName}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-gray-600">{userProfile?.location || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2 text-gray-600">{userProfile?.phone || 'Not set'}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/listings">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Listings
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="h-4 w-4 mr-2" />
                    HomeEase Services
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
