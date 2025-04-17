import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPolygon(
  geometry: GeoJSON.Geometry | undefined
): geometry is GeoJSON.Polygon {
  return geometry !== undefined && geometry.type === "Polygon";
}

export function getBoundingBox(boundaries: unknown): string | null {
  if (!boundaries || typeof boundaries !== "object") return null;

  const obj = boundaries as Record<string, unknown>;
  if (obj.type !== "Feature") return null;

  const geometry = obj.geometry as Record<string, unknown>;
  if (!geometry || typeof geometry !== "object") return null;
  if (!Array.isArray(geometry.coordinates)) return null;

  let coordinates: number[][][] = [];
  if (geometry.type === "Polygon") {
    coordinates = geometry.coordinates as number[][][];
  } else if (geometry.type === "MultiPolygon") {
    const multiCoords = geometry.coordinates as number[][][][];
    coordinates = multiCoords.flat();
  } else {
    return null;
  }

  const allPoints = coordinates.flat();
  const lngs = allPoints.map((p) => p[0]);
  const lats = allPoints.map((p) => p[1]);

  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  return `${minLng},${minLat},${maxLng},${maxLat}`;
}
