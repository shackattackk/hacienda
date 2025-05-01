import { db } from "@/server/db";
import { farms } from "@/server/db/schema/farms";
import { Farm, NewFarm } from "@/types/farm";
import { eq } from "drizzle-orm";

export async function createFarm(farm: NewFarm, userId: string): Promise<Farm> {
  const existingFarms = await getFarmsByUserId(userId);
  if (existingFarms.length > 0) {
    throw new Error("You can only create one farm per account");
  }

  const [newFarm] = await db
    .insert(farms)
    .values({
      name: farm.name,
      size: farm.size ? farm.size.toString() : null,
      cropType: farm.cropType,
      plantingDate: farm.plantingDate ? farm.plantingDate.toString() : null,
      harvestDate: farm.harvestDate ? farm.harvestDate.toString() : null,
      notes: farm.notes ?? null,
      boundaries: farm.boundaries ?? null,
      userId: userId,
    })
    .returning();

  if (!newFarm) {
    throw new Error("Failed to create farm");
  }

  return newFarm;
}

export async function getFarmsByUserId(userId: string): Promise<Farm[]> {
  const userFarms = await db
    .select()
    .from(farms)
    .where(eq(farms.userId, userId));
  return userFarms;
}
