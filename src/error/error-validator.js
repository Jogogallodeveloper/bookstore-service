import BadRequest from "./bad-request.js";

class ErrorValidator extends BadRequest {
  constructor(error) {
    //declare const error
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Validation errors found: ${errorMessages}`);
  };
};

export default ErrorValidator;