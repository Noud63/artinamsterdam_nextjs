import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review";
import mongoose from "mongoose";
import User from "@/models/user";
import { auth } from "@/auth";
import Rating from "@/models/rating";

export async function POST(req) {
  try {
    const con = await dbConnect();

    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { venueId, text } = await req.json();
    const user = await User.findById(session.user.id);

    const newReview = await Review.create({
      userId: session.user.id,
      venueId,
      text,
      username: user.username,
      avatar: user.avatar,
    });

    const rating = await Rating.findOne({
      venueId,
      userId: session.user.id,
    });

    return Response.json({
      newReview: {
        ...newReview.toObject(),
        value: rating?.value || 0,
      },
    });
  } catch (error) {
    console.log(error)
  }
}

export async function GET(req) {
  try {
    const con = await dbConnect();

    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    const reviews = await Review.find({ venueId }).sort({ createdAt: -1 });

    const reviewsWithRatings = await Promise.all(
      reviews.map(async (review) => {
        const rating = await Rating.findOne({
          venueId,
          userId: review.userId,
        });

        return {
          ...review.toObject(),
          value: rating?.value || 0,
        };
      }),
    );

    return Response.json({
      reviews: reviewsWithRatings,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("reviewId");

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      userId: session.user.id, // only owner can delete
    });

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return Response.json({ error: "Invalid review id" }, { status: 400 });
    }

    if (!review) {
      return Response.json(
        { error: "Review not found or not authorized" },
        { status: 404 },
      );
    }

    return Response.json({
      message: "Review deleted!",
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reviewId, text } = await req.json();
    // console.log("ID:", text)

    const updated = await Review.findOneAndUpdate(
      {
        _id: reviewId,
        userId: session.user.id, // security
      },
      { $set: { text } },
      { returnDocument: "after" },
    );

    return Response.json({ review: updated });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
