import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkValidity, updateObject } from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import * as actions from "../../../store/actions";
import classes from "./SetNewPassword.module.css";
import { Redirect } from "react-router-dom";

const SetNewPassword = props => {
  const [newPasswordForm, setNewPasswordForm] = useState({
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "New Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm New Password"
      },
      value: "",
      validation: {
        required: true,
        compare: true
      },
      valid: false,
      touched: false
    }
  });

  const dispatch = useDispatch();
  const onSetNewPassword = (studentId, password) =>
    dispatch(actions.setNewPassword(studentId, password));
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [allControlsAreValid, setAllControlsAreValid] = useState(false);

  const formElementsArray = [];
  for (let key in newPasswordForm) {
    formElementsArray.push({
      id: key,
      config: newPasswordForm[key]
    });
  }

  const inputChangedHandler = (event, controlName) => {
    let valid = true;

    let valueToBeValidated = event.target.value;

    if (controlName === "confirmPassword") {
      valueToBeValidated = [newPasswordForm.password.value, event.target.value];
    }

    let updatedControls = updateObject(newPasswordForm, {
      [controlName]: updateObject(newPasswordForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          valueToBeValidated,
          newPasswordForm[controlName].validation
        ),
        touched: true
      })
    });

    if (controlName === "password" && newPasswordForm.confirmPassword.touched) {
      valueToBeValidated = [
        event.target.value,
        newPasswordForm.confirmPassword.value
      ];
      updatedControls = updateObject(updatedControls, {
        confirmPassword: updateObject(newPasswordForm.confirmPassword, {
          value: newPasswordForm.confirmPassword.value,
          valid: checkValidity(
            valueToBeValidated,
            newPasswordForm.confirmPassword.validation
          ),
          touched: true
        })
      });
    }

    for (let inputIdentifier in updatedControls) {
      valid = updatedControls[inputIdentifier].valid && valid;
    }

    setAllControlsAreValid(valid);

    setNewPasswordForm(updatedControls);
  };

  const onSubmit = event => {
    event.preventDefault();
    onSetNewPassword(props.match.params.id, newPasswordForm.password.value);
    setShouldRedirect(true);
  };

  let formInputs = formElementsArray.map(el => {
    let extraErr = el.id === "password" ? " (min 6 chars)" : "";
    let errorMessage = "Please enter a valid " + el.id + extraErr;
    if (el.id === "confirmPassword") {
      errorMessage = "Passwords are not the same!";
    }
    return (
      <Input
        key={el.id}
        invalid={!el.config.valid}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        changed={event => inputChangedHandler(event, el.id)}
        shouldValidate={el.config.validation}
        errorMessage={errorMessage}
        touched={el.config.touched}
        value={el.config.value}
      />
    );
  });

  let redirect = null;
  if (shouldRedirect) {
    redirect = <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Change your password</h1>

      {redirect}
      <form className={classes.SetNewPasswordForm}>
        {formInputs}
        <Button
          clicked={event => onSubmit(event)}
          disabled={!allControlsAreValid}
        >
          change passwords
        </Button>
      </form>
    </div>
  );
};

export default SetNewPassword;
