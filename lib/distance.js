export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function estimateWalkingTime(distanceKm) {
  const speed = 5;
  const minutes = Math.round((distanceKm / speed) * 60);

  if (minutes < 60) {
    return `${minutes} min walk`;
  }

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m walk`;
}

export function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function getDistanceToVenue(userLocation, venueLat, venueLng) {
  if (!userLocation) {
    return null;
  }

  return calculateDistance(
    userLocation.lat,
    userLocation.lng,
    venueLat,
    venueLng,
  );
}
