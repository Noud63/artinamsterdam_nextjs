"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const avatarRef = useRef();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteSelectedImage = () => {
    setAvatar(null);
    avatarRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("avatar", avatar);
    formData.append("userId", session?.user.id);

    if (!avatar) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    try {
      const res = await fetch("/api/editprofile", {
        method: "POST",
        body: formData,
        headers: {
          enctype: "multipart/form-data",
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        setLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async (userId) => {
    // Implementation for deleting account
    console.log("Deleting account for userId:", userId);
    // try {
    //   const res = await fetch(`/api/deleteaccount/${userId}`, {
    //     method: "DELETE",
    //   });
    // }catch (err) {
    //     console.error(err);
    //   }
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col text-white px-4">
      <h1 className="w-full text-2xl font-bold mb-4 border-b-2 border-dotted pb-2">
        {" "}
        {session?.user?.role?.charAt(0)?.toUpperCase() +
          session?.user?.role?.slice(1)}{" "}
        Profile
      </h1>
      <div className="w-full flex flex-col gap-2 border-b-2 border-dotted pb-5">
        <div className="flex">
          <span className="font-bold w-[100px] flex">Name:</span>{" "}
          {session?.user?.name}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Username:</span>{" "}
          {session?.user?.username}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Email:</span>{" "}
          {session?.user?.email}
        </div>
        <div className="flex">
          <span className="font-bold w-[100px] flex">Avatar:</span>{" "}
          {session?.user?.avatar ? session?.user?.avatar : "No avatar"}
        </div>
      </div>

      <div className="w-full mb-4 flex flex-row justify-between max-xsm:flex-col mt-6">
        <div className="flex w-full flex-col">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between w-full gap-2">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Upload new avatar:</span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    ref={avatarRef}
                    className="sr-only"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="w-fit cursor-pointer rounded border-2 border-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-500"
                  >
                    Choose image
                  </label>
                </div>

                <div className="flex items-center justify-center pt-5">
                  <Image
                    src={
                      session?.user?.avatar
                        ? session?.user?.avatar
                        : "/images/profilepic.png"
                    }
                    alt=""
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] rounded-full"
                  />
                </div>
              </div>

              {avatar && (
                <div className="mt-4 flex w-full flex-row items-center">
                  {avatar.name}
                  <IoMdCloseCircleOutline
                    size={30}
                    color=""
                    className="ml-3 cursor-pointer bg-yellow-600 rounded-full flex items-center justify-center w-[24px] h-[24px]"
                    onClick={() => deleteSelectedImage()}
                  />
                </div>
              )}

              {error && (
                <div className="mb-4 mt-4 flex w-full flex-row items-center rounded-md border border-red-700 bg-red-100 px-4 py-3">
                  <IoWarningOutline
                    size={20}
                    color="darkred"
                    className="mr-2"
                  />
                  <span className="text-red-800"> No image selected!</span>
                </div>
              )}
            </div>

            <div className="flex w-full mt-8 gap-2">
              <button
                disabled
                type="submit"
                className="w-full rounded-full py-2 border-t border-b border-t-yellow-500 border-b-yellow-900 
                  tracking-wider text-white bg-gradient-to-t from-yellow-800 via-yellow-700 to-yellow-600 cursor-pointer"
              >
                {loading ? "...just a moment!" : "Send"}
              </button>

              <button
                type="button"
                onClick={() => window.location.assign("/")}
                className="flex justify-center w-full rounded-full py-2 border-t border-b border-t-yellow-500 border-b-yellow-900 
                    tracking-wider text-white bg-gradient-to-t from-yellow-800 via-yellow-700 to-yellow-600 p-1 cursor-pointer"
              >
                Back
              </button>
            </div>
          </form>

          <div className="w-full flex flex-col mt-6 gap-2">
            <span className="text-md">
              Delete your account? This action is irreversible and will
              permanently delete your account and all associated data.
            </span>
            <button
              disabled={loading}
              type="button"
              className="w-full rounded-full py-2 border-t border-b border-t-red-500 border-b-red-900 mt-4 
                  tracking-wider text-white bg-gradient-to-t from-red-900 via-red-800 to-red-700 cursor-pointer"
              onClick={() => deleteAccount(userId)}
            >
              {loading ? "...processing!" : "Delete account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
