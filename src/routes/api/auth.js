import express from "express";
import {registerWrapped, loginWrapped, getCurrentWrapped, logoutWrapped} from '../../controllers/userControllers/index.js'
import { authWrapped, isEmptyBody} from '../../middlewares/index.js'
import {validateBody}from '../../decorators/index.js'
import {
  loginSchema,
  registerSchema,
} from "../../models/index.js";

const userLoginSchema = validateBody(loginSchema);
const userRegisterSchema = validateBody(registerSchema);

const authRouter = express.Router();

authRouter.post("/register",isEmptyBody, userRegisterSchema, registerWrapped);
authRouter.post("/login", isEmptyBody,  userLoginSchema, loginWrapped);
authRouter.get("/current", authWrapped, getCurrentWrapped);
authRouter.post("/logout", authWrapped, logoutWrapped);

export default authRouter;