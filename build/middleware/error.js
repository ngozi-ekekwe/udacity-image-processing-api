"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(req, res, next) {
    console.log("errorHandler");
    next();
}
exports.default = errorHandler;
