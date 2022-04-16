import http from "http";
import mongoose from "mongoose";
import requestListener from "./requestListener";

const server = http.createServer(requestListener);

import("dotenv/config").then(async () => {
    const { PORT, DATABASE, DATABASE_PASSWORD } = process.env;
    server.listen(PORT);
    console.log("伺服器啟動中");
    const url = DATABASE?.replace("<password>", DATABASE_PASSWORD as string) as string;
    await mongoose.connect(url);
    console.log("資料庫連線中");
});
