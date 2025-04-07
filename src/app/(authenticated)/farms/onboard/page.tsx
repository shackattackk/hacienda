"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FarmMapDrawing } from "@/components/farm/farm-draw";
import * as turf from "@turf/turf";

interface FarmData {
  name: string;
  size: string;
  cropType: string;
  plantingDate: string;
  harvestDate: string;
  location: string;
  notes: string;
  boundaries: GeoJSON.Feature<GeoJSON.Polygon> | null;
}

function isPolygon(geometry: GeoJSON.Geometry | undefined): geometry is GeoJSON.Polygon {
  return geometry !== undefined && geometry.type === 'Polygon';
}

const CROP_OPTIONS: { label: string; value: string }[] = [
  { label: "Sugarcane", value: "sugarcane" },
  { label: "Corn", value: "corn" },
  { label: "Wheat", value: "wheat" },
  { label: "Soybean", value: "soybean" },
  { label: "Rice", value: "rice" },
  { label: "Cotton", value: "cotton" },
];

export default function OnboardFarmPage() {
  const [step, setStep] = useState(1);
  const [farmData, setFarmData] = useState<FarmData>({
    name: "",
    size: "",
    cropType: "",
    plantingDate: "",
    harvestDate: "",
    location: "",
    notes: "",
    boundaries: null,
  });
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && (!farmData.name || !farmData.cropType)) {
      toast.info("Missing information", {
        description: "Please fill in all required fields",
      });
      return;
    }

    if (step === 2 && !farmData.boundaries) {
      toast.info("Missing information", {
        description: "Please draw the boundaries of your farm",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form
      toast.success("Farm added successfully", {
        description: "Your new farm has been added to your dashboard",
      });
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/farms");
    }
  };

  const updateFarmData = (key: keyof FarmData, value: any) => {
    setFarmData((prevData: FarmData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="mx-auto py-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Farm</h1>
        <p className="text-muted-foreground">
          Complete the following steps to add a new farm to your dashboard
        </p>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center relative flex-1">
            {i < 3 && (
              <div
                className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 ${
                  step > i ? "bg-emerald-600" : "bg-gray-200"
                }`}
              />
            )}
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center relative z-10 ${
                step === i
                  ? "bg-emerald-600 text-white"
                  : step > i
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > i ? <Check className="h-5 w-5" /> : i}
            </div>
            <span
              className={`text-sm mt-2 ${
                step >= i ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {i === 1 ? "Basic Info" : i === 2 ? "Location" : "Review"}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details about your farm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Farm Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter farm name"
                value={farmData.name}
                onChange={(e) => updateFarmData("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="size">Size (hectares)</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="0.0"
                  value={farmData.size}
                  onChange={(e) => updateFarmData("size", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="crop-type">
                  Primary Crop <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={farmData.cropType}
                  onValueChange={(value) => updateFarmData("cropType", value)}
                >
                  <SelectTrigger id="crop-type">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="planting-date">Planting Date</Label>
                <Input
                  id="planting-date"
                  type="date"
                  value={farmData.plantingDate}
                  onChange={(e) =>
                    updateFarmData("plantingDate", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="harvest-date">Expected Harvest</Label>
                <Input
                  id="harvest-date"
                  type="date"
                  value={farmData.harvestDate}
                  onChange={(e) =>
                    updateFarmData("harvestDate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional information about your farm"
                value={farmData.notes}
                onChange={(e) => updateFarmData("notes", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Farm Boundaries</CardTitle>
            <CardDescription>
              Draw the boundaries of your farm on the map below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <FarmMapDrawing
                onBoundariesChange={(boundaries) => {
                  if (boundaries && boundaries.features && boundaries.features.length > 0) {
                    updateFarmData("boundaries", boundaries.features[0]);
                    const areaInHectares = turf.area(boundaries.features[0]) / 10000;
                    updateFarmData("size", areaInHectares.toFixed(2));
                  } else {
                    updateFarmData("boundaries", null);
                    updateFarmData("size", "");
                  }
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Confirm</CardTitle>
            <CardDescription>
              Review your farm details before adding it to your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Farm Name
                  </h3>
                  <p>{farmData.name || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Size
                  </h3>
                  <p>
                    {farmData.size ? `${farmData.size} hectares` : "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Primary Crop
                  </h3>
                  {CROP_OPTIONS.find(
                    (option) => option.value === farmData.cropType
                  )?.label || "Not specified"}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Planting Date
                  </h3>
                  <p>{farmData.plantingDate || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Expected Harvest
                  </h3>
                  <p>{farmData.harvestDate || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Location
                  </h3>
                  <p>{farmData.location || "Not specified"}</p>
                </div>
              </div>

              {farmData.notes && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Notes
                  </h3>
                  <p>{farmData.notes}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Farm Boundaries
                </h3>
                <div className="h-[400px] rounded-md overflow-hidden">
                  {farmData.boundaries && 
                   isPolygon(farmData.boundaries.geometry) ? (
                    <FarmMapDrawing
                      initialCenter={[
                        farmData.boundaries.geometry.coordinates[0][0][1],
                        farmData.boundaries.geometry.coordinates[0][0][0],
                      ]}
                      onBoundariesChange={() => {}} // No-op since this is read-only
                      readOnly={true}
                      initialBoundaries={{
                        type: "FeatureCollection",
                        features: [farmData.boundaries]
                      }}
                    />
                  ) : (
                    <div className="h-full bg-slate-50 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        No boundaries defined
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Add Farm <Check className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
