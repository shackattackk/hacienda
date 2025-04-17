import { Farm } from "@/types/farm";
import { useQuery } from "@tanstack/react-query";
import { getBoundingBox } from "@/lib/utils";

export const useCloudCoverage = (farm: Farm | null) => {
  return useQuery({
    queryKey: ["cloud-coverage", farm?.id],
    queryFn: async () => {
      if (!farm) throw new Error("Farm is null");
      const bbox = getBoundingBox(farm.boundaries);
      if (!bbox) throw new Error("Invalid farm boundaries");

      const url = new URL("/api/cloud-coverage", window.location.origin);
      url.searchParams.append("bbox", bbox);

      const response = await fetch(url);
      return response.json();
    },
    enabled: !!farm,
  });
};
