import http from "http";
import headers from "./headers";

const errorHandle = (res: http.ServerResponse) => {
  res.writeHead(404, headers);
  res.write(JSON.stringify({ status: "false", message: "欄位未填寫正確,或無此 todo id" }));
  res.end();
};

const successHandle = (res: http.ServerResponse, todoList: { title: string; id: string }[]) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify({ status: "success", data: todoList }));
  res.end();
};

export { errorHandle, successHandle };
