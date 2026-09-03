"use client";
import React, { useEffect, useState } from "react";

const AddVenueForm = () => {
  const [venueName, setVenueName] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const res = await fetch("/api/admin/addVenue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: venueName,
      }),
    });
    const data = await res.json();
    console.log("New venue name:", data.name);
    if(res.ok) {
      setVenueName(""); 
    }
    
  };

  return (
    
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-center flex-col items-center w-full max-w-2xl shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 border-2 border-white"
      >
        <div className="mb-4 flex flex-row">
          <label
            className="flex items-center w-[120px] text-white text-sm font-bold mb-2 py-2"
            htmlFor="venueName"
          >
            Venue Name
          </label>
          <input
            className="w-[400px] shadow appearance-none border-2 border-white rounded px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="venueName"
            type="text"
            placeholder="Venue Name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="adminMenuButton flex justify-center items-center py-3 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    
  );
};

export default AddVenueForm;
