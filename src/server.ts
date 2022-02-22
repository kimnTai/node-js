import http from "http";
import headers from "./headers";
import { v4 as uuidv4 } from "uuid";
import { errorHandle, successHandle } from "./errorHandle";

type todoItem = { title: string; id: string };

const todoList: todoItem[] = [];

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
        successHandle(res, todoList);
        break;
      case "POST":
        req.on("end", () => {
          try {
            const { title } = JSON.parse(body);
            if (title !== undefined) {
              const newTodo = { title: title, id: uuidv4() };
              todoList.push(newTodo);
              successHandle(res, todoList);
            } else {
              errorHandle(res);
            }
          } catch (error) {
            errorHandle(res);
          }
        });
        break;
      case "DELETE":
        todoList.length = 0;
        successHandle(res, todoList);
        break;
    }
    return;
  }
  if (req.url?.startsWith("/todo/")) {
    switch (req.method) {
      case "DELETE":
        const id = req.url.split("/").pop();
        const index = todoList.findIndex((item) => item.id == id);
        if (index !== -1) {
          todoList.splice(index, 1);
          successHandle(res, todoList);
        } else {
          errorHandle(res);
        }
        break;
      case "PATCH":
        req.on("end", () => {
          try {
            const { title } = JSON.parse(body);
            const id = req.url?.split("/").pop();
            const index = todoList.findIndex((item) => item.id == id);
            if (title !== undefined && index != -1) {
              todoList[index].title = title;
              successHandle(res, todoList);
            } else {
              errorHandle(res);
            }
          } catch (error) {
            errorHandle(res);
          }
        });
        break;
    }
    return;
  }
  res.writeHead(404, headers);
  res.write(JSON.stringify({ status: "false", message: "無此網站路由" }));
  res.end();
};

const server = http.createServer(requestListener);
server.listen(8080);
console.log("伺服器啟動中");
