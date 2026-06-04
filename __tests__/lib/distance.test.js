import {
  calculateDistance,
  estimateWalkingTime,
  formatDistance,
  getDistanceToVenue,
} from "@/lib/distance";

describe("calculateDistance", () => {
  it("returns 0 for the same point", () => {
    expect(calculateDistance(52.37, 4.89, 52.37, 4.89)).toBe(0);
  });

  it("calculates distance between two Amsterdam locations", () => {
    // Rijksmuseum (52.3600, 4.8852) → Central Station (52.3791, 4.9003)
    const d = calculateDistance(52.36, 4.8852, 52.3791, 4.9003);
    expect(d).toBeGreaterThan(1);
    expect(d).toBeLessThan(3);
  });

  it("calculates a known distance (Amsterdam → Rotterdam ≈57 km)", () => {
    const d = calculateDistance(52.3676, 4.9041, 51.9225, 4.4792);
    expect(d).toBeGreaterThan(50);
    expect(d).toBeLessThan(65);
  });

  it("handles negative coordinates", () => {
    const d = calculateDistance(-33.8688, 151.2093, -37.8136, 144.9631);
    expect(d).toBeGreaterThan(700);
    expect(d).toBeLessThan(800);
  });
});

describe("estimateWalkingTime", () => {
  it("returns minutes for short distances", () => {
    // 1 km at 5 km/h = 12 min
    expect(estimateWalkingTime(1)).toBe("12 min walk");
  });

  it("returns hours and minutes for longer distances", () => {
    // 6 km at 5 km/h = 72 min = 1h 12m
    expect(estimateWalkingTime(6)).toBe("1h 12m walk");
  });

  it("returns 0 min walk for 0 distance", () => {
    expect(estimateWalkingTime(0)).toBe("0 min walk");
  });

  it("returns exactly 1h 0m walk for 5 km", () => {
    expect(estimateWalkingTime(5)).toBe("1h 0m walk");
  });

  it("handles very short distances", () => {
    // 0.1 km at 5 km/h = 1.2 min → rounded to 1 min
    expect(estimateWalkingTime(0.1)).toBe("1 min walk");
  });
});

describe("formatDistance", () => {
  it("formats sub-kilometer distances in meters", () => {
    expect(formatDistance(0.5)).toBe("500 m");
  });

  it("formats 1+ km distances with one decimal", () => {
    expect(formatDistance(2.345)).toBe("2.3 km");
  });

  it("formats exactly 1 km", () => {
    expect(formatDistance(1)).toBe("1.0 km");
  });

  it("formats very small distances", () => {
    expect(formatDistance(0.05)).toBe("50 m");
  });

  it("rounds meters correctly", () => {
    expect(formatDistance(0.999)).toBe("999 m");
  });
});

describe("getDistanceToVenue", () => {
  it("returns null when userLocation is null", () => {
    expect(getDistanceToVenue(null, 52.37, 4.89)).toBeNull();
  });

  it("returns null when userLocation is undefined", () => {
    expect(getDistanceToVenue(undefined, 52.37, 4.89)).toBeNull();
  });

  it("returns a distance when userLocation is provided", () => {
    const userLocation = { lat: 52.36, lng: 4.8852 };
    const d = getDistanceToVenue(userLocation, 52.3791, 4.9003);
    expect(d).toBeGreaterThan(0);
    expect(typeof d).toBe("number");
  });

  it("returns 0 when user is at the venue", () => {
    const userLocation = { lat: 52.37, lng: 4.89 };
    expect(getDistanceToVenue(userLocation, 52.37, 4.89)).toBe(0);
  });
});
