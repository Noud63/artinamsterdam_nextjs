export const CATEGORIES = {
  museum: "Museums",
  gallery: "Galleries",
  public: "Public Art",
  artcentre: "Art Centres",
};

export function filterFeatures(features, category) {
  if (!category) {
    return features;
  }

  return features.filter((feature) => feature.cat === category);
}

export function sortFeaturesByName(features) {
  return [...features].sort((a, b) => {
    const nameA = a.properties?.name ?? "";
    const nameB = b.properties?.name ?? "";
    return nameA.localeCompare(nameB);
  });
}

export function isVenueOpen(venue) {
  const schedule = venue.properties?.open;
  if (!schedule) {
    return false;
  }

  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return schedule.some((entry) => {
    if (typeof entry !== "string") {
      return false;
    }

    const colonIndex = entry.indexOf(":");
    // entry = "Tuesday:10:00 - 17:00"  index of first : = 7
    if (colonIndex === -1) {
      return false;
    }

    const day = entry.slice(0, colonIndex);
    const times = entry.slice(colonIndex + 1);

    if (day !== today) {
      return false;
    }

    const [openTime, closeTime] = times.split(" - ");
    if (!openTime || !closeTime) {
      return false;
    }

    return currentTime >= openTime && currentTime <= closeTime;
  });
}

export function formatCategoryLabel(category) {
  if (!category) {
    return "";
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
}
