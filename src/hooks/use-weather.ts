import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/weather";

export function useWeather(latitude: number, longitude: number) {
  return useQuery<WeatherResponse>({
    queryKey: ["weather", latitude, longitude],
    queryFn: async () => {
      const response = await fetch(
        `/api/weather?lat=${latitude}&lon=${longitude}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return (await response.json()) as WeatherResponse;
    },
  });
}
