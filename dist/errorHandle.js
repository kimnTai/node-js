"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandle = exports.errorHandle = void 0;
const headers_1 = __importDefault(require("./headers"));
const errorHandle = (res) => {
    res.writeHead(404, headers_1.default);
    res.write(JSON.stringify({ status: "false", message: "欄位未填寫正確,或無此 todo id" }));
    res.end();
};
exports.errorHandle = errorHandle;
const successHandle = (res, todoList) => {
    res.writeHead(200, headers_1.default);
    res.write(JSON.stringify({ status: "success", data: todoList }));
    res.end();
};
exports.successHandle = successHandle;
