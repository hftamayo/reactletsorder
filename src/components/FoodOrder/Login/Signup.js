import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import AuthContext from "../store/auth-context";

const Signup = (props) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  //const cartCtx = useContext(CartContext);

  const errorOnSignupHandler = () => {
    setIsErrorOnSave(true);
  };

  const signupHandler = async (userData) => {

    setIsSaving(true);

    const response = await fetch(
      "http://localhost:3000/clients",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client: clientData[0],
        }),
      }
    );

    if (!response.ok) {
      errorOnSignupHandler();
    } else {
      setIsSaving(false);
      setIsCanceling(false);
      setDidSave(true);
      //cartCtx.clearCart();
    }
  };

  const isSavingModalContent = <p>Saving new user...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnSavingModalContent = (
    <React.Fragment>
      <p>The user account could not be created. Please try again later</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const didSaveModalContent = (
    <React.Fragment>
      <p>User account created, welcome!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const SignupButtons = (
    <React.Fragment>
      <button className={classes["button--alt"]} onClick={signupHandler}>
        Sign-Up
      </button>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
  );

  const SignupModalContent = (
    <React.Fragment>
      <Input
        //ref={emailInputRef}
        id="firstname"
        label="First Name"
        type="text"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        //ref={emailInputRef}
        id="lastname"
        label="Last Name"
        type="text"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
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
      <Input
        //ref={passwordInputRef}
        id="paswword2"
        label="Confirm-Password"
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
      {!isCanceling && !isSaving && !isErrorOnSave && SignupModalContent}
      {isSaving && isSavingModalContent}
      {isErrorOnSave && errorOnSavingModalContent}
      {!isSaving && didSave && didSaveModalContent}
    </Modal>
  );
};

export default Signup;
