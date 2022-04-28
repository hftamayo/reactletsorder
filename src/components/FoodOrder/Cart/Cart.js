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

  const submitOrderHandler = async (userData) => {
    /*
    await fetch("http://localhost:8080/api/orders", {  
      credentials: "include",    
      method: "POST",
      body: JSON.stringify(pruebaData),
      headers: {
        'Content-Type': 'application/json',
//        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBmYWtlbWFpbC5jb20iLCJleHAiOjE2MzI3NTAzODYsImlhdCI6MTYzMjcxNDM4Nn0.2tvdnG9B0HdpUpV0xsOKKaATFkyuNVKMpzYE8sXBFtw',
      }
      */

    setIsSubmitting(true);
    await fetch("https://movieserp-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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
      <button className={classes["button--alt"]} onClick={orderHandler}>
        Cart's Content
      </button>
      <button className={classes["button--alt"]} onClick={orderHandler}>
        Order's Checkout
      </button>
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>
      {!isCheckout && hasItems ? cartContentButtons : orderDetailsButtons}
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
      {!isSubmitting && !didSubmit && CartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
