//import the express liberay, wich simplifies buildings web server in Node.js
import express from "express";

// ✅ Create the main Express application instance
const app = express();
// ✅ Create the main Express application instance
app.use(express.json());

// ✅ Simulated in-memory data (no database yet) — list of books
const books = [
    {
        id: 1,
        title: "The Lord of the Ring"
    },
    {
        id: 2,
        title: "The Hobbit"
    }
];

//define functino that will be used to find de /books/:id
function findbook(id) {
   return books.findIndex(book => {
        return book.id === Number(id);
    });
};

// ✅ Home route — just to confirm that the server is running
app.get("/", (req,res) => {
    res.status(200).send("Route Listening!✅")
});

// ✅ GET /books — returns the list of all books in JSON format
app.get("/books", (req, res) => {
    res.status(200).json(books);
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

// ✅ Export the app so it can be used in server.js (or other files)
export default app;