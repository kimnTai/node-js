import http from "http";
import headers from "./headers";

const successHandle = (res: http.ServerResponse, result: any) => {
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", result }));
    res.end();
};

const errorHandle = (res: http.ServerResponse, message: string) => {
    res.writeHead(400, headers);
    res.write(JSON.stringify({ status: "error", message }));
    res.end();
};

export { successHandle, errorHandle };
