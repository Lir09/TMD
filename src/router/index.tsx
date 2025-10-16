import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 공통 레이아웃
    children: [{ path: "", element: <login /> }],
  },
]);

export default router;
