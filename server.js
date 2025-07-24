// Import the file app.js
import app from "./src/app.js";

// Define the port number where the server will listen for requests
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Listening!");
});
