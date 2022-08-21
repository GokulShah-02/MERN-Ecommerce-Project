const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route("/newOrder").post(isAuthenticatedUser, newOrder);

router.route("/myOrder").get(isAuthenticatedUser, getMyOrders);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;
