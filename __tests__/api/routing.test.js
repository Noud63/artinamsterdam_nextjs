/**
 * @jest-environment node
 */
import { POST } from "@/app/api/routing/route";

describe("POST /api/routing", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  function makeRequest(body) {
    return {
      json: () => Promise.resolve(body),
    };
  }

  it("returns 500 when API key is not configured", async () => {
    delete process.env.GRAPHHOPPER_API_KEY;
    const request = makeRequest({
      userLat: 52.37,
      userLng: 4.89,
      venueLat: 52.36,
      venueLng: 4.88,
      venueName: "Test Venue",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("API key not configured");
  });

  it("proxies the request to GraphHopper and returns data with venueName", async () => {
    process.env.GRAPHHOPPER_API_KEY = "test-key";

    const mockRouteData = {
      paths: [{ points: { coordinates: [[4.89, 52.37]] } }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockRouteData),
    });

    const request = makeRequest({
      userLat: 52.37,
      userLng: 4.89,
      venueLat: 52.36,
      venueLng: 4.88,
      venueName: "Rijksmuseum",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("graphhopper.com/api/1/route"),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("key=test-key"),
    );
    expect(data.venueName).toBe("Rijksmuseum");
    expect(data.paths).toEqual(mockRouteData.paths);
  });

  it("returns 500 when fetch fails", async () => {
    process.env.GRAPHHOPPER_API_KEY = "test-key";

    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const request = makeRequest({
      userLat: 52.37,
      userLng: 4.89,
      venueLat: 52.36,
      venueLng: 4.88,
      venueName: "Test Venue",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Routing failed");
  });

  it("includes correct coordinates in the GraphHopper URL", async () => {
    process.env.GRAPHHOPPER_API_KEY = "test-key";

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const request = makeRequest({
      userLat: 52.123,
      userLng: 4.456,
      venueLat: 52.789,
      venueLng: 4.012,
      venueName: "Test",
    });

    await POST(request);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("point=52.123,4.456"),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("point=52.789,4.012"),
    );
  });
});
