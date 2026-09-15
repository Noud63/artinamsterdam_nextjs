"use client";

import Link from "next/link";

export default function UserInfoError({ reset }) {
  return (
    <div className="flex flex-col items-center mt-20 px-2 text-center">
      <h1 className="w-full text-xl font-bold mb-4 border-b-2 border-dotted">
        User Info
      </h1>
      <p className="mb-6">
        The user information could not be loaded. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full py-3 px-6 border-t border-b border-t-yellow-200 border-b-yellow-900
          bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
        >
          Try again
        </button>
        <Link
          href="/admin"
          className="rounded-full py-3 px-6 flex items-center border-t border-b border-t-yellow-200 border-b-yellow-900
          bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
