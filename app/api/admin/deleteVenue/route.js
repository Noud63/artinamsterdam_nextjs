import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Venue from "@/models/venue";
import Rating from "@/models/rating";
import Review from "@/models/review";

export async function DELETE(req) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { venueName } = await req.json();

    if (typeof venueName !== "string" || !venueName.trim()) {
      return Response.json(
        { error: "Venue name is required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const venue = await Venue.findOneAndDelete({ name: venueName.trim() });

    if (!venue) {
      return Response.json({ error: "Venue not found" }, { status: 404 });
    }

    await Review.deleteMany({ venueId: venue._id });
    await Rating.deleteMany({ venueId: venue._id });

    return Response.json({ message: "Venue deleted" });
  } catch (error) {
    console.error("Admin venue delete error:", error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
