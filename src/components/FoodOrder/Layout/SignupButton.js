import { useEffect, useState } from "react";
import SignupIcon from "../Login/SignupIcon";
import classes from "./HeaderCartButton.module.css";

const SignupButton = (props) => {
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
        <SignupIcon />
      </span>
      <span>Signup</span>
    </button>
  );
};

export default SignupButton;
