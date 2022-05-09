import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const price = `$${props.price.toFixed(2)}`; //content literal formatting

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });


  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
      {authCtx.isLoggedIn && <MealItemForm onAddToCart={addToCartHandler} />}
      </div>
    </li>
  );
};

export default MealItem;
