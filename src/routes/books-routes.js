//import modules
import express from "express";
import BookController from "../controllers/book-controller.js";

const routes = express.Router();

// define router GET all books from mongoDB
routes.get("/books", BookController.listBooks);

//define router GET specific book by publisher on mongoDB
routes.get("/book/search", BookController.listBookByPublisher);

// define router GET Specific book from mongoDB
routes.get("/books/:id", BookController.listBookById);

// define router UPDATE Specific book from mongoDB
routes.put("/books/:id", BookController.PutBookById);

//define router POST specific book on mongoDB
routes.post("/books", BookController.postbook);

//define router DELETE specific book on mongoDB
routes.delete("/books/:id", BookController.DeleteBookById);

export default routes;