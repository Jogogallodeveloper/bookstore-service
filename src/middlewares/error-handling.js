import mongoose from "mongoose";

// declare the function that will handling error
function errorHandling(error, req, res, next) {

  //print the error
  console.error("Error: ", error);

  //define de middleware of error - to treat the error on the aplication
  if (error instanceof mongoose.Error.CastError) {
    console.error("❌ Error:", error);
    res.status(400).send({ message: "The request contains invalid or missing data" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    //declare const error
    const errorMessages = Object.values(error.errors)
    .map(error => error.message)
    .join("; ");
  
    //define the return message
   res.status(400).send({message: `Errors Found: ${errorMessages}`});
  }
  else {
    res.status(500).send({message: "Internal Server Error"});
  };
};

//export the middleware
export default errorHandling;