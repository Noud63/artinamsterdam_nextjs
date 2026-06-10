"use client";

import { useState } from "react";

export default function StarRating({
  max = 5,
  value = 0,
  onChange,
  size = 24,
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (starValue) => {
    if (!onChange) return;

    // toggle off if same value clicked
    if (starValue === value) {
      onChange(0);
    } else {
      onChange(starValue);
    }
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;

        const active = hoverValue
          ? starValue <= hoverValue
          : starValue <= value;

        return (
          <span
            key={i}
            style={{
              cursor: onChange ? "pointer" : "default",
              fontSize: size,
              color: active ? "#f5b301" : "#ccc",
              transition: "color 0.15s ease",
            }}
            // onMouseEnter={() =>
            //   onChange && setHoverValue(starValue)
            // }
            // onMouseLeave={() =>
            //   onChange && setHoverValue(0)
            // }
            onClick={() => handleClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}