import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import StarRating from "./StarRating";
import EditReviewForm from "./EditReviewForm";

const Reviews = ({
  reviews,
  onUpdate,
  feature,
  userId,
  deleteReview
}) => {

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");

  return reviews.map((review, i) => (
    <div
      key={review._id}
      className="flex flex-col mt-4 border-b border-yellow-800 pb-2 mb-4"
    >
      <div className="w-full flex justify-between flex-row border-b border-dotted mb-2">
        <div className="text-lg font-semibold flex flex-row">
          <Image
            src={review.avatar}
            width={28}
            height={28}
            alt="avatar"
            className="rounded-full"
            style={{
              width: "28px",
              height: "auto",
              marginBottom: "5px",
            }}
          />
          <div className="ml-2 flex flex-row items-center gap-2">
            <div>{review?.username}</div>
            <StarRating
              venueId={feature.id}
              userId={userId}
              showAverage={false}
              value={review.value}
            />
          </div>
        </div>
        <div className="flex items-center text-[12px] text-yellow-800/57">
          {formatDate(review.createdAt)}
        </div>
      </div>

      {editingReviewId === review._id ? (
        <EditReviewForm
          reviewId={review._id}
          text={editingText}
          onUpdate={onUpdate}
          setEditingReviewId={setEditingReviewId}
        />
      ) : (
        <div className="mb-2">{review.text}</div>
      )}
      {review.userId === userId && editingReviewId !== review._id && (
        <div className="w-full flex flex-row justify-end items-center gap-2 my-2">
          <div
            className="cursor-pointer border border-yllow-800 rounded-full px-2"
            onClick={() => {
              setEditingReviewId(review._id);
              setEditingText(review.text);
            }}
          >
            Edit
          </div>
          <div
            className="cursor-pointer  border border-yllow-800 rounded-full px-2"
            onClick={() => deleteReview(review._id)}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  ));
};

export default Reviews;
