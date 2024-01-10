import register from "./register.js";
import login from './login.js'
import getCurrent from "./getCurrent.js";
import logout from "./logout.js";
import {ctrlWrapper} from "../../decorators/index.js";

export const registerWrapped = ctrlWrapper(register)
export const loginWrapped = ctrlWrapper(login)
export const getCurrentWrapped = ctrlWrapper(getCurrent)
export const logoutWrapped = ctrlWrapper(logout)