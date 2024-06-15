"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signp = void 0;
const express_1 = require("express");
const signup_1 = require("../middlewares/signup");
exports.signp = (0, express_1.Router)();
exports.signp.post("/signup", signup_1.signup);
