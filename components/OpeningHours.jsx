import React from "react";

const OpeningHours = ({open, cat}) => {
  return (
    <div>
      {" "}
      {open ? (
        <div className="openingHours">
          <span className="popupSectionTitle">{cat === "public" ? "" : "Opening hours:"}</span>
          {open.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default OpeningHours;
