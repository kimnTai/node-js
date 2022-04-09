"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = require("mongoose");
const room_1 = __importDefault(require("./model/room"));
const requestListener = async (req, res) => {
    var _a;
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
        "Content-Type": "application/json",
    };
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    await new Promise((resolve) => req.on("end", resolve));
    if (req.url === "/todo") {
        let rooms;
        switch (req.method) {
            case "GET":
                rooms = await room_1.default.find();
                res.writeHead(200, headers);
                res.write(JSON.stringify({ rooms }));
                break;
            case "POST":
                try {
                    const { title } = JSON.parse(body);
                    rooms = await room_1.default.create({ name: title, price: 600, rating: 4.5 });
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms }));
                }
                catch (error) {
                    res.writeHead(400, headers);
                    res.write(JSON.stringify({ status: "false" }));
                }
                break;
            case "DELETE":
                await room_1.default.deleteMany({});
                res.writeHead(200, headers);
                res.write(JSON.stringify({ status: "success", rooms: [] }));
                break;
        }
        res.end();
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/todo/")) {
        const id = req.url.split("/").pop();
        switch (req.method) {
            case "PATCH":
                const updateResult = await room_1.default.findByIdAndUpdate(id, { name: "更新成功" });
                if (updateResult) {
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms: updateResult }));
                    break;
                }
                res.writeHead(400, headers);
                res.write(JSON.stringify({ status: "false" }));
                break;
            case "DELETE":
                const result = await room_1.default.findByIdAndDelete(id);
                if (result) {
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms: result }));
                    break;
                }
                res.writeHead(400, headers);
                res.write(JSON.stringify({ status: "false" }));
                break;
        }
        res.end();
        return;
    }
    res.writeHead(400, headers);
    res.write(JSON.stringify({ status: "false" }));
    res.end();
};
(async () => {
    var _a;
    await Promise.resolve().then(() => __importStar(require("dotenv/config")));
    const DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<password>", process.env.DATABASE_PASSWORD);
    await (0, mongoose_1.connect)(DB);
    console.log("資料庫連線成功");
    const server = http_1.default.createServer(requestListener);
    server.listen(process.env.PORT);
    console.log("伺服器啟動中");
})();
