
import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Home, Shield, Users, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Home className="h-6 w-6" />,
      questions: [
        {
          question: "How do I search for properties on HomeEase?",
          answer: "Simply use our search bar on the homepage or listings page. You can filter by location, price range, property type, number of bedrooms, and amenities. Our advanced filters help you find exactly what you're looking for."
        },
        {
          question: "Do I need to create an account to browse listings?",
          answer: "No, you can browse all our listings without creating an account. However, creating an account allows you to save favorites, track your search history, and message property owners directly."
        },
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. It's completely free and takes less than 2 minutes."
        }
      ]
    },
    {
      title: "Property Verification",
      icon: <Shield className="h-6 w-6" />,
      questions: [
        {
          question: "How does HomeEase verify properties?",
          answer: "Every property goes through our 5-step verification process: document verification, physical inspection, landlord background check, legal compliance check, and ongoing monitoring. Only verified properties appear on our platform."
        },
        {
          question: "What if I find a fake or misleading listing?",
          answer: "Report it immediately using the 'Report Listing' button on the property page. We investigate all reports within 24 hours and remove fraudulent listings. We also have a zero-tolerance policy for fake listings."
        },
        {
          question: "How can I tell if a property is verified?",
          answer: "Verified properties display a blue 'Verified' badge. You'll also see verification details including inspection date, document status, and landlord verification status on each listing."
        }
      ]
    },
    {
      title: "Contacting Landlords",
      icon: <Users className="h-6 w-6" />,
      questions: [
        {
          question: "How do I contact a property owner?",
          answer: "Click 'Contact Owner' on any listing to see phone number, WhatsApp link, and messaging options. You can call directly, send a WhatsApp message, or use our in-app messaging system."
        },
        {
          question: "Is it safe to contact landlords directly?",
          answer: "Yes! All landlords are verified before joining our platform. We provide their verified contact information, and you can report any suspicious behavior to our support team immediately."
        },
        {
          question: "What should I ask property owners?",
          answer: "Ask about availability, viewing appointments, lease terms, deposit requirements, included amenities, and any house rules. We provide a suggested questions checklist for first-time renters."
        }
      ]
    },
    {
      title: "Payments & Fees",
      icon: <CreditCard className="h-6 w-6" />,
      questions: [
        {
          question: "Does HomeEase charge any fees to tenants?",
          answer: "No! HomeEase is completely free for tenants. We don't charge agent fees, listing fees, or any hidden charges. You only pay rent and deposit directly to the landlord."
        },
        {
          question: "How do I pay rent and deposits?",
          answer: "Payments are made directly to verified landlords. We recommend bank transfers for security and keeping records. Never pay through unverified third parties or cash to unknown individuals."
        },
        {
          question: "What if a landlord asks for suspicious payments?",
          answer: "Report it immediately. Verified landlords won't ask for payments to agents, processing fees, or advance payments before viewing. All legitimate costs should be clearly stated in the listing."
        }
      ]
    }
  ];

  const toggleExpand = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl mb-8">
            Find answers to common questions about HomeEase and renting in Nigeria
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-gray-900 bg-white border-0"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {filteredCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-blue-600">{category.icon}</div>
              </div>
              <h2 className="text-2xl font-bold">{category.title}</h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const itemId = categoryIndex * 100 + questionIndex;
                const isExpanded = expandedItems.includes(itemId);

                return (
                  <Card key={questionIndex} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleExpand(categoryIndex, questionIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t bg-gray-50">
                          <p className="text-gray-600 pt-4 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find any answers matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search and view all FAQs
            </button>
          </div>
        )}

        {/* Contact Section */}
        <section className="mt-16 text-center bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you with any questions about finding your perfect home.
          </p>
          <div className="space-x-4">
            <a href="/contact" className="inline-block">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </a>
            <a href="https://wa.me/2348031234567" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                WhatsApp Us
              </button>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
