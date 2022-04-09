import http from "http";
import { connect } from "mongoose";
import Room from "./model/room";

connect("mongodb://localhost:27017/hotel").then(() => {
    console.log("資料庫連線成功");
});

const requestListener = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
        "Content-Type": "application/json",
    };
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    await new Promise((resolve) => req.on("end", resolve));
    if (req.url === "/todo") {
        let rooms;
        switch (req.method) {
            case "GET":
                rooms = await Room.find();
                res.writeHead(200, headers);
                res.write(JSON.stringify({ rooms }));
                break;
            case "POST":
                try {
                    const { title } = JSON.parse(body);
                    rooms = await Room.create({ name: title, price: 600, rating: 4.5 });
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms }));
                } catch (error) {
                    res.writeHead(400, headers);
                    res.write(JSON.stringify({ status: "false" }));
                }
                break;
            case "DELETE":
                await Room.deleteMany({});
                res.writeHead(200, headers);
                res.write(JSON.stringify({ status: "success", rooms: [] }));
                break;
        }
        res.end();
        return;
    }
    if (req.url?.startsWith("/todo/")) {
        const id = req.url.split("/").pop();
        switch (req.method) {
            case "PATCH":
                const updateResult = await Room.findByIdAndUpdate(id, { name: "更新成功" });
                if (updateResult) {
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms: updateResult }));
                    break;
                }
                res.writeHead(400, headers);
                res.write(JSON.stringify({ status: "false" }));
                break;
            case "DELETE":
                const result = await Room.findByIdAndDelete(id);
                if (result) {
                    res.writeHead(200, headers);
                    res.write(JSON.stringify({ status: "success", rooms: result }));
                    break;
                }
                res.writeHead(400, headers);
                res.write(JSON.stringify({ status: "false" }));
                break;
        }
        res.end();
        return;
    }
    res.writeHead(400, headers);
    res.write(JSON.stringify({ status: "false" }));
    res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
console.log("伺服器啟動中");
