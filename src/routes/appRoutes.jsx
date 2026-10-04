import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/home";
import IndexBlog from "../pages/Blog";
import DetailBlog from "../pages/Blog/detail";
import Login from "../pages/User/login";
import Register from "../pages/User/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<IndexBlog />} />
        <Route path="/blog/detail/:id" element={<DetailBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
