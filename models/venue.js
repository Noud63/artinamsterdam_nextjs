import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const VenueSchema = new Schema(
  {
    legacyId: { type: String, index: true, unique: true }, // your JSON id

    name: String,
    category: String,

    title: String,
    image: String,
    address: String,
    extra: String,
    link: String,
    open: [String],

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
  },
  { timestamps: true },
);

// geospatial index (important later for "near me")
VenueSchema.index({ location: "2dsphere" });

const Venue = models.Venue || model("Venue", VenueSchema);

export default Venue;
