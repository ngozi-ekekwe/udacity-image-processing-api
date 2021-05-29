"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var middleware_1 = require("./middleware");
var app = express_1.default();
app.use(express_1.default.static("public"));
app.use(middleware_1.logger);
app.get("/", function (_req, res) {
    res.status(200).send("Welcome to Image Processing API");
});
app.use(middleware_1.validateParams);
app.use(routes_1.default);
app.use(middleware_1.errorHandler);
exports.default = app;
