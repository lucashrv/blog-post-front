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
import CategoryForm from "./views/admin/categories/form";
import Articles from "./views/admin/articles";
import ArticlesForm from "./views/admin/articles/form";

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
        element: <CategoryForm />,
      },
      {
        path: "/admin/categories/edit/:id",
        element: <CategoryForm />,
      },
      {
        path: "/admin/articles",
        element: <Articles />,
      },
      {
        path: "/admin/articles/new",
        element: <ArticlesForm />,
      },
      {
        path: "/admin/articles/edit/:id",
        element: <ArticlesForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);