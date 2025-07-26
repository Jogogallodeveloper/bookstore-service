import express from "express";
import booksRouts from "./books-routes.js";

const routes = (app) => {
    // ✅ Home route — just to confirm that the server is running
    app.route("/").get((req, res) => res.
        status(200).
        send("✅ - API REST BOOKS STORE"));

        app.use(express.json(), booksRouts);
};

export default routes;