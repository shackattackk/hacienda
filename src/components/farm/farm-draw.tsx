"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { FarmMapDrawingProps } from "@/types/farm";

const MapWithNoSSR = dynamic(() => import("./map-content"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

export function FarmMapDrawing({
  onBoundariesChange,
  initialCenter = [10.6713, 122.9511],
  readOnly = false,
  initialBoundaries = null,
}: FarmMapDrawingProps) {
  const [area, setArea] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapWithNoSSR
          initialCenter={initialCenter}
          onBoundariesChange={onBoundariesChange}
          onAreaChange={setArea}
          readOnly={readOnly}
          initialBoundaries={initialBoundaries}
        />
      </div>

      {area && (
        <div className="bg-emerald-50 p-3 rounded-md border border-emerald-200">
          <p className="text-sm text-emerald-800">
            Approximate area: {area.toFixed(2)} hectares
          </p>
        </div>
      )}

      <div className="text-sm text-muted-foreground space-y-2">
        <p className="font-medium">How to draw your farm boundaries:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Click the polygon tool (⬡) to start drawing</li>
          <li>Click points on the map to draw your farm boundaries</li>
          <li>Double-click to complete the shape</li>
          <li>Use the edit tool (✎) to modify points</li>
          <li>Use the delete tool (🗑) to start over</li>
        </ul>
      </div>
    </div>
  );
}
