"use client";
import React,{useState} from "react";
import Link from "next/link";
import Image from "next/image";

const UserInfo = ({ userInfo }) => {

const [users, setUsers] = useState(userInfo);
const totalReviews = users.flatMap((user) => user.reviews ?? []).length; 

  const deleteUserAccount = async (userId) => {

    // await fetch("/api/admin/deleteUser", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ userId: userId }),
    // });
    setUsers((currentUsers) =>
    currentUsers.filter(
      (user) => user._id.toString() !== userId,
    ),
  );
  };

  const deleteUserReview = async (reviewId) => {

    // await fetch("/api/admin/deleteReview", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ reviewId: reviewId }),
    // });
    setUsers((currentUsers) =>
    currentUsers.map((user) => ({
      ...user,
      reviews: (user.reviews || []).filter(
        (review) => review._id.toString() !== reviewId,
      ),
    })),
  );
  };

  return (
    <div className="flex flex-col justify-center mb-20">
      <div className="flex mb-4 gap-2">
        <Link
          href="/admin"
          className="flex justify-center w-full rounded-full py-3 items-center border-t border-b border-t-yellow-200 border-b-yellow-900 
                    tracking-wider text-white text-lg bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                    cursor-pointerw-full flex justify-center"
        >
          Admin
        </Link>
        <Link
          href="/"
          className="flex justify-center w-full rounded-full py-3 items-center border-t border-b border-t-yellow-200 border-b-yellow-900 
                    tracking-wider text-white text-lg bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                    cursor-pointerw-full flex justify-center"
        >
          map
        </Link>
      </div>

      <h1 className="flex items-center w-full text-2xl font-bold mb-2 border-b py-1 pl-2 bg-white text-yellow-800">
        User Info
      </h1>

      <div className="flex flex-col w-full text-lg mb-2 border border-white text-white py-1 pl-2">
        <div><span className="font-semibold">Users total: </span>{users.length}</div>
        <div><span className="font-semibold">Reviews total: </span>{totalReviews}</div>
      </div>

      <div className="w-full flex justify-center py-5">
              <Image
                src="/images/asterisk.png"
                alt=""
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
              />
            </div>

      {users.map((user) => {
        const userReviews = user.reviews || [];

        return (
          <div key={user._id.toString()}>
            <div className="w-full text-md border pb-2">
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
                <div className="flex justify-between bg-white text-yellow-800 p-2 mb-1">
                  <span className="font-semibold">Reviews:</span>
                  <span> {userReviews.length}</span>
                </div>
                <div className="pl-2 flex flex-col gap-2 px-2 my-2">
                  {userReviews.map((review, index) => (
                    <div
                      key={review._id}
                      className="flex flex-col border p-2 justify-between"
                    >
                      <div className="flex flex-col">
                        <span>
                          {" "}
                          <span className="font-semibold">Text: </span>"
                          {review.text}"{" "}
                        </span>
                        <span>
                          <span className="font-semibold">Venue: </span>
                          {review.venue?.name || "Unknown"}
                        </span>
                        <span>
                          <span className="font-semibold">VenueId: </span>

                          {review.venue?._id?.toString() ||
                            review.venueId.toString()}
                        </span>
                      </div>
                      <button
                        className="mt-2 w-full rounded-full py-2 items-center border-t border-b border-t-red-700 border-b-red-950 
                  tracking-wider text-white bg-[linear-gradient(to_top,rgb(70,0,0,.9),rgb(140,0,0,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                  cursor-pointer"
                        onClick={() => deleteUserReview(review._id.toString())}
                      >
                        Delete Review
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex px-2 my-2">
                  <button
                    type="button"
                    className="w-full rounded-full py-2 items-center border-t border-b border-t-red-700 border-b-red-950 
                  tracking-wider text-white bg-[linear-gradient(to_top,rgb(70,0,0,.9),rgb(140,0,0,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                  cursor-pointer"
                    onClick={() => deleteUserAccount(user._id.toString())}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center py-5">
              <Image
                src="/images/asterisk.png"
                alt=""
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserInfo;
