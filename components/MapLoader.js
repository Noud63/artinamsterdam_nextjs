"use client";

import dynamic from "next/dynamic";

const MapApp = dynamic(() => import("@/components/MapApp"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f5f0e8] text-[#492910]">
      Loading map…
    </div>
  ),
});

export default function MapLoader() {
  return <MapApp />;
}
