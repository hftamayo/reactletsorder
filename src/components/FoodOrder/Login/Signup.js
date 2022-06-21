import React, { useContext, useState, useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";

const Signup = (props) => {
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  //const cartCtx = useContext(CartContext);

  const errorOnSignupHandler = () => {
    setIsErrorOnSave(true);
  };

  const signupHandler = () => {
    setIsSaving(true);
    const enteredFirstname = firstnameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const newClientData = {
      firstname: enteredFirstname,
      lastname: enteredLastname,
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(newClientData);

    const response = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientData),
    });

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
        ref={firstnameInputRef}
        id="firstname"
        label="First Name"
        type="text"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        ref={lastnameInputRef}
        id="lastname"
        label="Last Name"
        type="text"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        ref={emailInputRef}
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
        ref={passwordInputRef}
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
      {!isCanceling && !isSaving && !isErrorOnSave && !didSave && SignupModalContent}
      {isSaving && isSavingModalContent}
      {isErrorOnSave && errorOnSavingModalContent}
      {!isSaving && didSave && didSaveModalContent}
    </Modal>
  );
};

export default Signup;
