import React, { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
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
    const rawData = cartCtx.items;
    const cleanData = rawData.map(({id, ...restOfTheFields}) => restOfTheFields);

    const response = await fetch("http://localhost:3000/ordertemps", {
      //
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ordertemp: cleanData,
       }), //please include user: userData
    });

    if (!response.ok){
      errorOnSentOrderHandler();
    }
    else{
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
      <button className={classes["button--alt"]} onClick={orderHandler}>
        Order's Details
      </button>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>      
    </React.Fragment>
  );

  const orderDetailsButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={submitOrderHandler}>
        Confirm Order
      </button>            
      <button className={classes["button--alt"]} onClick={showCartHandler}>
        Cart's Content
      </button>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
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
        <OrderDetails />
      )}
      {modalActions}
    </React.Fragment>
  );

  /* incluir transaccion para verificar si es exitoso o hubo algun error */
  const isSubmittingModalContent = (
    <React.Fragment>
      <p>Sending order data...</p>
    </React.Fragment>
  );

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
      {isCheckout && !isSubmitting && OrderDetailsModalContent}
      {isSubmitting && !isErrorOnSentOrder && !didSubmit && isSubmittingModalContent}
      {isErrorOnSentOrder && errorOnSentOrderModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
