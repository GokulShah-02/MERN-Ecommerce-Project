const dotenv = require("dotenv");
const app = require("./app.js");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database.js");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({path:"backend/config/config.env"});

//Connecting to Database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


//Unhandles Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
})
