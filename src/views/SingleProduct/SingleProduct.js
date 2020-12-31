import React, { useContext } from "react";
import "./SingleProduct.scss";
import ShopContext from "../../context/context";

const SingleProduct = (props) => {
  const value = useContext(ShopContext);

  const { checkCart, addProductToCart, increaseCartCounter } = value;
  const {
    productImage,
    productName,
    productPrice,
    productDesc,
    productCategory,
  } = props.location.state;
  return (
    <div className="singleProduct">
      <img
        className="singleProduct__img"
        src={productImage}
        alt="football t-shirt"
      />
      <h2 className="singleProduct__h2">{productName}</h2>
      <h3 className="singleProduct__h2">{productPrice} $</h3>
      <h4 className="singleProduct__h3">{productCategory}</h4>
      <p className="singleProduct__p">{productDesc}</p>
      <button
        className="singleProduct__btn"
        onClick={() => {
          checkCart(productName);
          addProductToCart(productName);
          increaseCartCounter();
        }}
      >
        add to cart
      </button>
    </div>
  );
};

export default SingleProduct;
