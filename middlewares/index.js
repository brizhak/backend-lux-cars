import isValidId from "./isValidId.js";
import authenticate from "./authenticate.js";
import isEmptyBody from "./isEmptyBody.js";
import { ctrlWrapper } from "../decorators/index.js";

export {
  isValidId, 
  isEmptyBody
}

export const authWrapped = ctrlWrapper(authenticate)