
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Calendar, BarChart3 } from "lucide-react";

const MarketInsights = () => {
  const insights = [
    {
      title: "Average Home Price",
      value: "$485,000",
      change: "+5.2%",
      trend: "up",
      period: "vs last month",
      icon: DollarSign
    },
    {
      title: "Days on Market",
      value: "32 days",
      change: "-8.1%",
      trend: "down",
      period: "vs last month",
      icon: Calendar
    },
    {
      title: "New Listings",
      value: "1,247",
      change: "+12.3%",
      trend: "up",
      period: "this month",
      icon: Home
    },
    {
      title: "Market Activity",
      value: "Very Active",
      change: "+18.7%",
      trend: "up",
      period: "vs last quarter",
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Insights</h2>
        <p className="text-gray-600">Stay informed with the latest real estate market trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <Badge variant={insight.trend === "up" ? "default" : "secondary"}>
                    {insight.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {insight.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-sm font-medium text-gray-600 mb-2">
                  {insight.title}
                </CardTitle>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {insight.value}
                </div>
                <p className="text-xs text-gray-500">{insight.period}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Market Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Based on current trends, the real estate market is showing strong growth with increased buyer activity. 
            Home prices are expected to continue their upward trend, making it a favorable time for both buyers and sellers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">78%</div>
              <div className="text-sm text-gray-600">Buyer Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-gray-600">Market Confidence</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">6.2%</div>
              <div className="text-sm text-gray-600">Annual Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketInsights;
