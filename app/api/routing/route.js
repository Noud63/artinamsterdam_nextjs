export async function POST(request) {
  const { userLat, userLng, venueLat, venueLng, venueName } =
    await request.json();

  const apiKey = process.env.GRAPHHOPPER_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const url = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${venueLat},${venueLng}&vehicle=foot&locale=en&points_encoded=false&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return Response.json({ ...data, venueName });
  } catch {
    return Response.json({ error: "Routing failed" }, { status: 500 });
  }
}
