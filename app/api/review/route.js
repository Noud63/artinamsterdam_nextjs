import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review";
import mongoose from "mongoose";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const con = await dbConnect();

    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, venueId, text } = await req.json();

    const review = await Review.findOne({userId, venueId}).lean();

    console.log("Review:", review === null ? "no reviews" : review)

    if(!review){
        const newReview = await Review.create({
            userId,
            venueId,
            text
        })
            console.log("Text:", newReview);
    }



    return Response.json({
      text,
    });
  } catch (error) {

  }
}
