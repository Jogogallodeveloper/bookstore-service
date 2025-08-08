//import the express liberay, wich simplifies buildings web server in Node.js
import express from "express";
import mongoose from "mongoose";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandling from "./middlewares/error-handling.js";
import errorHendling404 from "./middlewares/error-handling-404.js";

const connect = await connectToDatabase();

connect.on("error", (error) => {
  console.error("❌❌ [ERROR]  Failed to Connect to Database", error);
});

connect.once("open", () => {
  console.log("✅✅[SUCCESSFULLY] Database Connected Successfully");
});

// ✅ Create the main Express application instance
const app = express();

// call the function routes
routes(app);

//define middleware to treat error 404
app.use(errorHendling404);


// ✅ define the resource to trate error
app.use(errorHandling);

// ✅ Export the app so it can be used in server.js (or other files)
export default app;