import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import {clearCartItems} from "../../actions/cartAction";

import "./OrderSuccess.css";


const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartItems());
  }, [dispatch]);
  
  return (
    <div className="orderSuccess">
    <CheckCircleIcon />
      <Typography gutterBottom>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
