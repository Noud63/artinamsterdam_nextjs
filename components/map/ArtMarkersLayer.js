"use client";

import { GeoJSON } from "react-leaflet";
import { createBouncingMarker } from "@/lib/leaflet-setup";

export default function ArtMarkersLayer({
  features,
  onVenueSelect,
  markersRef,
  geoJsonKey,
}) {
  const geoJsonData = {
    type: "FeatureCollection",
    features,
  };

  const pointToLayer = (feature, latlng) => {
    const marker = createBouncingMarker(latlng, () => onVenueSelect(feature));
    marker.bindTooltip(feature.properties.name, {
      className: "font-semibold text-xs",
      direction: "top", // top | bottom | left | right | auto
      offset: [0, -38], // [x, y] pixel offset
      permanent: false, // true = always visible, false = only on hover
      opacity: 1,
    });
    markersRef.current[feature.id] = marker;
    return marker;
  };

  return (
    <GeoJSON key={geoJsonKey} data={geoJsonData} pointToLayer={pointToLayer} />
  );
}
