import React, { useContext, useState, useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import AuthContext from "../store/auth-context";

const Login = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  
  const [isCanceling, setIsCanceling] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [didValidate, setDidValidate] = useState(false);
  const [isErrorOnValidate, setIsErrorOnValidate] = useState(false);
  const authCtx = useContext(AuthContext);

  const errorOnValidateHandler = () => {
    setIsErrorOnValidate(true);
  };

  const validateCredentialsHandler = async (clientData) => {
    setIsValidating(true);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "hftamayo@ok.com",
        password: "Letsorder01",
      }),
    });
    if (!response.ok) {
      errorOnValidateHandler();
    } else {
      setIsValidating(false);
      setIsCanceling(false);
      setDidValidate(true);
      authCtx.onValidSession();
      //cartCtx.clearCart();
    }
  };

  const isValidatingModalContent = <p>Validating Credentials...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnValidateModalContent = (
    <React.Fragment>
      <p>User or Password incorrect, please verify</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const didValidateModalContent = (
    <React.Fragment>
      <p>Creditials verified, welcome!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const loginButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={validateCredentialsHandler}>
        Login
      </button>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>{!isCanceling ? loginButtons : ""}</div>
  );

  const LoginModalContent = (
    <React.Fragment>
      <Input
        //ref={emailInputRef}
        id="email"
        label="E-Mail"
        type="email"
        autodata="off"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        //ref={passwordInputRef}
        id="paswword"
        label="Password"
        type="password"
        autodata="new-password"
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      {modalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCanceling && !isValidating && !isErrorOnValidate && !didValidate && LoginModalContent}
      {isValidating && isValidatingModalContent}
      {isErrorOnValidate && errorOnValidateModalContent}
      {!isValidating && didValidate && didValidateModalContent}
    </Modal>
  );
};

export default Login;
