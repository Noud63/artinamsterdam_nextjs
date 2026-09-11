import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Venue from "@/models/venue";

export async function POST(request) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      id,
      category,
      name,
      title,
      image,
      address,
      extra,
      link,
      open,
      coordinates,
    } = body;

    if (
      typeof id !== "string" ||
      typeof category !== "string" ||
      typeof name !== "string" ||
      !id.trim() ||
      !category.trim() ||
      !name.trim()
    ) {
      return Response.json(
        { error: "ID, category, and name are required" },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      coordinates.some(
        (coordinate) =>
          typeof coordinate !== "number" || !Number.isFinite(coordinate),
      )
    ) {
      return Response.json(
        { error: "Coordinates must contain numeric longitude and latitude" },
        { status: 400 },
      );
    }

    await dbConnect();

    const venue = await Venue.create({
      legacyId: id.trim(),
      category: category.trim(),
      name: name.trim(),
      title: title?.trim() || "",
      image: image?.trim() || "",
      address: address?.trim() || "",
      extra: extra?.trim() || "",
      link: link?.trim() || "",
      open: Array.isArray(open)
        ? open.filter((entry) => typeof entry === "string" && entry.trim())
        : [],
      location: {
        type: "Point",
        coordinates,
      },
    });

    return Response.json(
      { message: "Venue added", venueId: venue._id.toString() },
      { status: 201 },
    );
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json(
        { error: "A venue with this ID already exists" },
        { status: 409 },
      );
    }

    console.error("Failed to add venue", error);
    return Response.json({ error: "Failed to add venue" }, { status: 500 });
  }
}
