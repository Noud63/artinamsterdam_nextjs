"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DeleteVenueForm = () => {
  const [venueName, setVenueName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    // setMessage("");

    // const response = await fetch("/api/admin/deleteVenue", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ venueName }),
    // });

    // const result = await response.json();

    // if (!response.ok) {
    //   setMessage(result.error || "Failed to delete venue");
    //   return;
    // }

    setVenueName("");
    setMessage("Venue deleted");
    setTimeout(() => setMessage(""), 3000);
    router.refresh();
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center min-h-screen mb-20">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label
          htmlFor="venueName"
          className="w-full text-3xl font-semibold mb-2 border-b-2 border-dotted pb-2"
        >
          Delete Venue
        </label>
        <input
          id="venueName"
          name="venueName"
          value={venueName}
          placeholder="Venue name"
          onChange={(event) => setVenueName(event.target.value)}
          required
          className="border px-3 py-2 rounded-lg focus:outline-none mb-2"
        />

        {message && (
          <div className="bg-linear-to-t from-red-400 to-red-200 p-2 rounded-lg text-red-800 tracking-wide font-semibold">
            {message}!
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
        >
          Delete venue
        </button>
      </form>

      <Link
        href="/admin"
        className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,.9),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest mt-4"
      >
        Back
      </Link>
    </div>
  );
};

export default DeleteVenueForm;
