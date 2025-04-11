"use client";

import type { Farm } from "@/types/farm";
import { AlertCircle, ArrowRight, Droplets, Sun } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function Insights() {
  // Mock AI insights
  const insights = [
    {
      title: "Irrigation Recommendation",
      description:
        "Based on soil moisture levels and weather forecast, consider irrigating the northern section of your farm in the next 48 hours.",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Potential Stress Detected",
      description:
        "NDVI analysis shows early signs of crop stress in the southeast corner. Recommend soil testing and closer inspection.",
      icon: AlertCircle,
      color: "text-amber-500",
    },
    {
      title: "Optimal Harvest Window",
      description:
        "Based on current growth stage and weather forecast, the optimal harvest window for your crop is estimated to be in 18-22 days.",
      icon: Sun,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <Alert key={index} className="flex items-start">
          <insight.icon className={`h-5 w-5 mr-2 ${insight.color}`} />
          <div className="flex-1">
            <AlertTitle className="text-base">{insight.title}</AlertTitle>
            <AlertDescription className="text-sm mt-1">
              {insight.description}
            </AlertDescription>
          </div>
        </Alert>
      ))}
      <div className="md:col-span-3 mt-2">
        <Button variant="outline" className="w-full">
          View All Insights <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
