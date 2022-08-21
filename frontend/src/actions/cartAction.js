import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_ITEMS,
} from "../constants/cartConstants";

//Add item to cart
export const addItemsToCart = (id, quantity, isAuthenticated=false) => async(dispatch, getState) => {
  const {data} = await axios.get(`/api/products/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity
    }
  });

  if(isAuthenticated) {
    const config = {headers: {"Content-Type": "application/json"}};
    const {temp_data} = await axios.put(
      `/api/user/me/update/cart`,
      getState().cart.cartItems,
      config
    );
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove item from cart
export const removeItemsFromCart = (id, isAuthenticated=false) => async(dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  if(isAuthenticated) {
    const config = {headers: {"Content-Type": "application/json"}};
    const cart = getState().cart.cartItems;
    const {temp_data} = await axios.put(
      `/api/user/me/update/cart`,
      getState().cart.cartItems,
      config
    );
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Clear Cart
export const clearCartItems = () => async(dispatch, getState) => {
  dispatch({
    type: CLEAR_CART_ITEMS
  });

  const config = {headers: {"Content-Type": "application/json"}};
  const {temp_data} = await axios.put(
    `/api/user/me/update/cart`,
    getState().cart.cartItems,
    config
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//Save shipping Info
export const saveShippingInfo = (data) => async(dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}
