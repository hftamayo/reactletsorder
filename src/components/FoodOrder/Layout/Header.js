import React, { useContext, Fragment } from "react";
import AuthContext from "../store/auth-context";
import HeaderCartButton from "./HeaderCartButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";
import mealsImage from "../assets/banner.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Lets Order!!!</h1>
        {authCtx.isLoggedIn ? (
          <div className={classes.btncontainer}>
          <HeaderCartButton onClick={props.onShowCart} />
          <LogoutButton />
          </div>
        ) : (
          <div className={classes.btncontainer}>
            <LoginButton onClick={props.onShowLogin} />
            <SignupButton onClick={props.onShowSignup} />
          </div>
        )}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="all you can eat brunch" />
      </div>
    </Fragment>
  );
};

export default Header;
