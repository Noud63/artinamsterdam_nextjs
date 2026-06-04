"use client";

import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { createBouncingMarker } from "@/lib/leaflet-setup";

export default function ArtMarkersLayer({ features, onVenueSelect, markersRef }) {
  // useEffect(() => {
  //   markersRef.current = {};
  // }, [features, markersRef]);

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


// 1.Render phase — component function runs, returns <GeoJSON key={...} pointToLayer={...} />
// 2.Commit phase — React mounts GeoJSON into the tree → Leaflet creates the L.geoJSON layer → calls pointToLayer for each feature → fills markersRef.current with marker instances
// 3.Effects phase — useEffect fires → markersRef.current = {} → wipes everything