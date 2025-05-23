"use client";

import type { Farm } from "@/types/farm";
import Link from "next/link";
import { Calendar, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CROP_OPTIONS } from "@/lib/constants";
import { useLocation } from "@/hooks/use-location";

interface FarmCardProps {
  farm: Farm;
  boundaries: GeoJSON.Feature<GeoJSON.Polygon>;
  onDelete?: () => void;
}

const getCoordinates = (boundaries: GeoJSON.Feature<GeoJSON.Polygon>) => {
  if (
    boundaries &&
    boundaries.geometry &&
    boundaries.geometry.coordinates &&
    boundaries.geometry.coordinates[0]
  ) {
    const firstCoord = boundaries.geometry.coordinates[0][0];
    if (firstCoord && firstCoord.length >= 2) {
      return firstCoord;
    }
  }
};

export function FarmCard({ farm, boundaries }: FarmCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  let latitude: number | undefined;
  let longitude: number | undefined;

  const coordinates = getCoordinates(boundaries);
  console.log(coordinates);
  if (coordinates) {
    latitude = coordinates[1];
    longitude = coordinates[0];
  }

  const { data: location } = useLocation({ latitude, longitude });

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-32 bg-gradient-to-r from-emerald-500 to-green-400 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg">{farm.name}</h3>
          <div className="flex flex-col text-xs">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location ? (
                <span>
                  {location.address?.town || ""},{" "}
                  {location.address?.state || ""},{" "}
                  {location.address?.country || ""}
                </span>
              ) : (
                <span>Loading location...</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Crop</p>
            <p className="font-medium">
              {CROP_OPTIONS.find((crop) => crop.value === farm.cropType)
                ?.label || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-medium">{farm.size} hectares</p>
          </div>
          <div>
            <p className="text-muted-foreground">Planted</p>
            <p className="font-medium flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {farm.plantingDate
                ? new Date(farm.plantingDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Harvested</p>
            <p className="font-medium flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {farm.harvestDate
                ? new Date(farm.harvestDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Health</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="font-medium">Good</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard?farm=${farm.id}`}>View Dashboard</Link>
        </Button>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Farm</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {farm.name}? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setDeleteDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
