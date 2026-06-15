// app/api/rating/route.js (GET)
import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating";
import mongoose from "mongoose";
import { auth } from "@/auth";

export async function GET(req) {
  await dbConnect();

  const session = await auth();
  const userId = session?.user?.id;

  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");

  if (!venueId) {
    return Response.json({ error: "venueId required" }, { status: 400 });
  }

  const objectId = new mongoose.Types.ObjectId(venueId);

  // user rating
  const userRating = userId
    ? await Rating.findOne({ userId, venueId: objectId })
    : null;

  // aggregation (fast, single pass)
  const stats = await Rating.aggregate([
  { $match: { venueId: new mongoose.Types.ObjectId(venueId) } },
  {
    $group: {
      _id: null,
      average: { $avg: "$value" },
      count: { $sum: 1 },
      total: { $sum: "$value" }, // optional if you want it
    },
  },
]);

const result = stats[0] || { average: 0, count: 0, total: 0 };
  console.log("Result:", result)

  return Response.json({
    userValue: userRating?.value ?? 0,
    average: result.average,
    count: result.count
  });
}

// POST
export async function POST(req) {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { venueId, value } = await req.json();
  const userId = session.user.id;

  if (value === 0) {
    await Rating.deleteOne({ userId, venueId });
  } else {
    await Rating.findOneAndUpdate(
      { userId, venueId },
      { $set: { value } },
      { upsert: true, new: true }
    );
  }

  // 🔥 recompute fresh stats AFTER update
  const stats = await Rating.aggregate([
    { $match: { venueId: new mongoose.Types.ObjectId(venueId) } },
    {
      $group: {
        _id: null,
        average: { $avg: "$value" },
        count: { $sum: 1 },
      },
    },
  ]);

  const result = stats[0] || { average: 0, count: 0 };

  return Response.json({
    value,
    average: result.average,
    count: result.count,
  });
}