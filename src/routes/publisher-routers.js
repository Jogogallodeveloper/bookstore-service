import express from "express";
import publisherController from "../controllers/publisher-controller.js";

const routes = express.Router();

//define route GET all publisher from mongoDB
routes.get("/publisher", publisherController.listPublisher);

//define POST route for new publishers into mongoDB
routes.post("/publisher", publisherController.postPublisher);

export default routes;