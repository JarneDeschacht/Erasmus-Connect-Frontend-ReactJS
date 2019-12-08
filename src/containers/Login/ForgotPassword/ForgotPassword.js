// import React, { useState } from './node_modules/react';

import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions";
import classes from "./ForgotPassword.module.css";
import { Redirect } from "react-router-dom";
import FontAwesome from "react-fontawesome"


const Forgotpassword = props => {
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    }
  });
  const dispatch = useDispatch();
  const onSend = email => dispatch(actions.sendForgotPasswordMail(email));
  const error = useSelector(state => state.auth.forgotPasswordError);
  const confirmationMessage = useSelector(
    state => state.auth.confirmationMessage
  );
  const [buttonPressed, setButtonPressed] = useState(false);
  const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const onNavbarDisplaySwitch = useCallback(
    () => dispatch(actions.navbarSwitchDisplay()),
    [dispatch]
  );

  useEffect(() => {
    if (isNavbarVisible) {
      onNavbarDisplaySwitch();
    }
  }, [onNavbarDisplaySwitch, isNavbarVisible]);


  const onSubmit = event => {
    setButtonPressed(true);
    event.preventDefault();
    onSend(forgotPasswordForm.email.value);
  };

  const formElementsArray = [];
  for (let key in forgotPasswordForm) {
    formElementsArray.push({
      id: key,
      config: forgotPasswordForm[key]
    });
  }

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(forgotPasswordForm, {
      [controlName]: updateObject(forgotPasswordForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          forgotPasswordForm[controlName].validation
        ),
        touched: true
      })
    });
    setForgotPasswordForm(updatedControls);
  };

  let formInputs = formElementsArray.map(el => {
    return (
      <Input
        label={el.config.elementConfig.placeholder}
        key={el.id}
        invalid={!el.config.valid}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        changed={event => inputChangedHandler(event, el.id)}
        shouldValidate={el.config.validation}
        errorMessage={"Email is not valid"}
        touched={el.config.touched}
        value={el.config.value}
        type="email"
      />
    );
  });

  let form = (
    <form className={classes.ForgotPasswordForm}>
      {formInputs}
      <div className={classes.FormControls}>
        <Button
          clicked={event => onSubmit(event)}
          disabled={!forgotPasswordForm.email.valid}
        >
          Send email
      </Button>
        <h2 onClick={() => setShouldRedirect(true)}>
          
          <FontAwesome
            name='fas fa-arrow-circle-left'
            size='2x'
            
          />
        </h2>
      </div>
    </form>
  );

  let redirect = null;
  if (confirmationMessage && buttonPressed) {
    redirect = <Redirect to="/" />;
  }

  let goBack = null;
  if (shouldRedirect) {
    goBack = <Redirect to="/login" />
  }

  let topText = (
    <p className={classes.Info}>
      Fill in the email address which is connected to you account. <br />
      We will send you an email with further instructions.
    </p>
  );
  if (error) {
    topText = <p className={classes.ErrorMessage}>{error}</p>;
  }

  return (
    <div className={classes.ForgotPasswordContainer}>
      <h1>enter your email address</h1>
      {topText}
      {redirect}
      {goBack}
      {form}

    </div>
  );
};

export default Forgotpassword;
