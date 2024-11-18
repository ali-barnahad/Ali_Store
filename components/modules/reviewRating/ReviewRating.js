import useTranslation from "@/hooks/useTranslation";
import React from "react";
import { MdStar, MdStarHalf } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const ReviewRating = ({ rating, maxRating = 5 }) => {
  const { t } = useTranslation("common");
  // Round the rating up to the nearest 0.5
  const roundedRating = Math.ceil(rating * 2) / 2;
  const randomInt = Math.floor(Math.random() * 3000);
  const number = randomInt + 2;
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      if (i <= Math.floor(roundedRating)) {
        stars.push(<MdStar key={i} className="text-yellow-500" />); // Full star
      } else if (i - 0.5 === roundedRating) {
        stars.push(<MdStarHalf key={i} className="text-yellow-500" />); // Half star
      } else {
        stars.push(<MdStar key={i} className="text-gray-400" />); // Empty star in gray
      }
    }
    return stars;
  };

  return (
    <div className="rounded-lg w-72">
      <div className="flex items-center justify-end space-x-2">
        <span className="text-[#08334495] text-lg ml-2 flex items-center">
          (<FaComment />
        </span>

        <span className="text-[#08334495] text-lg flex items-center">
          {number})
        </span>

        <div className="text-yellow-500 text-2xl flex flex-row-reverse">
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;
