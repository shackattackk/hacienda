"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Farm } from "@/types/farm";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Insights } from "@/components/dashboard/insights";
import { FarmSelector } from "@/components/dashboard/farm-selector";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { useFarms } from "@/hooks/use-farms";
import { NdviMap } from "@/components/dashboard/ndvi-map";
import CloudCoverageCalendar from "@/components/cloud-calendar";
import { useCloudCoverage } from "@/hooks/use-cloud-coverage";

export default function Dashboard() {
  const { data: farms, isLoading } = useFarms();
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(
    farms?.[0] ?? null
  );
  const { data: cloudCoverage } = useCloudCoverage(selectedFarm);

  const handleDateSelect = (date: Date) => {
    console.log(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground">Loading farms...</p>
      </div>
    );
  }

  if (!farms?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            No Farms Onboarded
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Get started by adding your first farm to begin monitoring and
            managing your agricultural operations.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
            asChild
          >
            <Link href="/farms/onboard">
              <Plus className="h-4 w-4 mr-2" />
              Add New Farm
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedFarm) {
    setSelectedFarm(farms[0]);
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and optimize your farm&apos;s health and productivity
          </p>
        </div>
        <CloudCoverageCalendar
          cloudCoverage={cloudCoverage?.cloudCoverage}
          summary={cloudCoverage?.summary}
          onDateSelect={handleDateSelect}
        />
        <FarmSelector
          farms={farms}
          selectedFarm={selectedFarm}
          onSelectFarm={setSelectedFarm}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>NDVI Map</CardTitle>
                <CardDescription>
                  Vegetation health visualization for {selectedFarm.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <NdviMap farm={selectedFarm} />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <WeatherWidget
                boundaries={
                  selectedFarm.boundaries as GeoJSON.Feature<GeoJSON.Polygon>
                }
              />
              {/* <CropHealthMetrics farm={selectedFarm} /> */}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Recommendations based on current farm conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Insights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics for {selectedFarm.name} will be displayed
                here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Analytics dashboard coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>
                Historical data for {selectedFarm.name} will be displayed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Historical data dashboard coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
