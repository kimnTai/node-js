"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const headers_1 = __importDefault(require("./headers"));
const uuid_1 = require("uuid");
const errorHandle_1 = require("./errorHandle");
const data_1 = __importDefault(require("./data"));
const requestListener = (req, res) => {
    var _a;
    // CORS 跨網域
    if (req.method == "OPTIONS") {
        res.writeHead(200, headers_1.default);
        res.end();
        return;
    }
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    if (req.url == "/todo") {
        switch (req.method) {
            case "GET":
                (0, errorHandle_1.successHandle)(res);
                break;
            case "POST":
                req.on("end", () => {
                    try {
                        const { title } = JSON.parse(body);
                        if (title) {
                            data_1.default.push({ title: title, id: (0, uuid_1.v4)() });
                            (0, errorHandle_1.successHandle)(res);
                        }
                        else {
                            (0, errorHandle_1.errorHandle)(res, 400);
                        }
                    }
                    catch (error) {
                        (0, errorHandle_1.errorHandle)(res, 400);
                    }
                });
                break;
            case "DELETE":
                data_1.default.length = 0;
                (0, errorHandle_1.successHandle)(res);
                break;
            default:
                (0, errorHandle_1.errorHandle)(res, 405);
                break;
        }
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/todo/")) {
        const id = req.url.split("/").pop();
        const index = data_1.default.findIndex((item) => item.id == id);
        switch (req.method) {
            case "DELETE":
                if (index !== -1) {
                    data_1.default.splice(index, 1);
                    (0, errorHandle_1.successHandle)(res);
                }
                else {
                    (0, errorHandle_1.errorHandle)(res, 400);
                }
                break;
            case "PATCH":
                req.on("end", () => {
                    try {
                        const { title } = JSON.parse(body);
                        if (title && index != -1) {
                            data_1.default[index].title = title;
                            (0, errorHandle_1.successHandle)(res);
                        }
                        else {
                            (0, errorHandle_1.errorHandle)(res, 400);
                        }
                    }
                    catch (error) {
                        (0, errorHandle_1.errorHandle)(res, 400);
                    }
                });
                break;
            default:
                (0, errorHandle_1.errorHandle)(res, 405);
                break;
        }
        return;
    }
    (0, errorHandle_1.errorHandle)(res, 404);
};
const server = http_1.default.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("伺服器啟動中");
