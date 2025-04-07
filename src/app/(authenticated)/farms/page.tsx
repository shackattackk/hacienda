"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FarmCard } from "@/components/farm/farm-card";
import { Farm } from "@/types/farm";
import Link from "next/link";

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([]);

  const handleDeleteFarm = (id: string) => {
    setFarms(farms?.filter((farm: Farm) => farm.id !== id));
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Farms</h1>
          <p className="text-muted-foreground">
            View and manage all your registered farms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map((farm) => (
          <FarmCard
            key={farm.id}
            farm={farm}
            onDelete={() => handleDeleteFarm(farm.id)}
          />
        ))}
      </div>
    </div>
  );
}
