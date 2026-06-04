"use client";

import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { createBouncingMarker } from "@/lib/leaflet-setup";

export default function ArtMarkersLayer({ features, onVenueSelect, markersRef }) {
  useEffect(() => {
    markersRef.current = {};
  }, [features, markersRef]);

  const geoJsonData = {
    type: "FeatureCollection",
    features,
  };

  const pointToLayer = (feature, latlng) => {
    const marker = createBouncingMarker(latlng, () => onVenueSelect(feature));
    markersRef.current[feature.id] = marker;
    return marker;
  };

  return (
    <GeoJSON
      key={features.map((feature) => feature.id).join(",")}
      data={geoJsonData}
      pointToLayer={pointToLayer}
    />
  );
}
