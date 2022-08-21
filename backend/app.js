const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

dotenv.config({path:"backend/config/config.env"});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Route Import
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
