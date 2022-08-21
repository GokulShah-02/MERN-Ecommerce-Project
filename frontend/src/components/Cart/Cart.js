import React, {Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate} from "react-router-dom";

import Loader from "../layout/Loader/Loader";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import MetaData from "../layout/MetaData/MetatData";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cartItems} = useSelector(state => state.cart);

  const {isAuthenticated, loading} = useSelector(state => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if(stock <= quantity)
      return;
    dispatch(addItemsToCart(id, newQty, true));
  };

  const deacreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if(quantity <= 1)
      return;
    dispatch(addItemsToCart(id, newQty, true));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id, true));
  }

  function checkoutHandler() {
    navigate("/login?redirect=shipping");
  }

  return (
    <Fragment>
      {
        loading ?
        <Loader /> :
        <Fragment>
          {cartItems.length === 0 ?
            (
              <div className="emptyCart">
                <RemoveShoppingCartIcon />
                <Typography gutterBottom>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
              </div>
            ) :
            (
              <Fragment>
                <MetaData title="My Cart"/>
                <div className="cartPage">
                  <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                  </div>

                  {cartItems && cartItems.map((item, idx) => (
                    <div className="cartContainer" key={item.product}>
                      <CartItemCard key={idx} item={item} deleteCartItems={deleteCartItems} />
                      <div className="cartInput">
                        <button onClick={() => deacreaseQuantity(item.product, item.quantity)}>
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                          +
                        </button>
                      </div>
                      <p className="cartSubtotal">{`₹${
                        item.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                      <p>Gross Total</p>
                      <p>
                      {`₹${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}
                      </p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <button onClick={checkoutHandler}>Check Out</button>
                    </div>
                  </div>
                </div>
              </Fragment>
            )
          }
        </Fragment>
      }
    </Fragment>
  );
}

export default Cart;
