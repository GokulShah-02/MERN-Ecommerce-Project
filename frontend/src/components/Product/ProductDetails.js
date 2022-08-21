import React, {Fragment, useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {
	Row,
	Col,
} from 'react-bootstrap';
import {useAlert} from "react-alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import {getProductDetails, clearErrors, newReview} from "../../actions/productAction";
import "./ProductDetails.css";
import ImageMagnifier from "./ImageMagnifier";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData/MetatData";
import {addItemsToCart} from "../../actions/cartAction";
import {NEW_REVIEW_RESET, PRODUCT_DETAILS_RESET} from "../../constants/productConstants";

const ProductDetails = () => {
	const alert = useAlert();
  const dispatch = useDispatch();
	const navigate = useNavigate();

  let {id} = useParams();
  const {product, loading, error} = useSelector(state => state.productDetails);

	const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

	const {isAuthenticated, loading: userLoading} = useSelector((state) => state.user);

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const increaseQuantity = () => {
		if(product.Stock <= quantity)
			return;
		setQuantity(quantity + 1);
	}

	const decreaseQuantity = () => {
		if(quantity === 1)
			return;
		setQuantity(quantity - 1);
	}

	const addtoCartHandler = () => {
		dispatch(addItemsToCart(id, quantity, isAuthenticated));
		alert.success("Item Added to Cart");
	};

	const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

	const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };


  useEffect(() => {
		if(error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

		if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
			dispatch({type: PRODUCT_DETAILS_RESET});
    }

    dispatch(getProductDetails(id));

  }, [dispatch, id, error, alert, reviewError, success]);

  const options= {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 10 : 20,
    isHalf: true
  };

  return (
    <Fragment>
      {
        (loading || userLoading) ? (<Loader />) : (
					<Fragment>
						<MetaData title={`${product.name} -- ECOMMERCE`}/>
						<div className="ProductDetails">
	            <Row>
	              <Col md={6}>
									<div className="detailsDiv detailsDiv1">
										<div className="imageDiv">
											<button className="btn btn-outline-primary my-2" onClick={() => navigate(-1)}>
								        Go Back
								      </button>
			                {
			                  product.images &&
			                  <ImageMagnifier
			                    images={product.images}
			                    alt={product.name}
			                    title={product.name}
			                  />
			                }
										</div>
									</div>
	              </Col>

	              <Col md={6}>
									<div className="detailsDiv detailsDiv2">
										<div className="detailsBlock-1">
											<h2>{product.name}</h2>
											<p>Product # {product._id}</p>
										</div>

										<div className="detailsBlock-2">
											<ReactStars {...options} value={product.rating}/>
											<span className="detailsBlock-2-span">
												{" "}
												({product.numOfReviews} Reviews)
											</span>
										</div>

										<div className="detailsBlock-3">
											<h1>{`₹${product.price}`}</h1>
											<div className="detailsBlock-3-1">
												<div className="detailsBlock-3-1-1">
													<button onClick={decreaseQuantity}>-</button>
													<input readOnly type="number" value={quantity}/>
													<button onClick={increaseQuantity}>+</button>
												</div>
												<button
													disabled={product.Stock < 1 ? true : false}
													onClick={addtoCartHandler}
												>
														Add to Cart
												</button>
											</div>

											<p>
												Status:{(" ")}
												<b className={product.Stock < 1 ? "redColor" : "greenColor"}>
													{product.Stock < 1 ? "OutOfStock" : "InStock"}
												</b>
											</p>
										</div>

										<div className="detailsBlock-4">
											Description : <p>{product.description}</p>
										</div>

										<button onClick={submitReviewToggle} className="submitReview">
											Submit Review
										</button>
									</div>
	  						</Col>
	            </Row>
						</div>

						<h3 className="reviewsHeading">REVIEWS</h3>

						<Dialog
	            aria-labelledby="simple-dialog-title"
	            open={open}
	            onClose={submitReviewToggle}
	          >
	            <DialogTitle>Submit Review</DialogTitle>
	            <DialogContent className="submitDialog">
	              <Rating
	                onChange={(e) => setRating(Number(e.target.value))}
	                value={rating}
	                size="large"
	              />

	              <textarea
	                className="submitDialogTextArea"
	                cols="30"
	                rows="5"
	                value={comment}
	                onChange={(e) => setComment(e.target.value)}
	              ></textarea>
	            </DialogContent>
	            <DialogActions>
	              <Button onClick={submitReviewToggle} color="secondary">
	                Cancel
	              </Button>
	              <Button onClick={reviewSubmitHandler} color="primary">
	                Submit
	              </Button>
	            </DialogActions>
	          </Dialog>

						{
							product.Reviews && product.Reviews[0] ? (
								<div className="reviews">
									{
										product.Reviews &&
										product.Reviews.map((review, idx) => <ReviewCard key={idx} review={review} />)
									}
								</div>
							) : (
								<p className="noReviews">No Reviews Yet</p>
							)
						}
					</Fragment>
        )
      }
    </Fragment>
  );
}

export default ProductDetails;
