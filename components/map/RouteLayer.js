"use client";

import { Polyline } from "react-leaflet";

export default function RouteLayer({ routeLatLngs }) {
  if (!routeLatLngs?.length) {
    return null;
  }

  return (
    <Polyline
      positions={routeLatLngs}
      pathOptions={{
        color: "#3498db",
        weight: 5,
        opacity: 0.8,
      }}
    />
  );
}
