export interface FarmMapDrawingProps {
  onBoundariesChange: (boundaries: GeoJSON.FeatureCollection | null) => void;
  initialCenter?: [number, number];
  readOnly?: boolean;
  initialBoundaries?: GeoJSON.FeatureCollection | null;
}

export interface FarmData {
  name: string;
  size: string;
  cropType: string;
  plantingDate: string;
  harvestDate: string;
  location: string;
  notes: string;
  boundaries: GeoJSON.Feature<GeoJSON.Polygon> | null;
}
