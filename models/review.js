import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    venueId: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

ReviewSchema.index({ createdAt: -1 }); // latest reviews first
ReviewSchema.index({ userId: 1, createdAt: -1 }); // reviews by user, newest first

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
