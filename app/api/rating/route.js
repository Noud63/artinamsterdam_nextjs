import dbConnect from "@/lib/dbConnect";
import Rating from "@/models/rating";
import { auth } from "@/auth";

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

  const ratings = await Rating.find({ venueId });
  const total = ratings.reduce((sum, r) => sum + r.value, 0);
  const average = total / ratings.length;

  console.log("Average:", average);

  return Response.json({
    value: rating?.value ?? 0,
    average: average < 0 ? 0 : average,
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
