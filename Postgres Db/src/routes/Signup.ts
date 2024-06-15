import {Router} from "express"
import { signup } from "../middlewares/signup";

export const signp = Router();

signp.post("/signup",signup)