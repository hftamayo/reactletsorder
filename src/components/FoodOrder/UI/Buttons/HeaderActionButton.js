import { useEffect, useState } from "react";
import SignupIcon from "./SignupIcon";
import UserIcon from "./UserIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderActionButton = (props) => {
  const userIcon = props.userIcon;
  const requestedLabel = props.requestedLabel;   
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
        {userIcon === 1 ? <UserIcon /> : <SignupIcon />}
      </span>
      <span>{requestedLabel}</span>
    </button>
  );
};

export default HeaderActionButton;
