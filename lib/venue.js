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
return features.filter((feature) => feature.properties.category === category);
}

export function sortFeaturesByCategory(features) {
  const categoryOrder = {
    gallery: 0,
    artcentre: 1,
    public: 2,
    museum: 3,
  };

  return [...features].sort((a, b) => {
    const catA = categoryOrder[a.properties.category] ?? 999; //999 if no value, non existing categoryOrder always bigger so moves to the end
    const catB = categoryOrder[b.properties.category] ?? 999;

    if (catA !== catB) {
      return catA - catB;
    }
    // negative number → a comes before b
    // positive number → b comes before a
    // a = 0 and b = 0 → treat them as equal (keep order if the sort is stable)
    // Optional: sort alphabetically within each category
    return (a.properties.name ?? "").localeCompare(b.properties.name ?? "");
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

    const day = entry.slice(0, colonIndex).trim();
    const times = entry.slice(colonIndex + 1).trim();

    if (day !== today) {
      return false;
    }

    const [openTime, closeTime] = times.split("-").map((t) => t.trim());
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


{/* <div class="absolute -top-[12px] right-3 h-0 w-0 border-b-[12px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent"></div> */}