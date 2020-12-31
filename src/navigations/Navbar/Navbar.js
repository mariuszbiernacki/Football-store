import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShopContext from "../../context/context";
import styled from "styled-components";
import "./Navbar.scss";

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Navbar = () => {
  const value = useContext(ShopContext);

  const { handleCartOpen, cartCounter, clearHomeInterval } = value;

  return (
    <ul className="navbar__list">
      <li className="navbar__item">
        <NavLink onClick={clearHomeInterval} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <Link className="navbar__link" onClick={clearHomeInterval} to="/about">
          About
        </Link>
      </li>
      <li>
        <Link
          className="navbar__link"
          onClick={clearHomeInterval}
          to="/products"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          className="navbar__link"
          onClick={clearHomeInterval}
          to="/contact"
        >
          Contact
        </Link>
      </li>
      <li>
        <button className="navbar-cart__btn" onClick={handleCartOpen}>
          <span className="navbar-cart__counter">{cartCounter}</span>
        </button>
      </li>
    </ul>
  );
};

export default Navbar;
