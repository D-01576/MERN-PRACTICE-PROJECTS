import express from "express"
import { log } from "./routes/Signin"
import { signp } from "./routes/Signup";
import { createTable } from "./Db/createtable";
import { ver } from "./routes/user";

const app = express();

app.use(express.json());

app.use("/",log),
app.use("/",signp)
app.use("/",ver)
app.post("/admin",createTable)
app.listen(3000)