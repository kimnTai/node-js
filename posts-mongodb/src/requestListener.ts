import http from "http";
import { errorHandle, successHandle } from "./handle";
import headers from "./headers";
import Posts from "./model/post";

const requestListener = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    await new Promise((resolve) => req.on("end", resolve));
    if (req.url === "/posts") {
        switch (req.method) {
            case "GET":
                const getResult = await Posts.find();
                successHandle(res, getResult);
                break;
            case "POST":
                try {
                    const { content, type, name } = JSON.parse(body);
                    const postResult = await Posts.create({ content, type, name });
                    successHandle(res, postResult);
                } catch (error: any) {
                    errorHandle(res, error.message);
                }
                break;
            case "DELETE":
                await Posts.deleteMany({});
                successHandle(res, { message: "刪除成功" });
                break;
            default:
                errorHandle(res, "無此方法");
                break;
        }
        return;
    }
    if (req.url?.startsWith("/posts/")) {
        const id = req.url.split("/").pop();
        switch (req.method) {
            case "PATCH":
                try {
                    const { content, type, name } = JSON.parse(body);
                    await Posts.findByIdAndUpdate(id, { content, type, name });
                    const patchResult = await Posts.findById(id);
                    successHandle(res, patchResult);
                } catch (error: any) {
                    errorHandle(res, error.message);
                }
                break;
            case "DELETE":
                const deleteResult = await Posts.findByIdAndDelete(id);
                if (deleteResult) {
                    successHandle(res, { message: "刪除成功" });
                } else {
                    errorHandle(res, "無此 id");
                }
                break;
            default:
                errorHandle(res, "無此方法");
                break;
        }
        return;
    }

    errorHandle(res, "無此路由");
};

export default requestListener;
