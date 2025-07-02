
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calculator, MessageCircle, Heart, MapPin, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Search Properties",
      description: "Find your dream home",
      icon: Search,
      action: () => navigate('/listings'),
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate your payments",
      icon: Calculator,
      action: () => {},
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "AI Assistant",
      description: "Get instant help",
      icon: MessageCircle,
      action: () => {},
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Saved Favorites",
      description: "View liked properties",
      icon: Heart,
      action: () => {},
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      title: "Neighborhood Guide",
      description: "Explore areas",
      icon: MapPin,
      action: () => {},
      color: "bg-orange-600 hover:bg-orange-700"
    },
    {
      title: "Market Reports",
      description: "Latest insights",
      icon: FileText,
      action: () => {},
      color: "bg-indigo-600 hover:bg-indigo-700"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <p className="text-gray-600">Everything you need at your fingertips</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group" onClick={action.action}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{action.title}</CardTitle>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
