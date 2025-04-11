import { useQuery } from "@tanstack/react-query";
import { GeocodingResponse } from "@/lib/geocoding";
import { getLocationFromAddress } from "@/lib/geocoding";

interface UseLocationProps {
  latitude?: number;
  longitude?: number;
}

export function useLocation({ latitude, longitude }: UseLocationProps) {
  return useQuery<GeocodingResponse>({
    queryKey: ["location", latitude, longitude],
    queryFn: () => getLocationFromAddress(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
  });
}
