import React, { useContext } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import ShopContext from "../../context/context";

const PaypalButton = () => {
  const value = useContext(ShopContext);
  const { clearCartAndCartCounter, handleCartClose, total } = value;

  const onSuccessPayment = (payment) => {
    console.log("payment succesful ", payment);
    clearCartAndCartCounter();
    handleCartClose();
  };

  const onCancelPayment = (payment) => {
    console.log("payment cancelled ", payment);
  };

  const onErrorPayment = (error) => {
    console.log("error ", error);
  };

  const environment = "sandbox";
  const currency = "USD";
  const client = {
    sandbox: process.env.REACT_APP_PAYPAL_ID,
    production: "",
  };
  return (
    <PaypalExpressBtn
      currency={currency}
      env={environment}
      client={client}
      onSuccess={onSuccessPayment}
      onCancel={onCancelPayment}
      onError={onErrorPayment}
      total={total}
    />
  );
};

export default PaypalButton;
