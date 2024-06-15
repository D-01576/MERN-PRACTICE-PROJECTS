import {Router} from "express"
import { signin } from "../middlewares/signin";

export const log = Router();

log.post("/signin",signin)