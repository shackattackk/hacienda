"use client";

import { FarmCard } from "@/components/farm/farm-card";
import { useFarms } from "@/hooks/use-farms";

export default function FarmsPage() {
  const { data: farms } = useFarms();

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Farms</h1>
          <p className="text-muted-foreground">
            View and manage all your registered farms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms?.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={farm}
            boundaries={farm.boundaries as GeoJSON.Feature<GeoJSON.Polygon>}
          />
        ))}
      </div>
    </div>
  );
}
