//import modules
import { author } from "../models/author.js";
import book from "../models/book.js";
import mongoose from "mongoose";

// ✅ GET /books — returns the list of all books in JSON format
class BookController {

    // ✅ methodo get all books
    static listBooks = async (req, res, next) => {

        try {

            //define the methodo that will find all books

            const listBooks = await book.find({}).populate("author").populate("publisher");
            // console log to print the response from mongo

            console.log("📄 Resultado vindo do Mongo:", listBooks);
            // define the response when its ok

            res.status(200).json(listBooks);

        } catch (error) {
            next(error);
        };

    };

    // ✅ methodo GET specific books
    static listBookById = async (req, res) => {
        try {

            //define the methodo that will get the id from the books
            const id = req.params.id

            //define the methodo that will find the specific book
            const bookResult = await book.findById(id);

            // console log to print the response from mongo

            console.log("📄 Resultado vindo do Mongo:", bookResult);

            // define the response when its ok

            res.status(200).json(bookResult);
        } catch (error) {

            //call the error middleware
            next(error);
        };

    };

    // methodo POST to create a specific Book
    static postbook = async (req, res, next) => {

        try {

            //define the variable that will get the data from body json
            const { title, value, pages, author: authorId, publisher: publisherId } = req.body;

            //define the methodo that create the book, but firts find the id of the author
            const findAuthor = await author.findById(newBook.author);

            // define the  object of the book 
            const completeBook = { ...newBook, author: { ...findAuthor._doc } };

            const bookCreated = await book.create(completeBook);


            // define sucess response
            res.status(201).json({
                message: "Created with Sucess", book: bookCreated
            });
        } catch (error) {

            // define the error response
            next(error);
        }
    };

    // methodo PUT a specific book 
    static PutBookById = async (req, res, next) => {

        try {
            const bookId = req.params.id
            const { author: authorId, ...updateData } = req.body;

            // Validate Book ID
            if (!mongoose.Types.ObjectId.isValid(bookId)) {
                return res.status(400).json({ message: "Invalid Book ID format." });
            }

            // If authorId exists, validate & fetch
            if (authorId) {
                if (!mongoose.Types.ObjectId.isValid(authorId)) {
                    return res.status(400).json({ message: "Invalid Author ID format." });
                }

                const findAuthor = await author.findById(authorId);
                 if (!findAuthor) {
                    return res.status(400).json({message: "Author not found !"});
                 };

                 //only attach author ID (not full Document)
                 updateData.author = authorId;
            };

            //update the book
            const updateBook = await book.findById(
                bookId,
                updateData,
                {
                    new:true
                }
            ).populate("author");

            if (!updateBook) {
                return res.status(400).json({message: "Book not Found !"});
            };

            //define sucess message
            return res.status(200).json({message: "Book Updated Sucessfully !!"});


        } catch (error) {
            next(error);

        };
    };


    // methodo DELETE a specific book 
    static DeleteBookById = async (req, res) => {

    try {

        // define the variable that will get the ID Book from the data JSON
        const id = req.params.id;

        //define the methodo that will find de book by his id and deleted
        const deletedBook = await book.findByIdAndDelete(id);

        // define the response if the methodo did not sucessfuly deleted the book
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found." });

        };

        // console log to print the response from mongo
        console.log("📄 Resultado vindo do Mongo:", deletedBook);

        // define the sucessfully message
        res.status(200).json({ message: "✅ Book deleted successfully!" });

    } catch (error) {

        //define the error response 
        next(error);

    };
};

    // methodo GET by parametre of search
    static listBookByPublisher = async (req, res) => {

    //define the variable that will get the publisher from json request
    const publisher = req.query.publisher;

    // define the try catch 
    try {

        // define the action to find the book by publisher
        const booksByPublisher = await book.find({ publisher });

        // define the response when find the book
        res.status(200).json(booksByPublisher);

    } catch (error) {
        //call the middleware error treatment
        next(error);
    };
};

};

export default BookController;