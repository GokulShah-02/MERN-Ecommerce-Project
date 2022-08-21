const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//Create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
});

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  let apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount
  });
});

//Get a single products
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    success: true,
    product
  });
});

//Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
});

//Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const {rating, comment, productId} = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  const isReviewed = product.Reviews.find(
    rev => rev.user.toString() === req.user._id.toString()
  );

  if(isReviewed) {
    product.Reviews.forEach(rev => {
      if(rev.user.toString() === req.user._id.toString()) {
        rev.rating=rating;
        rev.comment=comment;
      }
    });
  }
  else {
    product.Reviews.push(review);
    product.numOfReviews = product.Reviews.length;
  }

  let avg = 0;
  product.Reviews.forEach(rev => {
    avg += rev.rating;
  });

  product.rating = avg / product.Reviews.length;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if(!product) {
    return next(new ErrorHandler("Product not found"), 404);
  }

  res.status(200).json({
    success: true,
    reviews: product.Reviews
  });
});

//Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if(!product) {
    return next(new ErrorHandler("Product not found"), 404);
  }

  const reviews = product.Reviews.filter(rev => rev._id.toString() !== req.query.id);

  let avg = 0;
  reviews.forEach(rev => {
    avg += rev.rating;
  });

  let ratings = 0;
  if(avg !== 0)
    ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId, {
    Reviews: reviews,
    rating: ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  await product.save({validateBeforeSave: false});
  res.status(200).json({
    success: true
  });
});
