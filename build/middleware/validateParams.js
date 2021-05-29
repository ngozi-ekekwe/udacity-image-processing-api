"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateParams(req, res, next) {
    var query = req.query;
    var requiredParams = ["filename", "height", "width"];
    for (var i = 0; i < requiredParams.length; i++) {
        var param = requiredParams[i];
        if (query[param] === undefined) {
            res.status(400).send("Error: Parameter(s) missing..");
            return;
        }
        var value = query[param];
        if (param == "filename" && typeof value !== "string") {
            res.status(400).send("Filename should be a string");
            return;
        }
        if (param == "height" || param == "width") {
            var num = Number(value);
            if (!num) {
                res.status(400).send("height and width should be numbers");
                return;
            }
        }
    }
    next();
}
exports.default = validateParams;
