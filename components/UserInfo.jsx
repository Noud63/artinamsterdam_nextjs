"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserInfo = ({ userInfo }) => {
  const router = useRouter();
  const [users, setUsers] = useState(userInfo || []);
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setUsers(userInfo || []);
  }, [userInfo]);

  const filteredUsers = name
    ? users.filter((user) => user.name.toLowerCase() === name.toLowerCase())
    : users;

  const totalReviews = filteredUsers.flatMap(
    (user) => user.reviews ?? [],
  ).length;

  const deleteUserAccount = async (userId) => {
    try {
      // const response = await fetch("/api/admin/deleteUser", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId }),
      // });

      // if (!response.ok) {
      //   throw new Error(`Failed to delete user: ${response.status}`);
      // }

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id.toString() !== userId),
      );
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  const deleteUserReview = async (reviewId) => {
    try {
      // const response = await fetch("/api/admin/deleteReview", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ reviewId }),
      // });

      // if (!response.ok) {
      //   throw new Error(`Failed to delete review: ${response.status}`);
      // }

      setUsers((currentUsers) =>
        currentUsers.map((user) => ({
          ...user,
          reviews: (user.reviews || []).filter(
            (review) => review._id.toString() !== reviewId,
          ),
        })),
      );
    } catch (error) {
      console.error("Delete review failed:", error);
    }
  };

  const filterDb = () => {
    setName(searchName.trim());
    setSearchName("");
  };

  const refreshPage = () => {
    setName("");
    setSearchName("");
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex w-full max-w-[650px] flex-col justify-center mb-20">
      <div className="flex mb-4 gap-2 flex-col">
        <div className="flex flex-row gap-2">
          <Link
            href="/admin"
            className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
          >
            Admin
          </Link>
          <Link
            href="/"
            className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
          >
            Map
          </Link>
        </div>

        <div className="relative w-full max-w-[650px] mt-4">
          <input
            className="focus:shadow-outline w-full border px-3 py-3 leading-tight focus:outline-none"
            id="search-db"
            type="search"
            placeholder="Enter name user"
            required
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            type="button"
            className="w-full rounded-full py-3 mt-4 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
            onClick={filterDb}
          >
            Search
          </button>
          <button
            type="button"
            aria-label="Refresh users"
            className="absolute right-0 top-[5px]"
            onClick={refreshPage}
          >
            <Image
              src="/images/refreshIcon.png"
              alt=""
              width={40}
              height={40}
              className={isRefreshing ? "animate-[spin_1s_ease-in-out]" : ""}
              style={{ width: "40px", height: "auto" }}
            />
          </button>
        </div>
      </div>

      <h1 className="w-full max-w-[650px] flex items-center w-full text-2xl font-bold mb-2 py-1 pl-4 text-white">
        User Info
      </h1>

      <div className="w-full max-w-[650px] flex flex-col w-full text-lg mb-2 border border-white text-white py-1 pl-4">
        <div>
          <span className="font-semibold">Users total: </span>
          {filteredUsers.length}
        </div>
        <div>
          <span className="font-semibold">Reviews total: </span>
          {totalReviews}
        </div>
      </div>

      <div className="w-full max-w-[650px] flex justify-center py-5">
        <Image
          src="/images/asterisk.png"
          alt=""
          width={20}
          height={20}
          style={{ width: "20px", height: "20px" }}
        />
      </div>

      {filteredUsers.map((user) => {
        const userReviews = user.reviews || [];

        return (
          <div key={user._id.toString()} className="w-full max-w-[650px] ">
            <div className="w-full text-md border pb-2">
              <div className="flex flex-col gap-1">
                <div className="pl-4 mt-2">
                  <span className="font-semibold">ID:</span>
                  <span> {user._id.toString()}</span>
                </div>
                <div className="pl-4">
                  <span className="font-semibold">Name:</span>
                  <span> {user.name}</span>
                </div>
                <div className="pl-4">
                  <span className="font-semibold">Username:</span>
                  <span> {user.username}</span>
                </div>
                <div className="pl-4 mb-2">
                  <span className="font-semibold">Email:</span>
                  <span> {user.email}</span>
                </div>
                <div className="flex justify-center bg-white text-yellow-800 p-2 mb-1 gap-2">
                  <span className="font-semibold">Reviews: </span>
                  <span> {userReviews.length}</span>
                </div>
                <div className="pl-2 flex flex-col gap-4 px-2 my-2">
                  {userReviews.map((review, index) => (
                    <div
                      key={review._id}
                      className="flex flex-col border-b border px-2 pt-2 pb-3 justify-between"
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
                  tracking-wider text-white bg-[linear-gradient(to_top,rgb(70,0,0,1),rgb(140,0,0,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
                  cursor-pointer"
                        onClick={() => deleteUserReview(review._id.toString())}
                      >
                        Delete Review
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex px-4 my-2">
                  <button
                    type="button"
                    className="w-full rounded-full py-2 items-center border-t border-b border-t-red-700 border-b-red-950 
                  tracking-wider text-white bg-[linear-gradient(to_top,rgb(70,0,0,1),rgb(140,0,0,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center 
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
