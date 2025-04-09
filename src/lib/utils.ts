import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isPolygon(
  geometry: GeoJSON.Geometry | undefined
): geometry is GeoJSON.Polygon {
  return geometry !== undefined && geometry.type === "Polygon";
}