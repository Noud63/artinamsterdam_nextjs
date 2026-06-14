import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function GET(req) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ value: 0 });
  }

  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");

  const rating = await Rating.findOne({
    userId: session.user.id,
    venueId,
  });

  const result = await Rating.aggregate([
  {
    $match: {
      venueId: new mongoose.Types.ObjectId(venueId),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: { $avg: "$value" },
      count: { $sum: 1 },
    },
  },
]);

const average = result[0]?.averageRating || 0;
const count = result[0]?.count || 0;

console.log("Average:", average);
console.log("Count:", count);

  return Response.json({
    value: rating?.value ?? 0,
    average: average,
  });
}

export async function POST(req) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { venueId, value } = await req.json();
  console.log("V:", venueId);

  const rating = await Rating.findOneAndUpdate(
    {
      userId: session.user.id,
      venueId,
    },
    {
      $set: { value },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  return Response.json(rating);
}
