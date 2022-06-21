import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import OrderDetails from "./OrderDetails";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isErrorOnSentOrder, setIsErrorOnSentOrder] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const showCartHandler = () => {
    setIsCheckout(false);
  };

  const errorOnSentOrderHandler = () => {
    setIsErrorOnSentOrder(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("http://localhost:3000/ordertemps", {
      //
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartCtx.items[0]), //please include user: userData
    });

    if (!response.ok) {
      errorOnSentOrderHandler();
    } else {
      setIsSubmitting(false);
      setIsCheckout(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartEmptyButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  const cartContentButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes["button--alt"]} onClick={orderHandler}>
        Order's Details
      </button>
    </React.Fragment>
  );

  const orderDetailsButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes["button--alt"]} onClick={showCartHandler}>
        Cart's Content
      </button>
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>
      {!isCheckout && hasItems
        ? cartContentButtons
        : !isCheckout && !hasItems
        ? cartEmptyButtons
        : orderDetailsButtons}
    </div>
  );

  const CartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalActions}
    </React.Fragment>
  );

  const OrderDetailsModalContent = (
    <React.Fragment>
      {isCheckout && (
        <OrderDetails onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnSentOrderModalContent = (
    <React.Fragment>
      <p>Process failed. An error occurs sending the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !isCheckout && CartModalContent}
      {isCheckout && OrderDetailsModalContent}
      {isSubmitting && isSubmittingModalContent}
      {isErrorOnSentOrder && errorOnSentOrderModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
