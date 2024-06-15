"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const express_1 = require("express");
const signin_1 = require("../middlewares/signin");
exports.log = (0, express_1.Router)();
exports.log.post("/signin", signin_1.signin);
