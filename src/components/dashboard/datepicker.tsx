"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface CloudCoverageData {
  date: string;
  coverage: number;
  status: "low" | "medium" | "high";
  hasImage: boolean;
}

interface DatePickerProps {
  bbox: GeoJSON.Feature<GeoJSON.Polygon>;
  onDateSelect: (date: Date | undefined) => void;
  selectedDate?: Date;
  className?: string;
}

export function DatePicker({
  bbox,
  onDateSelect,
  selectedDate,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [cloudCoverage, setCloudCoverage] = React.useState<CloudCoverageData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCloudCoverage = async () => {
      try {
        setLoading(true);
        // Convert GeoJSON polygon to bbox string in format "minX,minY,maxX,maxY"
        const coordinates = bbox.geometry.coordinates[0];
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        coordinates.forEach(([x, y]) => {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        });

        const bboxString = `${minX},${minY},${maxX},${maxY}`;
        
        const response = await fetch(`/api/cloud-coverage?bbox=${bboxString}&days=90`);
        if (!response.ok) {
          throw new Error("Failed to fetch cloud coverage data");
        }
        const data = await response.json();
        setCloudCoverage(data.cloudCoverage);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (bbox) {
      fetchCloudCoverage();
    }
  }, [bbox]);

  const getCoverageStatus = (date: Date): "low" | "medium" | "high" | "unknown" => {
    const dateStr = format(date, "yyyy-MM-dd");
    const coverageData = cloudCoverage.find((d) => d.date === dateStr);
    return coverageData?.status || "unknown";
  };

  const getCoverageBadge = (status: "low" | "medium" | "high" | "unknown") => {
    switch (status) {
      case "low":
        return <Badge variant="default" className="bg-green-500 text-white font-normal">Low Clouds</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-yellow-500 text-white font-normal">Medium Clouds</Badge>;
      case "high":
        return <Badge variant="destructive" className="font-normal">High Clouds</Badge>;
      default:
        return <Badge variant="outline" className="font-normal">No Data</Badge>;
    }
  };

  const disabledDates = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const coverageData = cloudCoverage.find((d) => d.date === dateStr);
    return !coverageData?.hasImage;
  };

  if (loading) {
    return <Skeleton className="h-10 w-[320px]" />;
  }

  if (error) {
    return (
      <div className="text-destructive text-sm">
        Error loading cloud coverage data: {error}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[320px] justify-between px-3 py-5"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CalendarIcon className="h-4 w-4 shrink-0 opacity-50" />
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {selectedDate ? (
                    <>
                      <span className="truncate">{format(selectedDate, "MMMM do, yyyy")}</span>
                      <div className="flex-shrink-0 mr-2">
                        {getCoverageBadge(getCoverageStatus(selectedDate))}
                      </div>
                    </>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="p-0" 
            style={{ zIndex: 1000 }}
            align="start"
            sideOffset={8}
          >
            <div className="p-4 bg-background border-b">
              <div className="[&_.rdp]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:w-[14.28%] [&_.rdp-head_th]:w-[14.28%] [&_.rdp-day]:h-9 [&_.rdp-day]:w-9">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onDateSelect(date);
                    setOpen(false);
                  }}
                  disabled={disabledDates}
                  initialFocus
                  className="w-full"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
} 