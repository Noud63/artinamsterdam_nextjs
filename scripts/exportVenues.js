import { writeFile } from "node:fs/promises";
import dbConnect from "../lib/dbConnect.js";
import Venue from "../models/venue.js";

async function exportVenues() {
  await dbConnect();

  const venues = await Venue.find({})
    .select("-_id -__v -createdAt -updatedAt")
    .lean();

  const fileContent = `export const venues = ${JSON.stringify(
    venues,
    null,
    2
  )};\n`;

  await writeFile("data/venues.js", fileContent, "utf8");

  console.log(`Exported ${venues.length} venues to data/venues.js`);
  process.exit(0);
}

exportVenues().catch((error) => {
  console.error("Venue export failed:", error);
  process.exit(1);
});



//RUN: node scripts/exportVenues.js