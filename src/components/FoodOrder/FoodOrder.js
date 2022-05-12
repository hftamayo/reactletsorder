import React, { useState } from 'react';
import Header from './Layout/Header';
import Meals from './Meals/Meals';
import Cart from './Cart/Cart';
import Login from './Login/Login';
import CartProvider from './store/CartProvider';


const FoodOrder = () => {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [loginIsShown, setLoginIsShown] = useState(false);
    
    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }

    const showLoginHandler = () => {
        setLoginIsShown(true);
    }

    const hideLoginHandler = () => {
        setLoginIsShown(false);
    }

    return(
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <Header onShowCart={showCartHandler} onShowLogin={showLoginHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>

    );
}

export default FoodOrder;