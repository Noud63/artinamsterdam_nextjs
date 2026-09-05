import React from "react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Review from "@/models/review";
import Link from "next/link";

const UserInfoPage = async () => {
  await dbConnect();

  const userInfo = await User.aggregate([
    {
      $lookup: {
        from: Review.collection.name,
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$userId", "$$userId"] },
            },
          },
          { $sort: { createdAt: -1 } },
        ],
        as: "reviews",
      },
    },
  ]);

  console.log("UserInfo:", userInfo);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="w-full text-xl font-bold mb-4 border-b pb-2">User Info</h1>

      {userInfo.map((user) => {
        const userReviews = user.reviews || [];

        return (
          <div key={user._id.toString()} className="text-lg border-b mb-6 pb-2">
            <div>
              <div>
                <span className="font-semibold">_id:</span>
                <span> {user._id.toString()}</span>
              </div>
              <div>
                <span className="font-semibold">Name:</span>
                <span> {user.name}</span>
              </div>
              <div>
                <span className="font-semibold">Username:</span>
                <span> {user.username}</span>
              </div>
              <div>
                <span className="font-semibold">Email:</span>
                <span> {user.email}</span>
              </div>
              <div>
                <span className="font-semibold">Reviews:</span>
                <span> {userReviews.length}</span>
              </div>
              <ul className="list-disc list-inside">
                {userReviews.map((review) => (
                  <li key={review._id.toString()}>{review.text}</li>
                ))}
              </ul>
              <div>
                <span className="font-semibold">Ratings:</span>
                <span> {3}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  );
};

export default UserInfoPage;
