
import { Users, Target, Award, Heart, Shield, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const team = [
    {
      name: "Adebayo Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "10+ years in real estate and technology"
    },
    {
      name: "Funmi Adelaja",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face",
      description: "Expert in property verification and tenant relations"
    },
    {
      name: "Emeka Okafor",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Building scalable solutions for the housing market"
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Trust & Transparency",
      description: "Every property is verified. Every landlord is vetted. No hidden fees, no surprises."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Affordable Housing",
      description: "We believe everyone deserves a safe, affordable home without exploitative agent fees."
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Community First",
      description: "Building a community where tenants and landlords connect directly and fairly."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Quality Service",
      description: "Exceptional customer service and support throughout your housing journey."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Tenants" },
    { number: "5,000+", label: "Verified Properties" },
    { number: "50+", label: "Cities Covered" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mr-4">
              <Home className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">About HomeEase</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Revolutionizing housing in Nigeria by connecting tenants directly to verified, affordable rental homes without the stress of agent fees.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  HomeEase was born from a simple frustration: the difficulty of finding affordable, quality housing in Nigeria without paying excessive agent fees. Our founders experienced firsthand the challenges tenants face - from inflated prices to unreliable agents to unverified properties.
                </p>
                <p>
                  In 2023, we decided to change this narrative. We built a platform that directly connects tenants with verified property owners, eliminating middlemen and reducing costs for everyone involved.
                </p>
                <p>
                  Today, we're proud to have helped over 10,000 Nigerians find their perfect homes while saving millions in unnecessary agent fees. But we're just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                alt="Modern apartment"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To make quality housing accessible and affordable for every Nigerian by creating a transparent, direct connection between tenants and property owners.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To become Africa's leading housing platform, where finding a home is simple, transparent, and stress-free for millions of people.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who have found their dream homes through HomeEase. No agent fees, no stress, just quality homes at affordable prices.
          </p>
          <div className="space-x-4">
            <a href="/listings" className="inline-block">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Browse Listings
              </button>
            </a>
            <a href="/contact" className="inline-block">
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
