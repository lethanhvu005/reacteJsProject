import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/home";
import IndexBlog from "../pages/Blog";
import DetailBlog from "../pages/Blog/detail";
import Login from "../pages/User/login";
import Register from "../pages/User/register";
import UpdateUser from "../pages/User/update";
import MyProduct from "../pages/Product/myProduct";
import AddProduct from "../pages/Product/addProduct";
import EditProduct from "../pages/Product/editProduct";
import ProductDetail from "../pages/Product/productDetail";
import CartProduct from "../pages/Product/cartProduct";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<IndexBlog />} />
        <Route path="/blog/detail/:id" element={<DetailBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/updateUser/:id" element={<UpdateUser />} />
        <Route path="/user/my-product" element={<MyProduct />} />
        <Route path="/user/product/add" element={<AddProduct />} />
        <Route path="user/product/update/:id" element={<EditProduct />} />
        <Route path="product/detail/:id" element={<ProductDetail/>}/>
        <Route path="product/cart" element={<CartProduct/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
