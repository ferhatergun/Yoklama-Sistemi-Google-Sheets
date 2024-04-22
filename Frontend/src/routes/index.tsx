import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Attendance from "../pages/Attendance";
import Logo from "../components/Logo";

const router = createBrowserRouter([
  {
    path: "/",
    element: (  // genel bir container layoutu oluşturuldu
      <div className="container mx-auto text-center">
        <Logo />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
    ],
  },
]);

export default router;
