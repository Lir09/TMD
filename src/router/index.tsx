// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // ✅ 이거 꼭 추가
import Login from "../pages/Login"; // ✅ 대문자 컴포넌트

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 공통 레이아웃
    children: [{ path: "", element: <Login /> }],
  },
]);

export default router;
