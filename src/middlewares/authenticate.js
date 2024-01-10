import {HttpError} from "../helpers/index.js";
import jwt from "jsonwebtoken";
import {User} from '../models/index.js'

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, "Unauthorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized"));
  }
};

export default authenticate;