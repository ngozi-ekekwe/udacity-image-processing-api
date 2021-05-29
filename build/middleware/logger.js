"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(req, res, next) {
    console.log("middlware logger");
    next();
}
exports.default = logger;
