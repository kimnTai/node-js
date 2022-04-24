"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var posts_1 = __importDefault(require("../controller/posts"));
var postsRouter = express_1.default.Router();
postsRouter.get("/", function (req, res) {
    posts_1.default.getPosts(req, res);
});
postsRouter.post("/", function (req, res) {
    posts_1.default.createPosts(req, res);
});
postsRouter.delete("/", function (req, res) {
    posts_1.default.deleteAll(req, res);
});
postsRouter.delete("/:id", function (req, res) {
    posts_1.default.deleteById(req, res);
});
postsRouter.patch("/:id", function (req, res) {
    posts_1.default.editPosts(req, res);
});
exports.default = postsRouter;
