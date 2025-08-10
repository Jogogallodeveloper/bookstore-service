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

  //define GET specific publisher
  static listPublisherById = async (req, res, next) => {

    //define the const variable that will get the publisher id
    const publisherId = req.params.id;

    try {
      //declare the variable that will get find all publisher
      const listPublisherbyId = await Publisher.findById(publisherId);

      //console log of listPublisherId
      console.log("📄Publisher ID", listPublisherbyId);

      // define the response when specific publisher is find
      res.status(200).json(listPublisherbyId);
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

      console.log("New Publisher:", newPublisher);

      //define the response in case of sucess post
      res.status(200).json({
        message: "Publisher Created With Sucess!",
        Publisher: newPublisher,
      });
    } catch (error) {
      //define the middleware erro treatmente
      console.log(error);
      next(error);
    }
  };

  // methodo PUT publisher
  static putPublisher = async (req, res, next) => {
    //define the variable const that will get the id from de publisher
    const publisherId = req.params.id;

    //define the const that will get the data from JSON.BODY
    const { name, country } = req.body;

    //print the publisherID and data Body from req
    console.log("PublisherID:", publisherId);
    console.log("Publisher PUT Body", req.body);

    // define try catch
    try {
      const updatedPublisher = await Publisher.findByIdAndUpdate(
        publisherId,
        { name, country },
        { new: true, runValidators: true }
      );

      // define the return in case publisher not found
      if (!updatedPublisher) {
        console.log("UpdatePublisher:", updatedPublisher);
        return next(new NotFound("Publisher not found"));
      };

      // define the sucessfuly message return
      res.status(200).json({
        message: "Publisher updated successfully"//,
        //publisher: updatedPublisher,
      });

    } catch (error) {

      //define the middleware erro treatmente
      next(error);

    }
  };

  // methodo DELETE publisher
  static deletePublisher = async (req, res, next) => {
    //define the const that will get the data from JSON.BODY
    const publisherId = req.params.id;

    //print the PublisherID
    console.log("PublisherID", publisherId);

    try {
      //define const that will create the Publisher on database
      const deletePublisher = await Publisher.findByIdAndDelete(publisherId);

      console.log("deletePublisherID:", deletePublisher);

      //define the response in case of sucess post
      res.status(200).json({
        message: "Publisher Deleted With Sucess!",
      });
    } catch (error) {
      //define the middleware erro treatmente
      next(error);
    }
  };
}

export default publisherController;
