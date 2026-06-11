import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Venue from "@/models/venue";

export async function GET() {
  try {
    await dbConnect();

    const venues = await Venue.find({})
      .lean();

    return NextResponse.json(venues);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}