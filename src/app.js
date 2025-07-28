//import the express liberay, wich simplifies buildings web server in Node.js
import express from "express";
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


// ✅ Create the main Express application instance
app.use(express.json());

// ✅ Export the app so it can be used in server.js (or other files)
export default app;