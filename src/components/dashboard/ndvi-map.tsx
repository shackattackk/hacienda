"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Farm } from "@/types/farm";
import { getBoundingBox } from "@/lib/utils";

const Map = dynamic(() => import("@/components/dashboard/map-component"), {
  ssr: false,
});


export function NdviMap({ farm }: { farm: Farm }) {
  const {
    data: ndviData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ndvi", farm.id],
    queryFn: async () => {
      const bbox = getBoundingBox(farm.boundaries);
      if (!bbox) throw new Error("Invalid farm boundaries");

      const url = new URL("/api/ndvi", window.location.origin);
      url.searchParams.append("bbox", bbox);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching NDVI data: ${response.status} ${response.statusText}`
        );
      }

      return response.arrayBuffer();
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Loading NDVI data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-slate-100">
        <div className="text-center text-red-600">
          <p>Error loading NDVI data</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return <Map farm={farm} ndviImage={ndviData} />;
}
