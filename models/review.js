import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

ReviewSchema.index({ createdAt: -1 }); // latest reviews first
ReviewSchema.index({ userId: 1, createdAt: -1 }); // reviews by user, newest first

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
