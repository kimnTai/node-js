import http from "http";
import headers from "./headers";
import { v4 as uuidv4 } from "uuid";
import { errorHandle, successHandle } from "./errorHandle";
import todoList from "./data";

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  // CORS 跨網域
  if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));

  if (req.url == "/todo") {
    switch (req.method) {
      case "GET":
        successHandle(res);
        break;
      case "POST":
        req.on("end", () => {
          try {
            const { title } = JSON.parse(body);
            if (title) {
              todoList.push({ title: title, id: uuidv4() });
              successHandle(res);
            } else {
              errorHandle(res, 400);
            }
          } catch (error) {
            errorHandle(res, 400);
          }
        });
        break;
      case "DELETE":
        todoList.length = 0;
        successHandle(res);
        break;
      default:
        errorHandle(res, 405);
        break;
    }
    return;
  }
  if (req.url?.startsWith("/todo/")) {
    const id = req.url.split("/").pop();
    const index = todoList.findIndex((item) => item.id == id);
    switch (req.method) {
      case "DELETE":
        if (index !== -1) {
          todoList.splice(index, 1);
          successHandle(res);
        } else {
          errorHandle(res, 400);
        }
        break;
      case "PATCH":
        req.on("end", () => {
          try {
            const { title } = JSON.parse(body);
            if (title && index != -1) {
              todoList[index].title = title;
              successHandle(res);
            } else {
              errorHandle(res, 400);
            }
          } catch (error) {
            errorHandle(res, 400);
          }
        });
        break;
      default:
        errorHandle(res, 405);
        break;
    }
    return;
  }
  errorHandle(res, 404);
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
console.log("伺服器啟動中");
