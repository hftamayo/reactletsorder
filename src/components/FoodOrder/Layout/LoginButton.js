import { useEffect, useState } from "react";
import LoginIcon from "../Login/LoginIcon";
import classes from "./HeaderCartButton.module.css";

const LoginButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
    }, 300);
    return () => {
        clearTimeout(timer);
    }
  }, []);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <LoginIcon />
      </span>
      <span>Login</span>
    </button>
  );
};

export default LoginButton;
