export interface MapContentProps {
  initialCenter: [number, number];
  onBoundariesChange: (boundaries: GeoJSON.Feature | null) => void;
  onAreaChange: (area: number | null) => void;
}
