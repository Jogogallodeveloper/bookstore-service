//import modules
import { error } from "console";
import { author } from "../models/author.js";
import mongoose from "mongoose";

// ✅ define the auhtorController class 
class authorController {

    // ✅ methodo get all author
    static listAuthor = async (req, res, next) => {

        try {
            const listAuthor = await author.find({});
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", listAuthor);
            // define the response when its ok
            res.status(200).json(listAuthor);
        } catch (error) {
            // use de middleware error treatment
            next(error);
        }

    };

    // ✅ methodo GET specific author
    static listAuthorById = async (req, res, next) => {
        try {
            // define the value that will search on mongoDB
            const id = req.params.id

            //✅ Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                
                // define the error treatment 
              res.status(400).json({
                message: "Invalid ID !"
              })
            };

            //define the metodo that will find the author by his id
            const authorResult = await author.findById(id);

            //Validate if exists the Author
            if (!authorResult) {
                return res.status(404).json
                (
                    {
                     message: "❌ Author Not Exists." 
                    }
                );
            };

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", authorResult);

            //define the ok response
            return res.status(200).json(authorResult);

        } catch (error) {

            // use de middleware error treatment
            next(error);
        };

    };


    // methodo POST to create a specific author
    static postAuthor = async (req, res, next) => {

        const { name, nationality } = req.body

        // // Verify if the Data on JSON its ok
        // if (!name || !nationality) {
        //     return res.status(400).send("Invalid Author data. 'Name' and 'nationality' are required.");
        // }

        try {
            //define const that will create the Author on mondoDB
            const newAuthor = await author.create(req.body);

            // define sucess response
            res.status(201).json({
                message: "Author Created with Sucess",
                author: newAuthor
            });
        } catch (error) {

            // use de middleware error treatment
            next(error);
        }
    };

    // methodo PUT a specific Author
    static PutAuthorById = async (req, res, next) => {
        try {
            const id = req.params.id

            //define the methodo that will find the ID of the author
            await author.findByIdAndUpdate(id, req.body);

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", author);

            // define the response when its ok
            res.status(200).json({ message: "Author updated successfully." });
        } catch (error) {

            // use de middleware error treatment
            next(error);
        }
    };

    // methodo DELETE a specific Author
    static DeleteAuthorById = async (req, res, next) => {
        try {
            const id = req.params.id;

            const deletedAuthor = await author.findByIdAndDelete(id);


            if (!deletedAuthor) {
                return res.status(404).json({ message: "Author not found." });

            };

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", deletedAuthor);

            // methodo of sucessfuly response
            res.status(200).json({ message: "✅ Author deleted successfully!" });

        } catch (error) {

            // use de middleware error treatment
            next(error);
            };
    };

};

export default authorController;