import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//routes
import App from "./app";
import Home from './views/Home'
import Category from "./views/admin/categories";
import NewCategory from "./views/admin/categories/form";

const router = createBrowserRouter([
  {
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin/categories",
        element: <Category />,
      },
      {
        path: "/admin/categories/new",
        element: <NewCategory />,
      },
      {
        path: "/admin/categories/edit/:id",
        element: <NewCategory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);