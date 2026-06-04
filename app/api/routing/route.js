export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { userLat, userLng, venueLat, venueLng, venueName } = body;

  if (
    userLat == null ||
    userLng == null ||
    venueLat == null ||
    venueLng == null
  ) {
    return Response.json(
      { error: "Missing required coordinates" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GRAPHHOPPER_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const url = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${venueLat},${venueLng}&vehicle=foot&locale=en&points_encoded=false&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(
        `GraphHopper API error (${response.status}): ${errorText}`,
      );
      return Response.json(
        { error: `Routing service error (${response.status})` },
        { status: 502 },
      );
    }

    const data = await response.json();

    return Response.json({ ...data, venueName });
  } catch (error) {
    console.error("Routing request failed:", error);
    return Response.json({ error: "Routing failed" }, { status: 500 });
  }
}
