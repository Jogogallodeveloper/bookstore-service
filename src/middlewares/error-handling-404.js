import NotFound from "../error/not-found.js";

function errorHendling404(req, res, next) {
    const Error404 = new NotFound();
    next(Error404);
}
  

export default errorHendling404;
