"use client";

import { useEffect, useState, useMemo } from "react";

export default function StarRating({
  venueId,
  userId,
  showAverage = true,
  value = 0,
}) {
  const [userValue, setUserValue] = useState(0);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  const displayedAverage = useMemo(() => {
    return count === 0 ? 0 : average;
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
    <div className="flex flex-row justify-between w-full items-center">
      <div>
         {Array.from({ length: 5 }).map((_, i) => {
    const starValue = i + 1;

    return showAverage ? (
      <span
        key={i}
        onClick={userId ? () => handleClick(starValue) : undefined}
        style={{
          cursor: "pointer",
          fontSize: 24,
          color: starValue <= userValue ? "#f5b301" : "#ccc",
        }}
      >
        ★
      </span>
    ) : (
      <span
        key={i}
        style={{
          fontSize: 16,
          color: starValue <= value ? "#f5b301" : "#ccc",
        }}
      >
        ★
      </span>
    );
  })}
      </div>

      {showAverage && (
        <div>
          Average:{" "}
          {Number.isInteger(displayedAverage)
            ? displayedAverage
            : displayedAverage.toFixed(1)}
        </div>
      )}
    </div>
  );
}
