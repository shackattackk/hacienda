"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Farm } from "@/types/farm";

interface MapComponentProps {
  farm: Farm;
}

interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][] | number[][][][][];
  };
  properties: Record<string, any>;
}

function isValidGeoJSON(data: any): data is GeoJSONFeature {
  return (
    data &&
    typeof data === "object" &&
    data.type === "Feature" &&
    data.geometry &&
    typeof data.geometry === "object" &&
    "type" in data.geometry &&
    "coordinates" in data.geometry
  );
}

// Custom hook to handle map updates
function MapUpdater({ farm }: { farm: Farm }) {
  const map = useMap();

  useEffect(() => {
    if (farm.boundaries && isValidGeoJSON(farm.boundaries)) {
      const geoJsonLayer = L.geoJSON(farm.boundaries as any);
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds);
    }
  }, [farm, map]);

  return null;
}

export default function MapComponent({ farm }: MapComponentProps) {
  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={[0, 0]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base satellite layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
        {/* Minimal labels overlay */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          opacity={0.5}
        />
        {farm.boundaries && isValidGeoJSON(farm.boundaries) ? (
          <GeoJSON
            data={farm.boundaries as any}
            style={{
              color: "#22c55e",
              weight: 2,
              fillOpacity: 0.1,
            }}
          />
        ) : null}
        <MapUpdater farm={farm} />
      </MapContainer>
    </div>
  );
}
