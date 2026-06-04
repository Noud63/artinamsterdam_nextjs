function isValidLat(v) {
  return Number.isFinite(v) && v >= -90 && v <= 90;
}

function isValidLng(v) {
  return Number.isFinite(v) && v >= -180 && v <= 180;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const userLat = Number(body.userLat);
  const userLng = Number(body.userLng);
  const venueLat = Number(body.venueLat);
  const venueLng = Number(body.venueLng);
  const venueName = typeof body.venueName === "string" ? body.venueName : "";

  if (
    !isValidLat(userLat) ||
    !isValidLng(userLng) ||
    !isValidLat(venueLat) ||
    !isValidLng(venueLng)
  ) {
    return Response.json(
      { error: "Invalid coordinates: latitude must be -90..90, longitude -180..180" },
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
