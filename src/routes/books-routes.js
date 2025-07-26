//import modules
import express from "express";
import BookController from "../controllers/book-controller.js";

const routes = express.Router();

// define route GET all books from mongoDB
routes.get("/books", BookController.listBooks);

// define route GET Specific book from mongoDB
routes.get("/books/:id", BookController.listBookById);

// define route UPDATE Specific book from mongoDB
routes.put("/books/:id", BookController.PutBookById);

//define route POST specific book on mongoDB
routes.post("/books/", BookController.postbook);

//define route DELETE specific book on mongoDB
routes.delete("/books/:id", BookController.DeleteBookById);

export default routes;