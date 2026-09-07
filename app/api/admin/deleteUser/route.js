import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Review from "@/models/review";
import Rating from "@/models/rating";

export async function DELETE(req) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId } = await req.json();

    await dbConnect();

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    await Review.deleteMany({ userId });
    await Rating.deleteMany({ userId });

    return Response.json({ message: "User deleted" });
  } catch (error) {
    console.error("Admin delete user error:", error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
