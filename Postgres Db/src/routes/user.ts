import {Router} from "express"
import { user } from "../middlewares/verify";

export const ver = Router();

ver.post("/user",user)