"use client";
import React from "react";
import Link from "next/link";

const UserInfo = ({ userInfo }) => {
  const deleteUserAccount = async (userId) => {
    // await fetch("/api/admin/deleteUser", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ userId: userId }),
    // });
  };

  const deleteUserReview = async (reviewId) => {
    // await fetch("/api/admin/deleteReview", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ reviewId: reviewId }),
    // });
  };

  return (
    <div className="flex flex-col justify-center mb-20">
      <div className="flex mb-4 gap-2">
        <Link
          href="/admin"
          className="flex justify-center w-full rounded-full py-3 items-center border-t border-b border-t-yellow-200 border-b-yellow-900 
                    tracking-wider text-white bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.85)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                    cursor-pointerw-full flex justify-center"
        >
          Admin
        </Link>
        <Link
          href="/"
          className="flex justify-center w-full rounded-full py-3 items-center border-t border-b border-t-yellow-200 border-b-yellow-900 
                    tracking-wider text-white bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.85)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                    cursor-pointerw-full flex justify-center"
        >
          map
        </Link>
      </div>

      <h1 className="flex items-center w-full text-xl font-bold mb-2 border-b py-1 pl-2 bg-white text-yellow-800">
        User Info
      </h1>

      {userInfo.map((user) => {
        const userReviews = user.reviews || [];

        return (
          <div
            key={user._id.toString()}
            className="w-full text-md border  mb-6 pb-2"
          >
            <div className="flex flex-col gap-1">
              <div className="px-2 mt-2">
                <span className="font-semibold">ID:</span>
                <span> {user._id.toString()}</span>
              </div>
              <div className="px-2">
                <span className="font-semibold">Name:</span>
                <span> {user.name}</span>
              </div>
              <div className="px-2">
                <span className="font-semibold">Username:</span>
                <span> {user.username}</span>
              </div>
              <div className="px-2 mb-2">
                <span className="font-semibold">Email:</span>
                <span> {user.email}</span>
              </div>
              <div className="flex justify-between bg-white text-yellow-800 px-2 mb-1">
                <span className="font-semibold">Reviews:</span>
                <span> {userReviews.length}</span>
              </div>
              <div className="pl-2 flex flex-col gap-2 px-2 my-2">
                {userReviews.map((review, index) => (
                  <div key={review._id} className="flex flex-col border p-2">
                    <span>
                      {" "}
                      <span className="font-semibold">Text: </span>"
                      {review.text}"{" "}
                    </span>
                    <span>
                      <span className="font-semibold">Venue: </span>
                      {review.venue?.name || "Unknown"} (
                      {review.venue?._id?.toString() ||
                        review.venueId.toString()}
                      )
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex px-2 gap-2">
                <button
                  type="button"
                  className="w-full rounded-full py-2 items-center border-t border-b border-t-red-700 border-b-red-950 
                  tracking-wider text-white bg-[linear-gradient(to_top,rgb(70,0,0,.9),rgb(140,0,0,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                  cursor-pointer"
                  onClick={() => deleteUserAccount(user._id.toString())}
                >
                  Delete User
                </button>
                <button
                  type="submit"
                  className="flex justify-center w-full rounded-full py-2 items-center border-t border-b border-t-yellow-300 border-b-yellow-900 
                    tracking-wider text-white bg-[linear-gradient(to_top,rgb(73,39,0,0.9),rgb(211,142,64,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                    cursor-pointer"
                  onClick={() => deleteUserReview(review._id.toString())}
                >
                  Delete Review
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserInfo;
