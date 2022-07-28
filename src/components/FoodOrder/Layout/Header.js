import React, { useContext, Fragment } from "react";
import AuthContext from "../store/auth-context";
import HeaderCartButton from "../UI/Buttons/HeaderCartButton";
import HeaderActionButton from "../UI/Buttons/HeaderActionButton";
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
          <HeaderActionButton onClick={props.onRequestLogout} userIcon={1} requestedLabel="Logout" />
          </div>
        ) : (
          <div className={classes.btncontainer}>
            <HeaderActionButton onClick={props.onShowLogin} userIcon={1} requestedLabel="Login" />
            <HeaderActionButton onClick={props.onShowSignup} userIcon={0} requestedLabel="SignUp" />
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
