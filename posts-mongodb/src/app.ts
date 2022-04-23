import http from "http";
import router from "./router";
import "./connection";

const app = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    router(req, res);
};

export default app;
