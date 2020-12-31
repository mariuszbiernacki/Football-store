import React, { useContext } from "react";
import ProductsList from "../../components/ProductList/ProductsList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import ShopContext from "../../context/context";
import "./Products.scss";

const Products = () => {
  const value = useContext(ShopContext);
  const { seeFilters, filtersVisibility } = value;
  return (
    <div className="products-page">
      <h1 className="products-page__h1">Products</h1>
      <button className="products-page__btn" onClick={seeFilters}>
        {filtersVisibility === true ? "hide filters" : "display filters"}
      </button>
      <FilterMenu />
      <ProductsList />
    </div>
  );
};

export default Products;
