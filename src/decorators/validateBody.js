import {HttpError} from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        HttpError(400, "Error from Joi or another validation library")
      );
    }
    next();
  };
  return func;
};

export default validateBody;