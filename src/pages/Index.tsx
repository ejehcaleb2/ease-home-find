
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Shield, MessageCircle, Sparkles, MapPin, Star, DollarSign, Eye, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import PropertyRecommendations from "@/components/PropertyRecommendations";
import QuickActions from "@/components/QuickActions";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Modern Design */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PropLink</span>
            </h1>
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto font-medium">
              Your journey to the perfect home starts here. We connect you directly with homeowners and landlords.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Skip the middleman, save on fees, and find your dream home with complete transparency and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3" onClick={() => navigate('/listings')}>
                <Search className="mr-2 h-5 w-5" />
                Find Your Home
              </Button>
              {!user && (
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => navigate('/auth')}>
                  Join PropLink
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section - Only for authenticated users */}
      {user && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickActions />
          </div>
        </section>
      )}

      {/* Property Recommendations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyRecommendations />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PropLink?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding and securing your perfect home simple, secure, and affordable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Smart Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced filters and AI-powered recommendations to find properties that match your exact needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Verified Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All properties are verified for authenticity, ensuring you get accurate information every time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant answers about properties, neighborhoods, and market insights from our AI assistant.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask Our AI Assistant</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get instant help with property searches, market insights, and real estate questions.
            </p>
          </div>
          
          <AIChat />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience the PropLink Difference</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect directly with property owners and enjoy these exclusive benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-blue-600 mb-2">No Agent Fees</div>
              <div className="text-gray-600">Connect directly with owners and save thousands</div>
            </div>
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-green-600 mb-2">Full Transparency</div>
              <div className="text-gray-600">See all costs upfront with no hidden charges</div>
            </div>
            <div className="p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-purple-600 mb-2">Affordable Homes</div>
              <div className="text-gray-600">Find quality homes within your budget</div>
            </div>
            <div className="p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <div className="text-xl font-bold text-orange-600 mb-2">Direct Connection</div>
              <div className="text-gray-600">Speak directly with property owners</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
