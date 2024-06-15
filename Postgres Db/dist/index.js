"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Signin_1 = require("./routes/Signin");
const Signup_1 = require("./routes/Signup");
const createtable_1 = require("./Db/createtable");
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", Signin_1.log),
    app.use("/", Signup_1.signp);
app.use("/", user_1.ver);
app.post("/admin", createtable_1.createTable);
app.listen(3000);
