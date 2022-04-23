import http from "http";
import HttpController from "../controller/http";
import Handle from "../service/handle";
import PostsController from "../controller/posts";
import Posts from "../model/post";

const router = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const { url, method } = req;

    if (req.method === "OPTIONS") {
        HttpController.cors(req, res);
        return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    await new Promise((resolve) => req.on("end", resolve));
    if (url === "/posts") {
        switch (method) {
            case "GET":
                PostsController.getPosts(req, res);
                break;
            case "POST":
                PostsController.createPosts(req, res, body);
                break;
            case "DELETE":
                PostsController.deleteAll(req, res);
                break;
            default:
                Handle.error(res, "無此方法");
                break;
        }
        return;
    }
    if (url?.startsWith("/posts/")) {
        switch (method) {
            case "PATCH":
                PostsController.editPosts(req, res, body);
                break;
            case "DELETE":
                PostsController.deleteById(req, res);
                break;
            default:
                Handle.error(res, "無此方法");
                break;
        }
        return;
    }

    HttpController.notFound(req, res);
};

export default router;
