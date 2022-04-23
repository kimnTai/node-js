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
var post_1 = __importDefault(require("../model/post"));
var handle_1 = __importDefault(require("../service/handle"));
var PostsController = /** @class */ (function () {
    function PostsController() {
    }
    PostsController.prototype.getPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var getResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, post_1.default.find()];
                    case 1:
                        getResult = _a.sent();
                        handle_1.default.success(res, getResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.createPosts = function (req, res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, content, type, name_1, postResult, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = JSON.parse(body), content = _a.content, type = _a.type, name_1 = _a.name;
                        return [4 /*yield*/, post_1.default.create({ content: content, type: type, name: name_1 })];
                    case 1:
                        postResult = _b.sent();
                        handle_1.default.success(res, postResult);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        handle_1.default.error(res, error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.deleteAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, post_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        handle_1.default.success(res, { message: "刪除成功" });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.editPosts = function (req, res, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, content, type, name_2, patchResult, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/").pop();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        _b = JSON.parse(body), content = _b.content, type = _b.type, name_2 = _b.name;
                        return [4 /*yield*/, post_1.default.findByIdAndUpdate(id, { content: content, type: type, name: name_2 })];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, post_1.default.findById(id)];
                    case 3:
                        patchResult = _c.sent();
                        handle_1.default.success(res, patchResult);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        handle_1.default.error(res, error_2.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.deleteById = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/").pop();
                        return [4 /*yield*/, post_1.default.findByIdAndDelete(id)];
                    case 1:
                        deleteResult = _b.sent();
                        if (deleteResult) {
                            handle_1.default.success(res, { message: "刪除成功" });
                        }
                        else {
                            handle_1.default.error(res, "無此 id");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostsController;
}());
exports.default = new PostsController();
