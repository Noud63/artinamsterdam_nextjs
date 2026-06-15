"use client";
import React, { useState } from "react";

const ReviewForm = ({ venueId, userId }) => {
  const [text, setText] = useState("");
  const [review, setReview] = useState("");

  console.log(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId, text, userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();

      if (res.ok) {
        console.log("Data:", data.text);
        setReview(data.text);
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          placeholder="Write a review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[50px] border border-gray-400 rounded-lg p-2 outline-none"
        />
        <button
          type="submit"
          className="w-full flex justify-center p-3 text-[16px] tracking-widest font-semibold text-white bg-[linear-gradient(to_top,rgba(73,39,0,0.8),rgba(211,142,64,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center rounded-lg outline-none focus:outline-none focus:ring-0"
        >
          Send
        </button>
      </form>

      {/* <div className="mt-4 px-1">{review}</div> */}
    </div>
  );
};

export default ReviewForm;
