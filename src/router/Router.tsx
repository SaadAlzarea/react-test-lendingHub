import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AdminHome from "../admin/pages/AdminHome";

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
    children: [{ path: "/", element: <AdminHome /> }],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
