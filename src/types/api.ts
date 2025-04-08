import { Farm, NewFarm } from "@/types/farm";

export type CreateFarmRequest = NewFarm;

export interface ApiError {
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: ApiError;
}
