import {HttpError} from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Missing required fields"));
  }

  next();
};

export default isEmptyBody;