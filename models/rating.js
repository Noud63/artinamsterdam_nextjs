import { Schema, model, models } from "mongoose";

const RatingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venueId: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
      index: true,
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

// prevent duplicate ratings per user per item
RatingSchema.index({ userId: 1, venueId: 1 }, { unique: true });
const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
