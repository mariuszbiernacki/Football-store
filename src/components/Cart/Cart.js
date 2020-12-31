import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ShopContext from "../../context/context";
import "./Cart.scss";
import PaypalButton from "../PaypalButton/PaypalButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "10px",
    width: "32vw",
    height: "100vh",
  },
}));

const Cart = () => {
  const classes = useStyles();

  const value = useContext(ShopContext);

  const {
    isCartOpen,
    handleCartClose,
    cart,
    removeProductFromCart,
    total,
    increaseProductQuantity,
    decreaseProductQuantity,
    clearCartAndCartCounter,
  } = value;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isCartOpen}
        onClose={handleCartClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCartOpen}>
          <div className={classes.paper}>
            <h2 className="cart__h2">Your cart</h2>
            <button
              className="cart__clear__btn"
              onClick={clearCartAndCartCounter}
            >
              clear all
            </button>
            <ul className="cart__list">
              {cart.map((product) => {
                const { productName, productPrice, productQuantity } = product;
                return (
                  <li className="cart__item" key={productName}>
                    <div className="cart__name">
                      <img
                        className="cart__img"
                        src={product.productImage.fields.file.url}
                        alt="t-shirt"
                      />
                      <h4 className="cart__h4">{productName}</h4>
                    </div>

                    <div className="cart__info">
                      <button
                        onClick={() => decreaseProductQuantity(productName)}
                        className="cart__btn"
                      >
                        -
                      </button>
                      <p className="cart__p">{productQuantity}</p>
                      <button
                        onClick={() => increaseProductQuantity(productName)}
                        className="cart__btn"
                      >
                        +
                      </button>
                      <h5 className="cart__h5">{productPrice}$</h5>
                      <button
                        className="cart__btn"
                        onClick={() => removeProductFromCart(productName)}
                      >
                        x
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {total !== 0 ? (
              <>
                <p className="cart__total">total: {total}</p>
                <PaypalButton />
              </>
            ) : (
              <p className="cart__information">your cart is empty</p>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Cart;
