"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handle_1 = __importDefault(require("../service/handle"));
var headers_1 = __importDefault(require("../service/headers"));
var HttpController = /** @class */ (function () {
    function HttpController() {
    }
    HttpController.prototype.cors = function (req, res) {
        res.writeHead(200, headers_1.default);
        res.end();
    };
    HttpController.prototype.notFound = function (req, res) {
        handle_1.default.error(res, "無此路由");
    };
    return HttpController;
}());
exports.default = new HttpController();
