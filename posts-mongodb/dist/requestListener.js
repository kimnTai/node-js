"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handle_1 = require("./handle");
var headers_1 = __importDefault(require("./headers"));
var post_1 = __importDefault(require("./model/post"));
var requestListener = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, getResult, _b, content, type, name_1, postResult, error_1, id, _c, _d, content, type, name_2, patchResult, error_2, deleteResult;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (req.method === "OPTIONS") {
                    res.writeHead(200, headers_1.default);
                    res.end();
                }
                body = "";
                req.on("data", function (chunk) { return (body += chunk); });
                return [4 /*yield*/, new Promise(function (resolve) { return req.on("end", resolve); })];
            case 1:
                _f.sent();
                if (!(req.url === "/posts")) return [3 /*break*/, 12];
                _a = req.method;
                switch (_a) {
                    case "GET": return [3 /*break*/, 2];
                    case "POST": return [3 /*break*/, 4];
                    case "DELETE": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2: return [4 /*yield*/, post_1.default.find()];
            case 3:
                getResult = _f.sent();
                (0, handle_1.successHandle)(res, getResult);
                return [3 /*break*/, 11];
            case 4:
                _f.trys.push([4, 6, , 7]);
                _b = JSON.parse(body), content = _b.content, type = _b.type, name_1 = _b.name;
                return [4 /*yield*/, post_1.default.create({ content: content, type: type, name: name_1 })];
            case 5:
                postResult = _f.sent();
                (0, handle_1.successHandle)(res, postResult);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _f.sent();
                (0, handle_1.errorHandle)(res, error_1.message);
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, post_1.default.deleteMany({})];
            case 9:
                _f.sent();
                (0, handle_1.successHandle)(res, { message: "刪除成功" });
                return [3 /*break*/, 11];
            case 10:
                (0, handle_1.errorHandle)(res, "無此方法");
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
            case 12:
                if (!((_e = req.url) === null || _e === void 0 ? void 0 : _e.startsWith("/posts/"))) return [3 /*break*/, 22];
                id = req.url.split("/").pop();
                _c = req.method;
                switch (_c) {
                    case "PATCH": return [3 /*break*/, 13];
                    case "DELETE": return [3 /*break*/, 18];
                }
                return [3 /*break*/, 20];
            case 13:
                _f.trys.push([13, 16, , 17]);
                _d = JSON.parse(body), content = _d.content, type = _d.type, name_2 = _d.name;
                return [4 /*yield*/, post_1.default.findByIdAndUpdate(id, { content: content, type: type, name: name_2 })];
            case 14:
                _f.sent();
                return [4 /*yield*/, post_1.default.findById(id)];
            case 15:
                patchResult = _f.sent();
                (0, handle_1.successHandle)(res, patchResult);
                return [3 /*break*/, 17];
            case 16:
                error_2 = _f.sent();
                (0, handle_1.errorHandle)(res, error_2.message);
                return [3 /*break*/, 17];
            case 17: return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, post_1.default.findByIdAndDelete(id)];
            case 19:
                deleteResult = _f.sent();
                if (deleteResult) {
                    (0, handle_1.successHandle)(res, { message: "刪除成功" });
                }
                else {
                    (0, handle_1.errorHandle)(res, "無此 id");
                }
                return [3 /*break*/, 21];
            case 20:
                (0, handle_1.errorHandle)(res, "無此方法");
                return [3 /*break*/, 21];
            case 21: return [2 /*return*/];
            case 22:
                (0, handle_1.errorHandle)(res, "無此路由");
                return [2 /*return*/];
        }
    });
}); };
exports.default = requestListener;
