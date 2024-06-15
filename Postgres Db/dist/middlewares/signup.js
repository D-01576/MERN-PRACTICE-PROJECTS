"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const utils_1 = require("../Db/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretkey = "12345678";
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const client = yield (0, utils_1.getClient)();
        try {
            const insertquery = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
            let response = yield client.query(insertquery, [email, password]);
            const token = jsonwebtoken_1.default.sign({ email: email }, secretkey);
            res.json({
                status: "Success",
                token: token
            });
        }
        catch (error) {
            if (error.detail.includes("already exist")) {
                res.json({
                    status: "Error",
                    message: "User Already Exist"
                });
                return;
            }
            res.json({
                status: "Error",
                message: "Something went wrong"
            });
        }
        finally {
            if (client) {
                yield client.end();
            }
        }
    });
}
exports.signup = signup;
