import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function ProductCard(props) {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: props.product.rating,
    size: window.innerWidth < 600 ? 10 : 20,
    isHalf: true
  };

  return(
    <Link className="productCard" to={ `/product/${props.product._id}`} >
      <img src={props.product.images[0].url} alt={props.product.name} style={{height: "75%"}}/>
      <p>{props.product.name}</p>
      <div>
        <ReactStars {...options} /> <span> ({props.product.numOfReviews} Reviews)</span>
      </div>
      <span>Price : {`₹${props.product.price}`}</span>
    </Link>
  );
}

export default ProductCard;
