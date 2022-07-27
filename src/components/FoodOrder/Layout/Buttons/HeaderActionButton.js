import { useEffect, useState } from "react";
import SignupIcon from "./SignupIcon";
import UserIcon from "./UserIcon";
import classes from "./HeaderCartButton.module.css";

const LogoutButton = (props) => {
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
        <LogoutIcon />
      </span>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
