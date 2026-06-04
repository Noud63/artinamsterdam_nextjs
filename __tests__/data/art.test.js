import { art } from "@/data/art";

describe("art data", () => {
  it("is a valid GeoJSON FeatureCollection", () => {
    expect(art.type).toBe("FeatureCollection");
    expect(Array.isArray(art.features)).toBe(true);
    expect(art.features.length).toBeGreaterThan(0);
  });

  it("has unique IDs for every feature", () => {
    const ids = art.features.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("each feature has required properties", () => {
    art.features.forEach((feature) => {
      expect(feature).toHaveProperty("id");
      expect(feature).toHaveProperty("type", "Feature");
      expect(feature).toHaveProperty("cat");
      expect(feature).toHaveProperty("properties.name");
      expect(feature).toHaveProperty("geometry.type", "Point");
      expect(feature).toHaveProperty("geometry.coordinates");
      expect(feature.geometry.coordinates).toHaveLength(2);
    });
  });

  it("all categories are valid", () => {
    const validCategories = ["museum", "gallery", "public", "artcentre"];
    art.features.forEach((feature) => {
      expect(validCategories).toContain(feature.cat);
    });
  });

  it("coordinates are in a reasonable range for the Netherlands", () => {
    art.features.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      // Netherlands approximate bounding box
      expect(lat).toBeGreaterThan(50);
      expect(lat).toBeLessThan(54);
      expect(lng).toBeGreaterThan(3);
      expect(lng).toBeLessThan(8);
    });
  });

  it("every feature has an image property", () => {
    art.features.forEach((feature) => {
      expect(feature.properties.image).toBeTruthy();
    });
  });
});
