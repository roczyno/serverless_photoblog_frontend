import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Verify from "./pages/verify/Verify";

const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verify",
          element: <Verify />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
