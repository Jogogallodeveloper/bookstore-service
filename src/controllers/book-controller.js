//import modules
import book from "../models/book.js";

// ✅ GET /books — returns the list of all books in JSON format
class BookController {

    // ✅ methodo get all books
    static async listBooks(req, res) {

        try {
            const listBooks = await book.find({});
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", listBooks);
            // define the response when its ok
            res.status(200).json(listBooks);
        } catch (error) {
            res.status(500).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while finding book.` });
        }

    };

    // ✅ methodo GET specific books
    static async listBookById(req, res) {
        try {

            const id = req.params.id

            const bookResult = await book.findById(id);
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", bookResult);
            // define the response when its ok
            res.status(200).json(bookResult);
        } catch (error) {
            res.status(500).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while updating the book.` });
        }

    };
    // methodo POST to create a specific Book
    static async postbook(req, res) {

        const { title, publisher, value, pages } = req.body

        // Validação simples
        if (!publisher || !title || !value || !pages) {
            return res.status(400).send("Invalid book data. 'publisher','title' and 'value' are required.");
        }

        try {
            //define const that will create the book on mondoDB
            const newBook = await book.create(req.body);

            // define sucess response
            res.status(201).json({
                message: "Created with Sucess",
                book: newBook
            });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ error to create the book` });
        }
    };

    // methodo PUT a specific book 
    static async PutBookById(req, res) {
        try {
            const id = req.params.id

            await book.findByIdAndUpdate(id, req.body);

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", book);

            // define the response when its ok
            res.status(200).json({ message: "Book updated successfully." });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while updating the book.` });
        }
    };

    // methodo DELETE a specific book 
    static async DeleteBookById(req, res) {
        try {
            const id = req.params.id;

            const deletedBook = await book.findByIdAndDelete(id);


            if (!deletedBook) {
                return res.status(404).json({ message: "Book not found." });

            };

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", deletedBook);

            res.status(200).json({ message: "✅ Book deleted successfully!" });

        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while DELETE the book.` });
        }
    };

};

export default BookController;