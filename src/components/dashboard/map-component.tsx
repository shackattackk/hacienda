"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  GeoJSON,
  ImageOverlay,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Farm } from "@/types/farm";
import type { Feature, Polygon, MultiPolygon } from "geojson";

interface MapComponentProps {
  farm: Farm;
  ndviImage?: ArrayBuffer;
}

type FarmBoundary = Feature<Polygon | MultiPolygon>;

function isValidGeoJSON(data: unknown): data is FarmBoundary {
  if (!data || typeof data !== "object") return false;

  const obj = data as Record<string, unknown>;
  if (obj.type !== "Feature") return false;

  const geometry = obj.geometry as Record<string, unknown>;
  if (!geometry || typeof geometry !== "object") return false;
  if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon")
    return false;
  if (!Array.isArray(geometry.coordinates)) return false;

  return true;
}

function getBoundsFromGeoJSON(data: FarmBoundary): L.LatLngBounds {
  const geoJsonLayer = L.geoJSON(data);
  return geoJsonLayer.getBounds();
}

function MapUpdater({ farm, bounds }: { farm: Farm; bounds?: L.LatLngBounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (farm.boundaries && isValidGeoJSON(farm.boundaries)) {
      const geoJsonLayer = L.geoJSON(farm.boundaries);
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds);
    }
  }, [farm, map, bounds]);

  return null;
}

function NdviLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
      <div className="text-sm font-medium mb-2">NDVI Values</div>
      <div className="flex items-center space-x-2">
        <span className="text-xs">Low</span>
        <div className="h-4 w-32 bg-gradient-to-r from-[#ff0000] via-[#ff6600] via-[#ffcc00] via-[#99ff00] via-[#00ff00] to-[#006600]"></div>
        <span className="text-xs">High</span>
      </div>
    </div>
  );
}

export default function MapComponent({ farm, ndviImage }: MapComponentProps) {
  const [bounds, setBounds] = useState<L.LatLngBounds>();
  const [ndviImageUrl, setNdviImageUrl] = useState<string>();

  useEffect(() => {
    if (farm.boundaries && isValidGeoJSON(farm.boundaries)) {
      setBounds(getBoundsFromGeoJSON(farm.boundaries));
    }
  }, [farm.boundaries]);

  useEffect(() => {
    if (ndviImage && bounds) {
      const blob = new Blob([ndviImage], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setNdviImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [ndviImage, bounds]);

  return (
    <div className="h-[600px] w-full relative">
      <MapContainer
        center={[0, 0]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          opacity={0.5}
        />
        {farm.boundaries && isValidGeoJSON(farm.boundaries) ? (
          <GeoJSON
            key={farm.id}
            data={farm.boundaries}
            style={{
              color: "#3b82f6",
              weight: 3,
              fillOpacity: 0.1,
            }}
          />
        ) : null}
        {ndviImageUrl && bounds && (
          <ImageOverlay url={ndviImageUrl} bounds={bounds} opacity={0.7} />
        )}
        <MapUpdater farm={farm} bounds={bounds} />
      </MapContainer>
      {ndviImageUrl && <NdviLegend />}
    </div>
  );
}
