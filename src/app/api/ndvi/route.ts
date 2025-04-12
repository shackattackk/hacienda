import { NextRequest, NextResponse } from "next/server";
import { subDays } from "date-fns";

function formatDate(date: Date): string {
  return date.toISOString().replace('Z', '+00:00');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bbox = searchParams.get("bbox");

  try {
    if (!bbox) {
      return NextResponse.json(
        { error: "Missing bbox parameter" },
        { status: 400 }
      );
    }

    // Parse and validate bbox
    const bboxArray = bbox.split(",").map(Number);
    if (bboxArray.length !== 4 || bboxArray.some(isNaN)) {
      return NextResponse.json(
        { error: "Invalid bbox format" },
        { status: 400 }
      );
    }

    // Calculate aspect ratio and dimensions
    const [minX, minY, maxX, maxY] = bboxArray;
    const bboxWidth = Math.abs(maxX - minX);
    const bboxHeight = Math.abs(maxY - minY);
    const ratio = bboxWidth / bboxHeight;

    // Set base resolution
    const baseResolution = 1024;
    const outputWidth = ratio >= 1 ? baseResolution : Math.round(baseResolution * ratio);
    const outputHeight = ratio >= 1 ? Math.round(baseResolution / ratio) : baseResolution;

    // Get date range for last 60 days
    const endDate = new Date();
    const startDate = subDays(endDate, 60);

    const tokenResponse = await fetch("https://services.sentinel-hub.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SENTINEL_HUB_CLIENT_ID!,
        client_secret: process.env.SENTINEL_HUB_CLIENT_SECRET!,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get Sentinel Hub token");
    }

    const { access_token } = await tokenResponse.json();

    // Request NDVI data with structure matching Python implementation
    const ndviResponse = await fetch("https://services.sentinel-hub.com/api/v1/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        input: {
          bounds: {
            bbox: bboxArray,
            properties: {
              crs: "http://www.opengis.net/def/crs/EPSG/0/4326"
            }
          },
          data: [{
            type: "sentinel-2-l2a",
            dataFilter: {
              timeRange: {
                from: formatDate(startDate),
                to: formatDate(endDate)
              },
              mosaickingOrder: "leastCC",
              maxCloudCoverage: 20,
              previewMode: "PREVIEW"
            }
          }]
        },
        output: {
          width: outputWidth,
          height: outputHeight,
          responses: [{
            identifier: "default",
            format: {
              type: "image/png"
            }
          }]
        },
        evalscript: `
          //VERSION=3
          function setup() {
            return {
              input: ["B02", "B03", "B04", "B08", "SCL"],
              output: { bands: 4 }
            };
          }

          function evaluatePixel(sample) {
            // Calculate NDVI
            const nir = sample.B08;
            const red = sample.B04;
            const ndvi = (nir - red) / (nir + red);
            
            // Check for clouds using Sentinel-2 Scene Classification Layer (SCL)
            const isCloud = sample.SCL === 8 || sample.SCL === 9 || sample.SCL === 10;
            
            let r, g, b, a;
            
            if (isCloud) {
              // Cloud pixels are shown in gray with transparency
              r = 0.7;
              g = 0.7;
              b = 0.7;
              a = 0.6;
            } else {
              // More granular color mapping based on NDVI value
              if (ndvi < -0.5) {
                r = 0.8; g = 0.1; b = 0.1; // Very dark red for bare soil/water
              } else if (ndvi < -0.3) {
                r = 0.9; g = 0.2; b = 0.2; // Dark red
              } else if (ndvi < -0.1) {
                r = 1.0; g = 0.3; b = 0.3; // Red
              } else if (ndvi < 0.0) {
                r = 1.0; g = 0.5; b = 0.3; // Orange-red
              } else if (ndvi < 0.1) {
                r = 1.0; g = 0.7; b = 0.3; // Orange
              } else if (ndvi < 0.2) {
                r = 1.0; g = 0.8; b = 0.3; // Light orange
              } else if (ndvi < 0.3) {
                r = 0.8; g = 0.9; b = 0.3; // Yellow-green
              } else if (ndvi < 0.4) {
                r = 0.6; g = 0.9; b = 0.3; // Light green
              } else if (ndvi < 0.5) {
                r = 0.4; g = 0.9; b = 0.3; // Medium green
              } else if (ndvi < 0.6) {
                r = 0.2; g = 0.8; b = 0.3; // Green
              } else if (ndvi < 0.7) {
                r = 0.1; g = 0.7; b = 0.3; // Dark green
              } else if (ndvi < 0.8) {
                r = 0.1; g = 0.5; b = 0.3; // Very dark green
              } else {
                r = 0.1; g = 0.3; b = 0.3; // Almost black green
              }
              a = 1;
            }
            
            return [r, g, b, a];
          }
        `
      }),
    });

    if (!ndviResponse.ok) {
      console.error("Sentinel Hub Error:", await ndviResponse.text());
      throw new Error("Failed to fetch NDVI data");
    }

    const imageData = await ndviResponse.blob();
    return new NextResponse(imageData, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Error processing NDVI request:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
