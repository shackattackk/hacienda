"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Cloud, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Define the types for our cloud coverage data
type CloudCoverageStatus = "low" | "medium" | "high";

interface CloudCoverageData {
  date: string;
  coverage: number;
  status: CloudCoverageStatus;
  hasImage: boolean;
}

interface CloudCoverageSummary {
  low: number;
  medium: number;
  high: number;
  total: number;
}

interface CloudCoverageCalendarProps {
  cloudCoverage?: CloudCoverageData[] | null;
  summary?: CloudCoverageSummary | null;
  onDateSelect: (date: Date) => void;
  className?: string;
}

function CloudCoverageCalendar({
  cloudCoverage = [],
  summary = { low: 0, medium: 0, high: 0, total: 0 },
  onDateSelect,
  className,
}: CloudCoverageCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );
  const [open, setOpen] = React.useState(false);

  // Convert string dates to Date objects and create a lookup map
  const coverageMap = React.useMemo(() => {
    const map = new Map<string, CloudCoverageData>();

    cloudCoverage?.forEach((item) => {
      map.set(item.date, item);
    });

    return map;
  }, [cloudCoverage]);

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && onDateSelect) {
      onDateSelect(date);
      setOpen(false); // Close the popover after selection
    }
  };

  // Modify the day renderer to make dates clickable and log to console
  const renderDay = (day: Date, modifiers: any) => {
    const dateString = format(day, "yyyy-MM-dd");
    const coverageData = coverageMap.get(dateString);

    // Determine if the date should be disabled
    const isDisabled = !coverageData?.hasImage;

    // Determine the color based on coverage status
    const getCloudColor = (CloudCoverageStatus: CloudCoverageStatus) => {
      switch (CloudCoverageStatus) {
        case "low":
          return "text-green-500";
        case "medium":
          return "text-yellow-500";
        case "high":
          return "text-red-500";
        default:
          return "text-gray-300";
      }
    };

    const handleDayClick = () => {
      if (!isDisabled) {
        console.log("Clicked date:", dateString, coverageData);
      }
    };

    return (
      <div
        className={cn(
          "relative w-full h-full flex flex-col items-center justify-center",
          !isDisabled &&
            "cursor-pointer hover:bg-muted/50 rounded-md transition-colors"
        )}
        onClick={handleDayClick}
      >
        <span
          className={cn(
            "text-center",
            modifiers.selected && "text-primary-foreground",
            isDisabled && "text-muted-foreground opacity-50"
          )}
        >
          {format(day, "d")}
        </span>
        {coverageData && (
          <div className="mt-0.5 flex flex-col items-center">
            <Cloud
              className={cn("h-3 w-3", getCloudColor(coverageData.status))}
            />
          </div>
        )}
      </div>
    );
  };

  // Determine which dates should be disabled
  const disabledDays = React.useMemo(() => {
    const disabledDates: Date[] = [];

    // Create a set of dates that have images
    const availableDates = new Set(
      cloudCoverage?.filter((item) => item.hasImage).map((item) => item.date) ?? []
    );

    // For demonstration, we'll disable dates in a range that aren't in our data
    // This is a simplified approach - in a real app, you might want to handle this differently
    const startDate = new Date(2025, 2, 1); // March 1, 2025
    const endDate = new Date(2025, 4, 30); // May 30, 2025

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = format(currentDate, "yyyy-MM-dd");
      if (!availableDates.has(dateString)) {
        disabledDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return disabledDates;
  }, [cloudCoverage]);

  // Get the selected date's coverage data
  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;

    const dateString = format(selectedDate, "yyyy-MM-dd");
    return coverageMap.get(dateString);
  };

  const selectedDateInfo = getSelectedDateInfo();

  return (
    <div className={cn("space-y-4", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? format(selectedDate, "MMMM d, yyyy")
              : "Select date"}
            {selectedDateInfo && (
              <Badge
                variant="outline"
                className={cn(
                  "ml-auto",
                  selectedDateInfo.status === "low" &&
                    "bg-green-100 text-green-800 hover:bg-green-100",
                  selectedDateInfo.status === "medium" &&
                    "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                  selectedDateInfo.status === "high" &&
                    "bg-red-100 text-red-800 hover:bg-red-100"
                )}
              >
                <Cloud className="mr-1 h-3 w-3" />
                {Math.round(selectedDateInfo.coverage)}%
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Satellite Imagery</h3>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      type="button"
                      onClick={(e) => {
                        // Prevent the click from affecting the popover
                        e.stopPropagation();
                      }}
                    >
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    align="center"
                    sideOffset={5}
                    className="max-w-xs"
                  >
                    <div className="space-y-2">
                      <p className="font-medium">Cloud Coverage Legend</p>
                      <div className="grid gap-1.5">
                        <div className="flex items-center">
                          <Cloud className="h-3 w-3 text-green-500 mr-2" />
                          <span>Low (0-30%): Good quality imagery</span>
                        </div>
                        <div className="flex items-center">
                          <Cloud className="h-3 w-3 text-yellow-500 mr-2" />
                          <span>Medium (30-70%): Moderate quality</span>
                        </div>
                        <div className="flex items-center">
                          <Cloud className="h-3 w-3 text-red-500 mr-2" />
                          <span>High (70-100%): Poor quality</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex mt-2 space-x-2">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                <Cloud className="mr-1 h-3 w-3 text-green-500" />
                {summary?.low ?? 0}
              </Badge>
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              >
                <Cloud className="mr-1 h-3 w-3 text-yellow-500" />
                {summary?.medium ?? 0}
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-100 text-red-800 hover:bg-red-100"
              >
                <Cloud className="mr-1 h-3 w-3 text-red-500" />
                {summary?.high ?? 0}
              </Badge>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={disabledDays}
            components={{
              Day: ({ date, ...props }) => renderDay(date, props),
            }}
            className="p-3"
            classNames={{
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_disabled: "text-muted-foreground opacity-50",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            }}
          />
        </PopoverContent>
      </Popover>

      {selectedDate && selectedDateInfo && (
        <div className="p-3 border rounded-md bg-muted/30">
          <h3 className="font-medium">
            Selected Date: {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <span className="w-32 text-sm text-muted-foreground">
                Cloud Coverage:
              </span>
              <span className="font-medium">
                {selectedDateInfo.coverage.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-sm text-muted-foreground">
                Status:
              </span>
              <span
                className={cn(
                  "font-medium flex items-center",
                  selectedDateInfo.status === "low" && "text-green-500",
                  selectedDateInfo.status === "medium" && "text-yellow-500",
                  selectedDateInfo.status === "high" && "text-red-500"
                )}
              >
                <Cloud className="mr-1 h-4 w-4" />
                {selectedDateInfo.status.charAt(0).toUpperCase() +
                  selectedDateInfo.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CloudCoverageCalendar;
