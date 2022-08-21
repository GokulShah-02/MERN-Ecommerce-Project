import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

function ReviewCard(props) {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: props.review.rating,
    size: window.innerWidth < 600 ? 10 : 20,
    isHalf: true
  };


  return(
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{props.review.name}</p>
      <ReactStars {...options}/>
      <span>{props.review.comment}</span>
    </div>
  );
}

export default ReviewCard;
