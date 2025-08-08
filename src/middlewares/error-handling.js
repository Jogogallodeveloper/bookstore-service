import mongoose from "mongoose";
import ErrorBase from "../error/error-base.js";
import BadRequest from "../error/bad-request.js";
import ErrorValidator from "../error/error-validator.js";
import NotFound from "../error/not-found.js";

// declare the function that will handling error
function errorHandling(error, req, res, next) {

  //print the error
  console.error("Error: ", error);

  //define de middleware of error - to treat the error on the aplication
  if (error instanceof mongoose.Error.CastError) {
    console.error("❌ Error:", error);
    new BadRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErrorValidator(error).sendResponse(res);
  }
  else if(error instanceof NotFound){

    error.sendResponse(res);

  } else {
    new ErrorBase().sendResponse(res);
    //res.status(500).send({message: "Internal Server Error"});
  };
};

//export the middleware
export default errorHandling;