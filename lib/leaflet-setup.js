import L from "leaflet";

if (typeof window !== "undefined") {
  window.L = L;
}

import "@/lib/leaflet.smoothmarkerbouncing.js";

export { L };

export const AMSTERDAM_CENTER = [52.371534, 4.862805];
export const DEFAULT_ZOOM = 14;

export const rembrandt = L.icon({
  iconUrl: "/images/marker1.png",
  shadowUrl: "/images/marker1shadow.png",
  iconSize: [28, 42],
  shadowSize: [30, 34],
  shadowAnchor: [3, 34],
  iconAnchor: [14, 42],
});

export const userLocationIcon = L.icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233498db' width='32' height='32'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Ccircle cx='12' cy='12' r='3' fill='white'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export function createBouncingMarker(latlng, onClick) {
  const marker = L.marker(latlng, { icon: rembrandt })
    .setBouncingOptions({
      bounceHeight: 30,
      bounceSpeed: 54,
      shadowAngle: -Math.PI / 4,
      exclusive: true,
    })
    .on("click", function (event) {
      L.DomEvent.stopPropagation(event);
      this.bounce(1);
      onClick?.(event);
    });

  return marker;
}
