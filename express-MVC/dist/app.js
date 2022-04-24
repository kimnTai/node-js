"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
require("./connection");
var posts_1 = __importDefault(require("./router/posts"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/posts", posts_1.default);
app.listen(process.env.PORT, function () { return console.log("伺服器啟動中"); });
exports.default = app;
