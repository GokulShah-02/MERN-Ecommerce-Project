const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require("../controllers/productController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route("/").get(getAllProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/product/:id").get(getProductDetails);

router.route("/admin/newProduct").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


module.exports = router;
