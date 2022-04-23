import http from "http";
import Handle from "../service/handle";
import headers from "../service/headers";

class HttpController {
    cors(req: http.IncomingMessage, res: http.ServerResponse): void {
        res.writeHead(200, headers);
        res.end();
    }
    notFound(req: http.IncomingMessage, res: http.ServerResponse): void {
        Handle.error(res, "無此路由");
    }
}

export default new HttpController();
