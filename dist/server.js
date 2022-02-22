"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const headers_1 = __importDefault(require("./headers"));
const uuid_1 = require("uuid");
const errorHandle_1 = require("./errorHandle");
const todoList = [];
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
                (0, errorHandle_1.successHandle)(res, todoList);
                break;
            case "POST":
                req.on("end", () => {
                    try {
                        const { title } = JSON.parse(body);
                        if (title !== undefined) {
                            const newTodo = { title: title, id: (0, uuid_1.v4)() };
                            todoList.push(newTodo);
                            (0, errorHandle_1.successHandle)(res, todoList);
                        }
                        else {
                            (0, errorHandle_1.errorHandle)(res);
                        }
                    }
                    catch (error) {
                        (0, errorHandle_1.errorHandle)(res);
                    }
                });
                break;
            case "DELETE":
                todoList.length = 0;
                (0, errorHandle_1.successHandle)(res, todoList);
                break;
        }
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/todo/")) {
        switch (req.method) {
            case "DELETE":
                const id = req.url.split("/").pop();
                const index = todoList.findIndex((item) => item.id == id);
                if (index !== -1) {
                    todoList.splice(index, 1);
                    (0, errorHandle_1.successHandle)(res, todoList);
                }
                else {
                    (0, errorHandle_1.errorHandle)(res);
                }
                break;
            case "PATCH":
                req.on("end", () => {
                    var _a;
                    try {
                        const { title } = JSON.parse(body);
                        const id = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/").pop();
                        const index = todoList.findIndex((item) => item.id == id);
                        if (title !== undefined && index != -1) {
                            todoList[index].title = title;
                            (0, errorHandle_1.successHandle)(res, todoList);
                        }
                        else {
                            (0, errorHandle_1.errorHandle)(res);
                        }
                    }
                    catch (error) {
                        (0, errorHandle_1.errorHandle)(res);
                    }
                });
                break;
        }
        return;
    }
    res.writeHead(404, headers_1.default);
    res.write(JSON.stringify({ status: "false", message: "無此網站路由" }));
    res.end();
};
const server = http_1.default.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("伺服器啟動中");
