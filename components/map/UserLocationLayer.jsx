"use client";

import { Circle, Marker, Popup, Tooltip } from "react-leaflet";
import { userLocationIcon } from "@/lib/leaflet-setup";

export default function UserLocationLayer({ userLocation, openPopup }) {
  if (!userLocation) {
    return null;
  }

  const { lat, lng, accuracy } = userLocation;

  return (
    <>
      <Circle
        center={[lat, lng]}
        radius={accuracy}
        pathOptions={{
          color: "#3498db",
          fillColor: "#3498db",
          fillOpacity: 0.1,
          weight: 2,
        }}
      />
      <Marker
        position={[lat, lng]}
        icon={userLocationIcon}
        eventHandlers={
          openPopup
            ? {
                add: (event) => {
                  event.target.openPopup();
                },
              }
            : undefined
        }
      >
        <Tooltip>
          <span className="font-semibold text-xs">Your current location</span>
        </Tooltip>
        <Popup>
          <div className="location-popup text-center text-[#8b4c11] leading-snug pb-1">
            <div className="location-popup__title inline-block text-xs font-bold mb-1 underline decoration-[#8b4c11]">
              Your Location
            </div>
            <br />
            Latitude: {lat.toFixed(4)}
            <br />
            Longitude: {lng.toFixed(4)}
            <br />
            Accuracy: ~{Math.round(accuracy)} meters
          </div>
        </Popup>
      </Marker>
    </>
  );
}
