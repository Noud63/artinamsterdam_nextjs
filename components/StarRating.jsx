"use client";

import { useEffect, useState, useMemo } from "react";

export default function StarRating({ venueId }) {
  const [userValue, setUserValue] = useState(0);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  const displayedAverage = useMemo(() => {
    return count === 0
      ? 0
      : average;
  }, [average, count]);

  // initial load
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/rating?venueId=${venueId}`);
      const data = await res.json();
      
      setUserValue(data.userValue);
      setAverage(data.average);
      setCount(data.count);
    };

    load();
  }, [venueId]);

  const handleClick = async (value) => {
  const newValue = value === userValue ? 0 : value;

  setUserValue(newValue); // optimistic

  const res = await fetch("/api/rating", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ venueId, value: newValue }),
  });

  const data = await res.json();

  // 🔥 sync server truth immediately
  setAverage(data.average);
  setCount(data.count);
};

  return (
    <div className="flex justify-between w-full items-center">
      <div>
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const active = starValue <= userValue;

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

      <div>
        Average:{" "}
        {Number.isInteger(displayedAverage)
          ? displayedAverage
          : displayedAverage.toFixed(1)}
      </div>
    </div>
  );
}