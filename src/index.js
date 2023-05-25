import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoutes from "./router/PrivateRoutes";
import NavbarComponent from './components/Navbar'
import { Container } from 'react-bootstrap'

//routes
import Home from './views/Home'
import Category from "./views/admin/categories";
import CategoryForm from "./views/admin/categories/form";
import Articles from "./views/admin/articles";
import ArticlesForm from "./views/admin/articles/form";
import ViewArticle from "./views/admin/articles/ViewArticle"
import SearchArticles from "./views/admin/articles/SearchArticles"

const token = true

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <NavbarComponent token={token} />
      <Container style={{ width: '70%' }}>
        <Routes>
          <Route path="/:page?" element={<Home />} />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path="/articles/category/:id" element={<SearchArticles />} />
          <Route
            path="/admin/categories"
            element={
              <PrivateRoutes token={token}>
                <Category />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin/categories/new"
            element={
              <PrivateRoutes token={token}>
                <CategoryForm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={
              <PrivateRoutes token={token}>
                <CategoryForm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <PrivateRoutes token={token}>
                <Articles />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <PrivateRoutes token={token}>
                <ArticlesForm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/admin/articles/edit/:id"
            element={
              <PrivateRoutes token={token}>
                <ArticlesForm />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  </>
);