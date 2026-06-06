"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { AMSTERDAM_CENTER, DEFAULT_ZOOM } from "@/lib/leaflet-setup";

export default function MapController({
  routeBounds,
  userCenter,
  userCenterKey,
  onMapClick,
  resetToken,
}) {
  const map = useMap();

  useEffect(() => {
    if (!routeBounds) {
      return;
    }

    map.fitBounds(routeBounds, { padding: [50, 50] });
  }, [map, routeBounds]);

  useEffect(() => {
    if (!userCenter || !userCenterKey) {
      return;
    }

    map.setView(userCenter, DEFAULT_ZOOM);
  }, [map, userCenter, userCenterKey]);

  useEffect(() => {
    if (!resetToken) {
      return;
    }

    map.setView(AMSTERDAM_CENTER, DEFAULT_ZOOM);
  }, [map, resetToken]);

  useEffect(() => {
    if (!onMapClick) {
      return;
    }

    map.on("click", onMapClick);

    return () => {
      map.off("click", onMapClick);
    };
  }, [map, onMapClick]);

  return null;
}
