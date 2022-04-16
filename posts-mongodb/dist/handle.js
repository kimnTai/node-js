"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = exports.successHandle = void 0;
var headers_1 = __importDefault(require("./headers"));
var successHandle = function (res, result) {
    res.writeHead(200, headers_1.default);
    res.write(JSON.stringify({ status: "success", result: result }));
    res.end();
};
exports.successHandle = successHandle;
var errorHandle = function (res, message) {
    res.writeHead(400, headers_1.default);
    res.write(JSON.stringify({ status: "error", message: message }));
    res.end();
};
exports.errorHandle = errorHandle;
