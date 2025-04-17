import { NextRequest, NextResponse } from "next/server";
import { subDays, format } from "date-fns";

interface CloudCoverageData {
  date: string;
  coverage: number;
  status: "low" | "medium" | "high";
  hasImage: boolean;
}

function getCloudCoverageStatus(coverage: number): "low" | "medium" | "high" {
  if (coverage <= 20) return "low";
  if (coverage <= 50) return "medium";
  return "high";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bbox = searchParams.get("bbox");
  const days = parseInt(searchParams.get("days") || "30", 10);

  try {
    if (!bbox) {
      return NextResponse.json(
        { error: "Missing bbox parameter" },
        { status: 400 }
      );
    }

    const bboxArray = bbox.split(",").map(Number);
    if (bboxArray.length !== 4 || bboxArray.some(isNaN)) {
      return NextResponse.json(
        { error: "Invalid bbox format" },
        { status: 400 }
      );
    }

    // Get Sentinel Hub token
    const tokenResponse = await fetch(
      "https://services.sentinel-hub.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.SENTINEL_HUB_CLIENT_ID!,
          client_secret: process.env.SENTINEL_HUB_CLIENT_SECRET!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token response error:", errorText);
      throw new Error(`Failed to get Sentinel Hub token: ${errorText}`);
    }

    const { access_token } = await tokenResponse.json();

    // Get cloud coverage data for the last N days
    const endDate = new Date();
    const startDate = subDays(endDate, days);

    const requestBody = {
      bbox: bboxArray,
      datetime: `${format(startDate, "yyyy-MM-dd")}T00:00:00Z/${format(endDate, "yyyy-MM-dd")}T23:59:59Z`,
      collections: ["sentinel-2-l2a"],
      limit: 100,
    };


    const catalogResponse = await fetch(
      "https://services.sentinel-hub.com/api/v1/catalog/1.0.0/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!catalogResponse.ok) {
      const errorText = await catalogResponse.text();
      throw new Error(`Failed to fetch catalog data: ${errorText}`);
    }

    const catalogData = await catalogResponse.json();

    const cloudCoverageData: CloudCoverageData[] = [];

    // Process the catalog data
    if (catalogData.features && Array.isArray(catalogData.features)) {
      for (const feature of catalogData.features) {
        const date = feature.properties.datetime.split('T')[0];
        const coverage = feature.properties["eo:cloud_cover"];
        cloudCoverageData.push({
          date,
          coverage,
          status: getCloudCoverageStatus(coverage),
          hasImage: true
        });
      }
    }

    cloudCoverageData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      cloudCoverage: cloudCoverageData,
      summary: {
        low: cloudCoverageData.filter((d) => d.status === "low").length,
        medium: cloudCoverageData.filter((d) => d.status === "medium").length,
        high: cloudCoverageData.filter((d) => d.status === "high").length,
        total: cloudCoverageData.length
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}



