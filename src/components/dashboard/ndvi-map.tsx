"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Farm } from "@/types/farm";

const Map = dynamic(
  () => import("@/components/dashboard/map-component"),
  { ssr: false }
);

export function NdviMap({ farm }: { farm: Farm }) {
  return <Map farm={farm} />;
}
