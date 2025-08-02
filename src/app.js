//import the express liberay, wich simplifies buildings web server in Node.js
import express from "express";
import mongoose from "mongoose";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

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


// ✅ define the resource to trate error
app.use((error, req, res, next) => {

  //print the error
  console.error("Error: ", error);

  //define de middleware of error - to treat the error on the aplication
  if (error instanceof mongoose.Error.CastError) {
    console.error("❌ Error:", error);
    res.status(400).send({ message: "❌ Internal Server Error !" });
  } else {
    res.status(500).send(error);
  };

});

// ✅ Export the app so it can be used in server.js (or other files)
export default app;