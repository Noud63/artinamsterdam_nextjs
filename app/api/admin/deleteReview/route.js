import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review";

export async function DELETE(req) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { reviewId } = await req.json();

    await dbConnect();

    const review = await Review.findByIdAndDelete({ _id: reviewId });

    if (!review) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Admin delete review error:", error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
