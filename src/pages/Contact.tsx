
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
      setIsLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+234 803 123 4567", "+234 807 890 1234"],
      description: "Mon-Fri 8AM-6PM, Sat 9AM-2PM"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["support@homeease.ng", "info@homeease.ng"],
      description: "We respond within 24 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: ["123 Allen Avenue, Ikeja", "Lagos State, Nigeria"],
      description: "Visit us during business hours"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      description: "Sunday: Closed"
    }
  ];

  const faqItems = [
    {
      question: "How do I search for properties?",
      answer: "Use our search filters on the listings page to find properties by location, price, type, and amenities."
    },
    {
      question: "Are all properties verified?",
      answer: "Yes! Every property and landlord on our platform goes through a thorough verification process."
    },
    {
      question: "Do I pay any agent fees?",
      answer: "No agent fees at all! HomeEase connects you directly with property owners."
    },
    {
      question: "How do I contact property owners?",
      answer: "You can call, message, or WhatsApp property owners directly through the listing page."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions? Need help finding your perfect home? We're here to assist you every step of the way.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="property">Property Question</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-600">{info.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* WhatsApp Contact */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Quick Support</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Need immediate help? Chat with us on WhatsApp
                </p>
                <a
                  href="https://wa.me/2348031234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is available Monday through Saturday to help you find your perfect home.
          </p>
          <div className="space-x-4">
            <a href="/faq" className="inline-block">
              <Button variant="outline">
                View All FAQs
              </Button>
            </a>
            <a href="tel:+2348031234567" className="inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
