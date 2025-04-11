"use client";

import { Cloud, CloudRain, Droplets, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "@/hooks/use-location";

interface WeatherWidgetProps {
  boundaries: GeoJSON.Feature<GeoJSON.Polygon>;
}

export function WeatherWidget({ boundaries }: WeatherWidgetProps) {
  const weather = {
    temperature: 24,
    humidity: 65,
    precipitation: 20,
    forecast: [
      { day: "Today", icon: Sun, temp: 24 },
      { day: "Tue", icon: Cloud, temp: 22 },
      { day: "Wed", icon: CloudRain, temp: 19 },
      { day: "Thu", icon: Sun, temp: 25 },
      { day: "Fri", icon: Sun, temp: 26 },
    ],
  };

  const { data: locationData } = useLocation({
    latitude: boundaries.geometry.coordinates[0][0][1],
    longitude: boundaries.geometry.coordinates[0][0][0],
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Sun className="h-10 w-10 mr-2 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-xs text-muted-foreground">
                {locationData?.address?.town || ""},{" "}
                {locationData?.address?.state || ""},{" "}
                {locationData?.address?.country || ""}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Droplets className="h-4 w-4 text-blue-500 mb-1" />
              <p className="text-xs">{weather.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              <CloudRain className="h-4 w-4 text-blue-400 mb-1" />
              <p className="text-xs">{weather.precipitation}%</p>
              <p className="text-xs text-muted-foreground">Rain</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {weather.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <p className="text-xs">{day.day}</p>
              <day.icon className="h-4 w-4 my-1" />
              <p className="text-xs">{day.temp}°</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
