import React from "react";
import Navbar from "../navigations/Navbar/Navbar";
import Cart from "../components/Cart/Cart";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Navbar />
      <Cart />
      {children}
    </>
  );
};

export default MainTemplate;
