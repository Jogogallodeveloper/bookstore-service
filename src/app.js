//import the express liberay, wich simplifies buildings web server in Node.js
import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import book from "./models/book.js";

const connect = await connectToDatabase();

connect.on("error", (error) => {
  console.error("❌❌ [ERROR]  Failed to Connect to Database", error);
});

connect.once("open", () => {
  console.log("✅✅[SUCCESSFULLY] Database Connected Successfully");
});

// ✅ Create the main Express application instance
const app = express();
// ✅ Create the main Express application instance
app.use(express.json());



// ✅ Home route — just to confirm that the server is running
app.get("/", (req,res) => {
    res.status(200).send("Route Listening!✅")
});

// ✅ GET /books — returns the list of all books in JSON format
app.get("/books", async (req, res) => {
    
    const listBooks = await book.find({});

    console.log("📄 Resultado vindo do Mongo:", listBooks); // Adiciona isso
    
    res.status(200).json(listBooks);
});

//✅ GET /books:id - returns only the book set on the ID
app.get("/books/:id", (req, res) => {
    const index = findbook(req.params.id);
     
    res.status(200).json(books[index]);
});

// ✅ PUT /books/:id — updates a specific book by its ID
app.put("/books/:id", (req, res) => {
  // ✅ Extract ID from route parameters
  const id = parseInt(req.params.id);

  // ✅ Extract title from request body
  const { title } = req.body;

  // ⚠️ Validate input
  if (!id || !title) {
    return res
      .status(400)
      .send("Invalid data. 'id' and 'title' are required.");
  }

  // ✅ Find the index of the book to update
  const index = books.findIndex((book) => book.id === id);

  // ⚠️ Check if the book exists
  if (index === -1) {
    return res.status(404).send("Book not found.");
  }

  // ✅ Update the book title
  books[index].title = title;

  // ✅ Return updated list
  res.status(200).json(books);
});


// ✅ POST /books — adds a new book to the list
app.post("/books", (req,res) => {
    // Extracts id and title from the request body
    const { id, title } = req.body

    // Validação simples
    if (!id || !title) {
        return res.status(400).send("Invalid book data. 'id' and 'title' are required.");
    }
  // ✅ Add the new book to the array
   books.push({ id, title });
  // ✅ Respond with success message
    res.status(201).send("Book Posted With Sucess");
});

//✅ DELETE /books:id - delete a specific book
app.delete("/books/:id", (req, res) => {
      // ✅ Extract ID from route parameters
  const id = parseInt(req.params.id);

  // ⚠️ Validate input
  if (!id) {
    return res.status(400).send("Invali data. 'ID' is required");
  }

  // find index of the book whit given ID
  const index = books.findIndex((books) => books.id === id);

   // ⚠️ Check if the book exists
  if (index === -1) {
    return res.status(404).send("Book not found.");
  }

  // DELETE the book
  books.splice(index, 1);
 
 // define the response
 res.status(200).send("The Book Was Deleted with Sucess");
});

// ✅ Export the app so it can be used in server.js (or other files)
export default app;