import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AdminHome from "../admin/pages/AdminHome";
import Signup from "../admin/pages/Signup";
import Signin from "../admin/pages/Signin";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <AdminHome /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
