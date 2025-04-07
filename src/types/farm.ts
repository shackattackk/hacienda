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

export interface FarmMapDrawingProps {
  onBoundariesChange: (boundaries: GeoJSON.Feature | null) => void;
  initialCenter?: [number, number];
}