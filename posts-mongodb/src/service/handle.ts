import http from "http";
import headers from "./headers";

class Handle {
    success(res: http.ServerResponse, result: any): void {
        res.writeHead(200, headers);
        res.write(JSON.stringify({ status: "success", result }));
        res.end();
    }

    error(res: http.ServerResponse, message: string): void {
        res.writeHead(400, headers);
        res.write(JSON.stringify({ status: "error", message }));
        res.end();
    }
}

export default new Handle();
