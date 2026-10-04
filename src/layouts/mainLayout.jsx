import React from "react";
import Header_main from "../components/header_main";
import { Outlet } from "react-router-dom";
import Footer_main from "../components/footer_main";

const MainLayout = () => {
  return (
    <>
      <Header_main />
      <Outlet />
      <Footer_main />
    </>
  );
};

export default MainLayout;
