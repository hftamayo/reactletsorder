import React, { useState } from "react";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import CartProvider from "./store/CartProvider";

const FoodOrder = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [SignupIsShown, setSignupIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  const showSignupHandler = () => {
    setSignupIsShown(true);
  };

  const hideSignupHandler = () => {
    setSignupIsShown(false);
  };  

  const requestLogoutHandler = () => {
    /*
    steps to consider:
    1. products in the cart
    2. orders not place them
    */

    /*
    source code example:
      const authCtx = useContext(AuthContext);
      <Button onClick={authCtx.onLogout}>Logout</Button>
    */
  }


  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {loginIsShown && <Login onClose={hideLoginHandler} />}
      {SignupIsShown && <Signup onClose={hideSignupHandler} />}
      <Header
        onShowCart={showCartHandler}
        onShowLogin={showLoginHandler}
        onShowSignup={showSignupHandler}
        onRequestLogout={requestLogoutHandler}
      />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default FoodOrder;
