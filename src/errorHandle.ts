import http from "http";
import todoList from "./data";
import headers from "./headers";

const errorHandle = (res: http.ServerResponse, code: number) => {
  res.writeHead(code, headers);
  let message = "";
  switch (code) {
    case 400:
      message = `客戶端請求的語法錯誤，服務器無法理解`;
      break;
    case 404:
      message = `務器無法根據客戶端的請求找到資源（網頁）。通過此代碼，網站設計人員可設置"您所請求的資源無法找到"的個性頁面`;
      break;
    case 405:
      message = `客戶端請求中的方法被禁止`;
      break;
  }
  res.write(JSON.stringify({ status: "false", message: message }));
  res.end();
};

const successHandle = (res: http.ServerResponse) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify({ status: "success", data: todoList }));
  res.end();
};

export { errorHandle, successHandle };
