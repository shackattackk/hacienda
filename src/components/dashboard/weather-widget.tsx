"use client";

import { Cloud, CloudRain, Droplets, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "@/hooks/use-location";
import { useWeather } from "@/hooks/use-weather";
import { WeatherCondition } from "@/types/weather";

interface WeatherWidgetProps {
  boundaries: GeoJSON.Feature<GeoJSON.Polygon>;
}

const getWeatherIcon = (condition: WeatherCondition) => {
  switch (condition.main.toLowerCase()) {
    case "clear":
      return Sun;
    case "clouds":
      return Cloud;
    case "rain":
      return CloudRain;
    default:
      return Sun;
  }
};

export function WeatherWidget({ boundaries }: WeatherWidgetProps) {
  const latitude = boundaries.geometry.coordinates[0][0][1];
  const longitude = boundaries.geometry.coordinates[0][0][0];

  const { data: locationData } = useLocation({
    latitude,
    longitude,
  });

  const { data: weatherData, isLoading } = useWeather(latitude, longitude);

  if (isLoading || !weatherData) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentWeather = weatherData.list[0];
  const WeatherIcon = getWeatherIcon(currentWeather.weather[0]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <WeatherIcon className="h-10 w-10 mr-2 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">
                {Math.round(currentWeather.main.temp)}°C
              </p>
              <p className="text-xs text-muted-foreground">
                {weatherData?.city?.name || ""}
                <br />
                {weatherData?.city?.country || ""}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Droplets className="h-4 w-4 text-blue-500 mb-1" />
              <p className="text-xs">{currentWeather.main.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              <CloudRain className="h-4 w-4 text-blue-400 mb-1" />
              <p className="text-xs">{Math.round(currentWeather.pop * 100)}%</p>
              <p className="text-xs text-muted-foreground">Rain</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {weatherData.list
            .filter((forecast) => {
              const [date, time] = forecast.dt_txt.split(" ");
              return time.startsWith("12:00");
            })
            .slice(0, 5)
            .map((forecast) => {
              const DayIcon = getWeatherIcon(forecast.weather[0]);
              return (
                <div key={forecast.dt} className="flex flex-col items-center">
                  <p className="text-xs">
                    {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <DayIcon className="h-4 w-4 my-1" />
                  <p className="text-xs">{Math.round(forecast.main.temp)}°</p>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
