export interface MapContentProps {
  initialCenter: [number, number];
  onBoundariesChange: (boundaries: GeoJSON.FeatureCollection | null) => void;
  onAreaChange: (area: number | null) => void;
  readOnly?: boolean;
  initialBoundaries?: GeoJSON.FeatureCollection | null;
}
