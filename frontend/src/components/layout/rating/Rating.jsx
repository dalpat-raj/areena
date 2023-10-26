import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ rating }) => {
  const star = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(<AiFillStar key={i} color="#333" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(<BsStarHalf key={i} color="#333" />);
    } else {
      star.push(<AiOutlineStar key={i} color="#333" />);
    }
  }

  return <div style={{display: "flex"}}>{star}</div>;
};

export default Rating;
