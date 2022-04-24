import express from "express";
import PostsController from "../controller/posts";

const postsRouter = express.Router();

postsRouter.get("/", (req, res) => {
    PostsController.getPosts(req, res);
});

postsRouter.post("/", (req, res) => {
    PostsController.createPosts(req, res);
});

postsRouter.delete("/", (req, res) => {
    PostsController.deleteAll(req, res);
});

postsRouter.delete("/:id", (req, res) => {
    PostsController.deleteById(req, res);
});

postsRouter.patch("/:id", (req, res) => {
    PostsController.editPosts(req, res);
});

export default postsRouter;
