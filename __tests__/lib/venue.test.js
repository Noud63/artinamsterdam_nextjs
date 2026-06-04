import {
  CATEGORIES,
  filterFeatures,
  sortFeaturesByName,
  isVenueOpen,
  formatCategoryLabel,
} from "@/lib/venue";

const mockFeatures = [
  {
    id: "museum-a",
    cat: "museum",
    properties: { name: "Zeta Museum" },
  },
  {
    id: "gallery-b",
    cat: "gallery",
    properties: { name: "Alpha Gallery" },
  },
  {
    id: "public-c",
    cat: "public",
    properties: { name: "Mural X" },
  },
  {
    id: "museum-d",
    cat: "museum",
    properties: { name: "Beta Museum" },
  },
];

describe("CATEGORIES", () => {
  it("maps category keys to display labels", () => {
    expect(CATEGORIES.museum).toBe("Museums");
    expect(CATEGORIES.gallery).toBe("Galleries");
    expect(CATEGORIES.public).toBe("Public Art");
    expect(CATEGORIES.artcentre).toBe("Art Centres");
  });
});

describe("filterFeatures", () => {
  it("returns all features when category is null", () => {
    expect(filterFeatures(mockFeatures, null)).toEqual(mockFeatures);
  });

  it("returns all features when category is undefined", () => {
    expect(filterFeatures(mockFeatures, undefined)).toEqual(mockFeatures);
  });

  it("returns all features when category is empty string", () => {
    expect(filterFeatures(mockFeatures, "")).toEqual(mockFeatures);
  });

  it("filters by museum category", () => {
    const result = filterFeatures(mockFeatures, "museum");
    expect(result).toHaveLength(2);
    expect(result.every((f) => f.cat === "museum")).toBe(true);
  });

  it("filters by gallery category", () => {
    const result = filterFeatures(mockFeatures, "gallery");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("gallery-b");
  });

  it("returns empty array for non-existent category", () => {
    expect(filterFeatures(mockFeatures, "nonexistent")).toEqual([]);
  });
});

describe("sortFeaturesByName", () => {
  it("sorts features alphabetically by name", () => {
    const sorted = sortFeaturesByName(mockFeatures);
    expect(sorted[0].properties.name).toBe("Alpha Gallery");
    expect(sorted[1].properties.name).toBe("Beta Museum");
    expect(sorted[2].properties.name).toBe("Mural X");
    expect(sorted[3].properties.name).toBe("Zeta Museum");
  });

  it("does not mutate the original array", () => {
    const original = [...mockFeatures];
    sortFeaturesByName(mockFeatures);
    expect(mockFeatures).toEqual(original);
  });

  it("handles empty array", () => {
    expect(sortFeaturesByName([])).toEqual([]);
  });

  it("handles single element", () => {
    const single = [mockFeatures[0]];
    expect(sortFeaturesByName(single)).toEqual(single);
  });
});

describe("isVenueOpen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns false when venue has no schedule", () => {
    const venue = { properties: {} };
    expect(isVenueOpen(venue)).toBe(false);
  });

  it("returns false when schedule is undefined", () => {
    const venue = { properties: { open: undefined } };
    expect(isVenueOpen(venue)).toBe(false);
  });

  it("returns true when venue is open at current time", () => {
    // Wednesday at 14:00
    jest.setSystemTime(new Date("2025-01-08T14:00:00"));
    const venue = {
      properties: {
        open: ["Wednesday:10:00 - 18:00"],
      },
    };
    expect(isVenueOpen(venue)).toBe(true);
  });

  it("returns false when venue is closed at current time", () => {
    // Wednesday at 20:00
    jest.setSystemTime(new Date("2025-01-08T20:00:00"));
    const venue = {
      properties: {
        open: ["Wednesday:10:00 - 18:00"],
      },
    };
    expect(isVenueOpen(venue)).toBe(false);
  });

  it("returns false when today is not in the schedule", () => {
    // Monday at 14:00
    jest.setSystemTime(new Date("2025-01-06T14:00:00"));
    const venue = {
      properties: {
        open: ["Wednesday:10:00 - 18:00", "Thursday:10:00 - 18:00"],
      },
    };
    expect(isVenueOpen(venue)).toBe(false);
  });

  it("handles multiple days in the schedule", () => {
    // Thursday at 15:00
    jest.setSystemTime(new Date("2025-01-09T15:00:00"));
    const venue = {
      properties: {
        open: [
          "Wednesday:12:00 - 18:00",
          "Thursday:12:00 - 18:00",
          "Friday:12:00 - 18:00",
        ],
      },
    };
    expect(isVenueOpen(venue)).toBe(true);
  });
});

describe("formatCategoryLabel", () => {
  it("capitalizes first letter", () => {
    expect(formatCategoryLabel("museum")).toBe("Museum");
  });

  it("capitalizes first letter of multi-word", () => {
    expect(formatCategoryLabel("artcentre")).toBe("Artcentre");
  });

  it("returns empty string for null", () => {
    expect(formatCategoryLabel(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(formatCategoryLabel(undefined)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(formatCategoryLabel("")).toBe("");
  });

  it("handles single character", () => {
    expect(formatCategoryLabel("a")).toBe("A");
  });
});
