"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = __importDefault(require("./headers"));
var Handle = /** @class */ (function () {
    function Handle() {
    }
    Handle.prototype.success = function (res, result) {
        res.writeHead(200, headers_1.default);
        res.write(JSON.stringify({ status: "success", result: result }));
        res.end();
    };
    Handle.prototype.error = function (res, message) {
        res.writeHead(400, headers_1.default);
        res.write(JSON.stringify({ status: "error", message: message }));
        res.end();
    };
    return Handle;
}());
exports.default = new Handle();
