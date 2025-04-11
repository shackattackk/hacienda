import { useQuery } from "@tanstack/react-query";
import { Farm } from "@/types/farm";
import { ApiResponse } from "@/types/api";

export function useFarms() {
  return useQuery<Farm[] | null>({
    queryKey: ["farms"],
    queryFn: async () => {
      const response = await fetch("/api/farms");
      if (!response.ok) throw new Error("Error fetching farms");
      const data = await response.json() as ApiResponse<Farm[]>;
      return data.data;
    },
  });
}