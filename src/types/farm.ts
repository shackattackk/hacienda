export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  crop: string;
  plantedDate: string;
  harvestDate: string;
  ndviData?: any;
}

export interface FarmData {
  name: string;
  size: string;
  cropType: string;
  plantingDate: string;
  harvestDate: string;
  location: string;
  notes: string;
  boundaries: GeoJSON.FeatureCollection | null;
}

export interface FarmMapDrawingProps {
  onBoundariesChange: (boundaries: GeoJSON.FeatureCollection | null) => void;
  initialCenter?: [number, number];
  readOnly?: boolean;
  initialBoundaries?: GeoJSON.FeatureCollection | null;
}