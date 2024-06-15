"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ver = void 0;
const express_1 = require("express");
const verify_1 = require("../middlewares/verify");
exports.ver = (0, express_1.Router)();
exports.ver.post("/user", verify_1.user);
