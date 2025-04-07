// components/farm/map-content.tsx
import { useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContentProps } from "@/types/map";



export default function MapContent({
  initialCenter,
  onBoundariesChange,
  onAreaChange,
}: MapContentProps) {
  const featureGroupRef = useRef<any>(null);

  const handleCreate = (e: any) => {
    const layer = e.layer;
    const geoJSON = layer.toGeoJSON();
    const areaInHectares = turf.area(geoJSON) / 10000;
    onAreaChange(areaInHectares);
    onBoundariesChange(geoJSON);
  };

  const handleEdit = (e: any) => {
    const layers = featureGroupRef.current?.getLayers();
    if (layers && layers.length > 0) {
      const geoJSON = layers[0].toGeoJSON();
      const areaInHectares = turf.area(geoJSON) / 10000;
      onAreaChange(areaInHectares);
      onBoundariesChange(geoJSON);
    }
  };

  const handleDelete = () => {
    onAreaChange(null);
    onBoundariesChange(null);
  };

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      className={"h-[400px] w-full rounded-lg"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        opacity={0.7}
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreate}
          onEdited={handleEdit}
          onDeleted={handleDelete}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false,
              drawError: {
                color: "#e1e4e8",
                message: "Shape edges cannot cross!",
              },
              shapeOptions: {
                color: "#10b981",
                fillOpacity: 0.2,
              },
            },
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
