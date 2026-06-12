"use client";

import { useEffect, useState } from "react";

export default function StarRating({ venueId }) {
  console.log("ID:", venueId);
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);

  // load existing rating
  useEffect(() => {
    const fetchRating = async () => {
      const res = await fetch(`/api/rating?venueId=${venueId}`);
      const data = await res.json();
      setRating(data.value);
      setAverage(data.average);
      setLoading(false);
    };

    fetchRating();
  }, [venueId]);

  const handleClick = async (value) => {
    const newValue = value === rating ? 0 : value;

    setRating(newValue); // optimistic UI

    await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId,
        value: newValue,
      }),
    });
  };

  // if (loading) return null;

  return (
    <div className="flex gap-1 items-center w-full justify-between">
      <div>
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const active = starValue <= rating;

          return (
            <span
              key={i}
              onClick={() => handleClick(starValue)}
              style={{
                cursor: "pointer",
                fontSize: 24,
                color: active ? "#f5b301" : "#ccc",
              }}
            >
              ★
            </span>
          );
        })}
      </div>

      <div className="">Average: {rating}</div>
    </div>
  );
}
