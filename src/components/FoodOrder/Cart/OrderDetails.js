import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import classes from "./Orderdetails.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotNineChars = (value) => value.trim().length !== 9;
const paymentMethods = ["Cash", "Credit", "Crypto"];

const OrderDetails = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    clientName: true,
    clientCellPhone: true,
    streetDeliveryAddress: true,
    cityDeliveryAddress: true,
    postalCodeDeliveryAddress: true,
    ordersDeliveryAddress: true,
    clientMethodPayment: true,
  });

  //estos objetos sirven para no capturar todos los keystrokes durante dataInput
  const clientNameRef = useRef();
  const clientCellPhoneRef = useRef();
  const streetDeliveryAddressRef = useRef();
  const cityDeliveryAddressRef = useRef();
  const postalCodeDeliveryAddressRef = useRef();
  const ordersDeliveryAddressRef = useRef();
  const clientMethodPaymentRef = useRef();

  const ConfirmHandler = (event) => {
    event.preventDefault();

    const enteredName = clientNameRef.current.value;
    const enteredCellPhone = clientCellPhoneRef.current.value;
    const enteredOrdersDeliveryAddress = ordersDeliveryAddressRef.current.value;
    const enteredStreetDeliveryAddress = streetDeliveryAddressRef.current.value;
    const enteredCityDeliveryAddress = cityDeliveryAddressRef.current.value;
    const enteredPostalCodeDeliveryAddress =
      postalCodeDeliveryAddressRef.current.value;
    const enteredClientMethodPayment = clientMethodPaymentRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCellPhoneIsValid = !isNotNineChars(enteredCellPhone);
    const enteredOrdersDeliveryAddressIsValid = !isEmpty(
      enteredOrdersDeliveryAddress
    );
    const enteredStreetDeliveryAddressIsValid = !isEmpty(
      enteredStreetDeliveryAddress
    );
    const enteredCityDeliveryAddressIsValid = !isEmpty(
      enteredCityDeliveryAddress
    );
    const enteredPostalCodeDeliveryAddressIsValid = !isEmpty(
      enteredPostalCodeDeliveryAddress
    );
    const enteredClientMethodPaymentIsValid = !isEmpty(
      enteredClientMethodPayment
    );

    setFormInputsValidity({
      clientName: enteredNameIsValid,
      clientCellPhone: enteredCellPhoneIsValid,
      ordersDeliveryAddress: enteredOrdersDeliveryAddressIsValid,
      streetDeliveryAddress: enteredStreetDeliveryAddressIsValid,
      cityDeliveryAddress: enteredCityDeliveryAddressIsValid,
      postalCodeDeliveryAddress: enteredPostalCodeDeliveryAddressIsValid,
      clientMethodPayment: enteredClientMethodPaymentIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCellPhoneIsValid &&
      enteredOrdersDeliveryAddressIsValid &&
      enteredStreetDeliveryAddressIsValid &&
      enteredCityDeliveryAddressIsValid &&
      enteredPostalCodeDeliveryAddressIsValid &&
      enteredClientMethodPayment;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      clientName: enteredName,
      clientCellPhone: enteredCellPhone,
      ordersDeliveryAddress: enteredOrdersDeliveryAddress,
      streetDeliveryAddress: enteredStreetDeliveryAddress,
      cityDeliveryAddress: enteredCityDeliveryAddress,
      postalCodeDeliveryAddress: enteredPostalCodeDeliveryAddress,
      clientMethodPayment: enteredClientMethodPayment,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.clientName ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.clientCellPhone ? "" : classes.invalid
  }`;
  const delivAddressControlClasses = `${classes.control} ${
    formInputsValidity.ordersDeliveryAddress ? "" : classes.invalid
  }`;
  const cityDeliveryAddressControlClasses = `${classes.control} ${
    formInputsValidity.cityDeliveryAddress ? "" : classes.invalid
  }`;
  const streetDeliveryAddressControlClasses = `${classes.control} ${
    formInputsValidity.streetDeliveryAddress ? "" : classes.invalid
  }`;
  const postalCodeDeliveryAddressControlClasses = `${classes.control} ${
    formInputsValidity.postalCodeDeliveryAddress ? "" : classes.invalid
  }`;
  const clientMethodPaymentControlClasses = `${classes.control} ${
    formInputsValidity.clientMethodPayment ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={ConfirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="clientName">Client's Name</label>
        <input
          type="text"
          autoComplete="off"
          id="clientName"
          ref={clientNameRef}
        />
        {!formInputsValidity.clientName && <p>Please Enter a valid Name</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="clientCellPhone">Client's Cell Phone Number</label>
        <input
          type="text"
          id="clientCellPhone"
          autocomplete="off"
          ref={clientCellPhoneRef}
        />
        {!formInputsValidity.clientCellPhone && (
          <p>Please Enter a 8 digits numbers</p>
        )}
      </div>
      <div className={delivAddressControlClasses}>
        <label htmlFor="ordersDeliveryAddress">Delivery Address *</label>
        <input
          type="text"
          id="ordersDeliveryAddress"
          autocomplete="off"
          ref={ordersDeliveryAddressRef}
        />
        {!formInputsValidity.ordersDeliveryAddress && (
          <p>Please Enter a valid address</p>
        )}
      </div>
      <div className={cityDeliveryAddressControlClasses}>
        <label htmlFor="cityDeliveryAddress">City Delivery Address *</label>
        <input
          type="text"
          id="cityDeliveryAddress"
          autocomplete="off"
          ref={cityDeliveryAddressRef}
        />
        {!formInputsValidity.cityDeliveryAddress && (
          <p>Please Enter a valid city name</p>
        )}
      </div>
      <div className={streetDeliveryAddressControlClasses}>
        <label htmlFor="streetDeliveryAddress">Street Delivery Address *</label>
        <input
          type="text"
          id="streetDeliveryAddress"
          autocomplete="off"
          ref={streetDeliveryAddressRef}
        />
        {!formInputsValidity.streetDeliveryAddress && (
          <p>Please Enter a valid street name</p>
        )}
      </div>
      <div className={postalCodeDeliveryAddressControlClasses}>
        <label htmlFor="postalCodeDeliveryAddress">
          Postal Code Delivery Address *
        </label>
        <input
          type="text"
          id="postalCodeDeliveryAddress"
          autocomplete="off"
          ref={postalCodeDeliveryAddressRef}
        />
        {!formInputsValidity.postalCodeDeliveryAddress && (
          <p>Please Enter a valid Postal Code</p>
        )}
      </div>

      <div className={clientMethodPaymentControlClasses}>
        <label htmlFor="clientMethodPayment">Method of Payment *</label>
        <Autocomplete
          options={paymentMethods}
          style={{ width: 300 }}
          autoHighlight
          renderInput={(params) => (
            <TextField
              id="clientMethodPayment"
              {...params}
              variant="outlined"
              autocomplete="off"
              ref={clientMethodPaymentRef}
            />
          )}
        />
        {!formInputsValidity.clientMethodPayment && (
          <p>Please choose a method of payment</p>
        )}
      </div>

      <div className={classes.actions}>
        <button>Confirm Order</button>
      </div>
    </form>
  );
};

export default OrderDetails;
