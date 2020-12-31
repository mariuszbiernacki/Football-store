import React, { useContext } from "react";
import ShopContext from "../../context/context";
import { Link } from "react-router-dom";
import "./ProductsList.scss";

const ProductsList = () => {
  const value = useContext(ShopContext);

  const {
    filteredProducts,
    addProductToCart,
    increaseCartCounter,
    checkCart,
  } = value;

  return (
    <ul className="products__list">
      {filteredProducts.map((product) => {
        const {
          productName,
          productPrice,
          productDesc,
          productCategory,
          productFreeDelivery,
        } = product;
        return (
          <li className="products__item">
            <Link
              to={{
                pathname: `/products/${productName}`,
                state: {
                  productImage: product.productImage.fields.file.url,
                  productName: productName,
                  productPrice: productPrice,
                  productDesc: productDesc,
                  productCategory: productCategory,
                  productFreeDelivery: productFreeDelivery,
                },
              }}
            >
              <img
                className="products__img"
                src={product.productImage.fields.file.url}
                alt="t-shirt foto"
                style={{ width: "200px", height: "300px" }}
              />
            </Link>

            <h3 className="products__h3">{productName}</h3>
            <h3 className="products__h3">{productPrice} $</h3>
            <button
              className="products__btn"
              onClick={() => {
                checkCart(productName);
                addProductToCart(productName);
                increaseCartCounter();
              }}
            >
              add to cart
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;
