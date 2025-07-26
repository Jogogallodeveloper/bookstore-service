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

//✅ DELETE /books:id - delete a specific book
// app.delete("/books/:id", (req, res) => {
//   // ✅ Extract ID from route parameters
//   const id = parseInt(req.params.id);

//   // ⚠️ Validate input
//   if (!id) {
//     return res.status(400).send("Invali data. 'ID' is required");
//   }

//   // find index of the book whit given ID
//   const index = books.findIndex((books) => books.id === id);

//   // ⚠️ Check if the book exists
//   if (index === -1) {
//     return res.status(404).send("Book not found.");
//   }

//   // DELETE the book
//   books.splice(index, 1);

//   // define the response
//   res.status(200).send("The Book Was Deleted with Sucess");
// });

// ✅ Export the app so it can be used in server.js (or other files)
export default app;