import { Publisher } from "../models/publisher.js";
import mongoose from "mongoose";

//define the publisher class
class publisherController {

    // methodo GET all publisher
    static listPublisher = async (req, res, next) => {
        try {
            //declare the variable that will get find all publisher
            const listPublisher = await Publisher.find({});

            //console log of listPublisher
            console.log("📄Publisher Result List", listPublisher);

            // define the response when list of publisher is find
            res.status(200).json(listPublisher);

        } catch (error) {

            //call de middleware to handle the error resonse
            next(error);
        }
    };

    // methodo POST publisher
    static postPublisher = async (req, res, next) => {
        //define the const that will get the data from JSON.BODY
        const { name, country } = req.body;
       
        console.log("Dados do Body", req.body);
       
        //verify if the data on json.body its ok
        // if (!name | !country) {
        //     return res.status(400).send("Invalid Publisher data. 'name' our 'country' are required");
        // };

        try {
            //define const that will create the Publisher on database
            const newPublisher = await Publisher.create(req.body);

            console.log("New Publisher:",newPublisher);

            //define the response in case of sucess post
            res.status(200).json({
                message: "Publisher Created With Sucess!",
                Publisher: newPublisher
            });

        } catch (error) {
            //define the middleware erro treatmente
            console.log(error);
            next(error);
        }
    };

};

export default publisherController;