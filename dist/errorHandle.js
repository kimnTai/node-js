"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandle = exports.errorHandle = void 0;
const data_1 = __importDefault(require("./data"));
const headers_1 = __importDefault(require("./headers"));
const errorHandle = (res, code) => {
    res.writeHead(code, headers_1.default);
    let message = "";
    switch (code) {
        case 400:
            message = `客戶端請求的語法錯誤，服務器無法理解`;
            break;
        case 404:
            message = `務器無法根據客戶端的請求找到資源（網頁）。通過此代碼，網站設計人員可設置"您所請求的資源無法找到"的個性頁面`;
            break;
        case 405:
            message = `客戶端請求中的方法被禁止`;
            break;
    }
    res.write(JSON.stringify({ status: "false", message: message }));
    res.end();
};
exports.errorHandle = errorHandle;
const successHandle = (res) => {
    res.writeHead(200, headers_1.default);
    res.write(JSON.stringify({ status: "success", data: data_1.default }));
    res.end();
};
exports.successHandle = successHandle;
