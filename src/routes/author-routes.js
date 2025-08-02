//import modules
import express from "express";
import authorController from "../controllers/author-controller.js";

const routes = express.Router();

// define route GET all author from mongoDB
routes.get("/author", authorController.listAuthor);

// define route GET Specific author from mongoDB
routes.get("/author/:id", authorController.listAuthorById);

// define route UPDATE Specific author from mongoDB
routes.put("/author/:id", authorController.PutAuthorById);

//define route POST specific author on mongoDB
routes.post("/author/", authorController.postAuthor);

//define route DELETE specific author on mongoDB
routes.delete("/author/:id", authorController.DeleteAuthorById);

export default routes;