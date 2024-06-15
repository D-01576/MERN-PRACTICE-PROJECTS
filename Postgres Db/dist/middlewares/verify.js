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
exports.user = void 0;
const utils_1 = require("../Db/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretkey = "12345678";
function user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("work");
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ status: "Token is missing" });
        }
        const client = yield (0, utils_1.getClient)();
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secretkey);
            console.log(decoded.email);
            const checkinput = 'SELECT * FROM users WHERE email = $1';
            const userRes = yield client.query(checkinput, [decoded.email]);
            console.log("j");
            if (userRes.rows.length === 1) {
                console.log(userRes.rows[0]);
                res.json({
                    status: "success",
                    you: userRes.rows[0]
                });
            }
            else {
                res.json({
                    status: "Error",
                    message: "token invalid"
                });
            }
        }
        catch (_a) {
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
exports.user = user;
