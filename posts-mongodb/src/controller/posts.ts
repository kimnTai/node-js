import http from "http";
import Posts from "../model/post";
import Handle from "../service/handle";

class PostsController {
    async getPosts(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        const getResult = await Posts.find();
        Handle.success(res, getResult);
    }

    async createPosts(req: http.IncomingMessage, res: http.ServerResponse, body: string): Promise<void> {
        try {
            const { content, type, name } = JSON.parse(body);
            const postResult = await Posts.create({ content, type, name });
            Handle.success(res, postResult);
        } catch (error: any) {
            Handle.error(res, error.message);
        }
    }

    async deleteAll(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        await Posts.deleteMany({});
        Handle.success(res, { message: "刪除成功" });
    }

    async editPosts(req: http.IncomingMessage, res: http.ServerResponse, body: string): Promise<void> {
        const id = req.url?.split("/").pop();
        try {
            const { content, type, name } = JSON.parse(body);
            await Posts.findByIdAndUpdate(id, { content, type, name });
            const patchResult = await Posts.findById(id);
            Handle.success(res, patchResult);
        } catch (error: any) {
            Handle.error(res, error.message);
        }
    }

    async deleteById(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
        const id = req.url?.split("/").pop();
        const deleteResult = await Posts.findByIdAndDelete(id);
        if (deleteResult) {
            Handle.success(res, { message: "刪除成功" });
        } else {
            Handle.error(res, "無此 id");
        }
    }
}

export default new PostsController();
