//import modules
import { author } from "../models/author.js";

// ✅ GET /author — returns the list of all author in JSON format
class authorController {

    // ✅ methodo get all author
    static async listAuthor(req, res) {

        try {
            const listAuthor = await author.find({});
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", listAuthor);
            // define the response when its ok
            res.status(200).json(listAuthor);
        } catch (error) {
            res.status(500).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while finding author.` });
        }

    };

    // ✅ methodo GET specific author
    static async listAuthorById(req, res) {
        try {

            const id = req.params.id

            const authorResult = await author.findById(id);

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", authorResult);

            // define the response when its ok
            res.status(200).json(authorResult);

        } catch (error) {
            res.status(500).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while updating the author.` });
        }

    };
    // methodo POST to create a specific author
    static async postAuthor(req, res) {

        const { name, nationality } = req.body

        // Validação simples
        if (!name || !nationality ) {
            return res.status(400).send("Invalid Author data. 'Name' and 'nationality' are required.");
        }

        try {
            //define const that will create the Author on mondoDB
            const newAuthor = await author.create(req.body);

            // define sucess response
            res.status(201).json({
                message: "Author Created with Sucess",
                author: newAuthor
            });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ error to create the Author` });
        }
    };

    // methodo PUT a specific Author 
    static async PutAuthorById(req, res) {
        try {
            const id = req.params.id

            await author.findByIdAndUpdate(id, req.body);

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", author);

            // define the response when its ok
            res.status(200).json({ message: "Author updated successfully." });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while updating the Author.` });
        }
    };

    // methodo DELETE a specific Author 
    static async DeleteAuthorById(req, res) {
        try {
            const id = req.params.id;

            const deletedAuthor = await author.findByIdAndDelete(id);


            if (!deletedAuthor) {
                return res.status(404).json({ message: "Author not found." });

            };

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", deletedAuthor);
            // bloco de resposta
            res.status(200).json({ message: "✅ Author deleted successfully!" });

        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while DELETE the Author.` });
        }
    };

};

export default authorController;