// a script placed in the project root (e.g. scripts/seedVenues.js) is not part of the Next.js bundle by default.
// For seeding add import dotenv from "dotenv"; and dotenv.config({ path: ".env" }); to dbConnect file
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect.js";
import Venue from "../models/venue.js";

// import your GeoJSON
import { art } from "../data/art.js";

async function seed() {
  await dbConnect();

  console.log("Seeding venues...");

  for (const feature of art.features) {
    const {
      id,
      cat,
      properties,
      geometry,
    } = feature;

    await Venue.findOneAndUpdate(
      { legacyId: id }, // id = name of venue, prevents duplicates
      {
        legacyId: id,
        category: cat,

        name: properties.name,
        title: properties.title,
        image: properties.image,
        address: properties.address,
        extra: properties.extra,
        link: properties.link,
        open: properties.open || [],

        location: {
          type: "Point",
          coordinates: geometry.coordinates,
        },
      },
      { upsert: true, returnDocument: "after" }
    );
  }

  console.log("Seeding complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

