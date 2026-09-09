import React from "react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Review from "@/models/review";
import Venue from "@/models/venue";
import UserInfo from "@/components/UserInfo";

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
          {
            $lookup: {
              from: Venue.collection.name,
              let: { venueId: "$venueId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$venueId"] },
                  },
                },
                { $project: { _id: 1, name: 1, category: 1 } },
              ],
              as: "venue",
            },
          },
          {
            $set: {
              venue: { $arrayElemAt: ["$venue", 0] },
            },
          },
          { $sort: { createdAt: -1 } },
        ],
        as: "reviews",
      },
    },
  ]);

  const serializedUserInfo = JSON.parse(JSON.stringify(userInfo));

  console.log("Data:", serializedUserInfo);

  return (
    <main className="w-full max-w-[650px] flex flex-col items-center mt-20 px-2 min-h-screen overflow-y-auto mx-auto">
      <UserInfo userInfo={serializedUserInfo} />
    </main>
  );
};

export default UserInfoPage;
