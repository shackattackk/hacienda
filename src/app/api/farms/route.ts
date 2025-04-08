import { NextRequest, NextResponse } from "next/server";
import { createFarm } from "@/server/services/farm";
import { auth } from "@clerk/nextjs/server";
import { CreateFarmRequest, ApiResponse } from "@/types/api";
import { Farm } from "@/types/farm";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Farm>>> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        data: null,
        error: {
          message: "Unauthorized",
        },
      },
      { status: 401 }
    );
  }

  try {
    const payload = (await request.json()) as CreateFarmRequest;
    const farm = await createFarm(payload, userId);
    return NextResponse.json({ data: farm }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
}
