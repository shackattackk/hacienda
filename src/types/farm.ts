import { farms } from "@/server/db/schema/farms";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Farm = InferSelectModel<typeof farms>;

export type NewFarm = InferInsertModel<typeof farms>;