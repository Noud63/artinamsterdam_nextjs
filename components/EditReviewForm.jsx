import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

const EditReviewForm = ({ reviewId, text, setEditingReviewId, onUpdate }) => {
  const [currentText, setCurrentText] = useState(text);

  const handleEditReview = async (e) => {
    e.preventDefault();
    try {
      onUpdate(reviewId, currentText);

      setEditingReviewId(null);
      const res = await fetch(`/api/review?reviewId=${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, text: currentText }),
      });

      if (!res.ok) {
        onUpdate(reviewId, prevText); // rollback
        console.error("Edit failed");
      }

      if (res.ok) {
        const data = await res.json();
        console.log(data.review);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleEditReview} className="w-full">
        <textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          className="w-full min-h-[80px] border border-gray-400 rounded-lg p-2 outline-none mb-1"
        />
        <div className="w-full flex flex-row justify-between">
<div><IoMdCloseCircleOutline size={24} color={"#854d0e"} onClick={() => setEditingReviewId(null)} className="cursor-pointer"/></div>
        <button
          type="submit"
            className="flex flex-row gap-1 font-normal text-yellow-800 cursor-pointer"
        >
            
          <IoSendSharp color="#854d0e" size={22}/><span>Send </span>
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default EditReviewForm;
