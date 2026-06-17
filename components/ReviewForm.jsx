"use client";
import React, { useState } from "react";

const ReviewForm = ({ venueId, user }) => {
  const [text, setText] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId, text}),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();

      if (res.ok) {
        console.log("Data:", data);
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
          placeholder={
            user ? "Write a review..." : "Please sign in to write a review"
          }
          value={text}
          disabled={!user}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[80px] border border-gray-400 rounded-lg p-2 outline-none mb-1"
        />
        <button
          type="submit"
          disabled={!user}
          className="w-full border-t border-b border-t-yellow-300 border-b-yellow-900 flex justify-center p-3 text-[16px] tracking-widest font-semibold text-white bg-[linear-gradient(to_top,rgba(73,39,0,0.8),rgba(211,142,64,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center rounded-lg outline-none focus:outline-none focus:ring-0"
        >
          Send
        </button>
      </form>

    </div>
  );
};

export default ReviewForm;
