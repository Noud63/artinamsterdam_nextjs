import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review";
import mongoose from "mongoose";
import User from "@/models/user";
import { auth } from "@/auth";
import Rating from "@/models/rating";

export async function DELETE(req) {
  try {
    await dbConnect();

    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return Response.json({
      message: "Account deleted!",
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
