import ErrorBase from "./error-base.js";

class NotFound extends ErrorBase {
  constructor(message = "Page Not Found !") {
    super(message, 404);
  };
};

export default NotFound;
