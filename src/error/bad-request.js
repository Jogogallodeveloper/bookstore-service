import ErrorBase from "./error-base.js";

class BadRequest extends ErrorBase {
    constructor(message = "The request contains invalid or missing data") {
        super(message, 400);
    };
};

export default BadRequest;