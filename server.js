// Import the file app.js
import app from "./src/app.js";
import dotenv from "dotenv";

//definition of the .env
dotenv.config();

// Define the port number where the server will listen for requests
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Listening!");
});
