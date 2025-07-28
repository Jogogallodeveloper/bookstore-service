import express from "express";
import booksRoutes from "./books-routes.js";
import authors from "./author-routes.js"

const routes = (app) => {
    // ✅ Home route — just to confirm that the server is running
    app.route("/").get((req, res) => res.
        status(200).
        send("✅ - API REST BOOKS STORE"));

        app.use(express.json(), booksRoutes, authors);
};

export default routes;