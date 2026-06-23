"use client";
import React, { useState, useEffect } from "react";
import {
  formatDistance,
  estimateWalkingTime,
  getDistanceToVenue,
} from "@/lib/distance";
import { formatCategoryLabel, isVenueOpen } from "@/lib/venue";
import Image from "next/image";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import { formatDate } from "@/lib/formatDate";
import EditReviewForm from "./EditReviewForm";
import LoaderColorCircle from "./LoaderColorCircle";
import WebsiteRouting from "./WebsiteRouting";
import OpeningHours from "./OpeningHours";
import OpenClosedStatus from "./OpenClosedStatus";

export default function VenuePopup({
  feature,
  active,
  sidebarHidden,
  userLocation,
  routing,
  onClose,
  onRoute,
  session,
  avatar,
}) {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!feature?.id) return;

    setLoading(true);

    const getReviews = async () => {
      const res = await fetch(`/api/review?venueId=${feature.id}`);
      const data = await res.json();
      if (!res.ok) {
        console.log("Failed to fetch reviews!");
      }
      setReviews(data.reviews || []);
      setLoading(false);
    };
    getReviews();
  }, [feature?.id]);


  const updateReview = (reviewId, newText) => {
    setReviews((prev) =>
      prev.map((review) => (review._id === reviewId ? { ...review, text: newText } : review)),
    );
  };

  const deleteReview = async (reviewId) => {
    // keep a copy in case we need to rollback
    const previousReviews = reviews;

    // optimistic update
    setReviews((current) =>
      current.filter((review) => review._id !== reviewId),
    );

    try {
      const res = await fetch(`/api/review?reviewId=${reviewId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error(error);

      // rollback
      setReviews(previousReviews);
    }
  };

  // SAFE GUARD FIRST
  if (!feature || !active) {
    return null;
  }

  // const feature = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  const distance = getDistanceToVenue(userLocation, lat, lng);
  const showOpenStatus =
    feature.properties.category !== "public" &&
    feature.properties.name !== "Van Gogh Museum";
  const openNow = isVenueOpen(feature);

  return (
    <div
      className={`wrapper${sidebarHidden ? " left" : ""} active`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="pic">
        <Image
          src={`/images/${feature.properties.image}`}
          alt={feature.properties.name}
          width={350}
          height={200}
          className="puImage h-[200px] w-full object-cover"
        />
      </div>

      <div className="popUpContent pt-2">
        {distance ? (
          <div className="w-full flex flex-row items-center justify-between gap-2 border-b border-dotted pb-1 mb-2">
            <div>📍{formatDistance(distance)}</div>
            <div className="flex gap-1">
              <Image
                src="/images/walk.png"
                alt=""
                height={16}
                width={8}
                className="walkIcon"
                aria-hidden="true"
                style={{ width: "8px", height: "16px" }}
              />
              <span>{estimateWalkingTime(distance)} (5 km/h)</span>
            </div>
          </div>
        ) : (
          <div className="distance">📍 Location unavailable</div>
        )}

        <div className="puName flex justify-between mt-2 text-lg font-bold pl-1">
          <div>{feature.properties.name}</div>

          <button type="button" className="" onClick={onClose}>
            <Image
              src="/images/close.png"
              alt="Close popup"
              className="cursor-pointer"
              width={18}
              height={18}
            />
          </button>
        </div>
        {feature.properties.title ? (
          <div className="puTitle">&quot;{feature.properties.title}&quot;</div>
        ) : null}
        {feature.properties.extra ? (
          <div className="extra3">{feature.properties.extra}</div>
        ) : null}
        {feature.properties.address ? (
          <div className="address">
            <span className="popupSectionTitle">Address:</span>{" "}
            {feature.properties.address}
          </div>
        ) : null}

        <OpenClosedStatus
          showOpenStatus={showOpenStatus}
          openNow={openNow}
          category={feature.properties.category}
        />

        <OpeningHours open={feature.properties?.open} />

         <WebsiteRouting
          link={feature.properties.link}
          onRoute={onRoute}
          feature={feature}
          userLocation={userLocation}
          routing={routing}
        />

        <div className="flex flex-col mt-8 ">
          <span className="font-semibold mb-2">Assess and Review </span>
          <div className="flex w-full flex-row gap-2 items-center">
            <Image
              src={avatar || "/images/avatarRembrandt.png"}
              alt="avatar"
              width={30}
              height={30}
              className="rounded-full"
            />

            <StarRating venueId={feature.id} userId={session?.user.id} />
          </div>
          <ReviewForm
            venueId={feature.id}
            user={session?.user}
            setReviews={setReviews}
            showAverage={true}
          />
        </div>

        <div className="mt-4 text-[16px] font-semibold">
          Reviews{" "}
          <span className="text-sm font-normal">({reviews.length})</span>
        </div>

        {loading ? (
          <LoaderColorCircle />
        ) : (
          reviews.map((review, i) => (
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
                     <StarRating venueId={feature.id} userId={session?.user.id} showAverage={false} value={review.value} />

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
                  onUpdate={updateReview}
                  setEditingReviewId={setEditingReviewId}
                />
              ) : (
                <div className="mb-2">{review.text}</div>
              )}
              {review.userId === session?.user.id &&
                editingReviewId !== review._id && (
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
          ))
        )}
      </div>
    </div>
  );
}
