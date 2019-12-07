import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Register.module.css";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {
  checkValidity,
  updateObject,
} from "../../shared/utility";
import { giveCustomErrorMessage } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";

const Register = props => {
  const [registerForm, setRegisterForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
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
    },
    country: {
      elementType: "select",
      value: "",
      elementConfig: {
        placeholder: "Country"
      },
      validation: {},
      valid: true,
      touched: false
    },
    phoneNumber: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone Number"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    dateOfBirth: {
      elementType: "date",
      elementConfig: {
        type: "text",
        placeholder: "Date Of Birth"
      },
      value: ['', '', ''],
      validation: {
        required: true,
        date: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
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
        placeholder: "Confirm Password"
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  let [allControlsAreValid, setAllControlsAreValid] = useState(false);

  let isAuthenticated = useSelector(state => state.auth.idToken !== null);
  const dispatch = useDispatch();
  const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
  const onNavbarDisplaySwitch = useCallback(
    () => dispatch(actions.navbarSwitchDisplay()),
    [dispatch]
  );

  const onRegister = credentials => dispatch(actions.register(credentials));

  const loadingAuth = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const countries = useSelector(state => state.country.countries);
  const onFetchCountries = useCallback(
    () => dispatch(actions.fetchCountries()),
    [dispatch]
  );

  useEffect(() => {
    onFetchCountries();
  }, [onFetchCountries]);

  useEffect(() => {
    if (isNavbarVisible) {
      onNavbarDisplaySwitch();
    }
  }, [onNavbarDisplaySwitch, isNavbarVisible]);
  let history = useHistory()

  let formElementsArray = [];
  //creating an array with an object for each form control
  for (let key in registerForm) {
    formElementsArray.push({
      id: key,
      config: registerForm[key]
    });
  }

  const inputChangedHandler = (event, controlName) => {
    let enteredValue = event.target.value;
    let valueToBeValidated = event.target.value;

    if (controlName === 'dateOfBirth') {
      const date = registerForm.dateOfBirth.value;
      switch (event.target.name) {
        case 'DD':
          date[2] = enteredValue
          break;
        case 'MM':
          date[1] = enteredValue
          break;
        case 'YYYY':
          date[0] = enteredValue
          break;
        default: break;
      }
      valueToBeValidated = date.join('/');
      enteredValue = date;
    }
    if (controlName === 'confirmPassword') {
      valueToBeValidated = [registerForm.password.value, event.target.value];
    }

    let updatedControls = updateObject(registerForm, {
      [controlName]: updateObject(registerForm[controlName], {
        value: enteredValue,
        valid: checkValidity(
          valueToBeValidated,
          registerForm[controlName].validation
        ),
        touched: true
      })
    });

    if (controlName === "password" && registerForm.confirmPassword.touched) {
      valueToBeValidated = [
        event.target.value,
        registerForm.confirmPassword.value
      ];
      updatedControls = updateObject(updatedControls, {
        confirmPassword: updateObject(registerForm.confirmPassword, {
          value: registerForm.confirmPassword.value,
          valid: checkValidity(
            valueToBeValidated,
            registerForm.confirmPassword.validation
          ),
          touched: true
        })
      });
    }

    let valid = true;

    for (let inputIdentifier in updatedControls) {
      valid = updatedControls[inputIdentifier].valid && valid;
    }

    valid = updatedControls.country.value !== "" && valid;

    setAllControlsAreValid(valid);
    setRegisterForm(updatedControls);
  };
  const onSubmit = event => {
    event.preventDefault();

    const data = {
      firstName: registerForm.firstName.value,
      lastName: registerForm.lastName.value,
      email: registerForm.email.value,
      countryId: registerForm.country.value,
      phoneNumber: registerForm.phoneNumber.value,
      dateOfBirth: registerForm.dateOfBirth.value.join('/').replace('/', '-'),
      password: registerForm.password.value
    }

    onRegister(data);
    history.push('/register-erasmus')
  };

  let errorMessage = null;
  if (error) {
    errorMessage = (
      <p className={classes.ErrorMessage}>{giveCustomErrorMessage(error)}</p>
    );
  }

  let regForm = null;

  let redirect = null;
  if (isAuthenticated || shouldRedirect) {
    redirect = <Redirect to="/register-erasmus" />
  }

  if (loadingAuth) {
    regForm = <Spinner />;
  } else {
    let formInputs = formElementsArray.map((el, index) => {
      let extraErr = el.id === "password" ? " (min 6 chars)" : "";
      let errorMessage = "Please enter a valid " + el.id + extraErr;
      if (el.id === 'confirmPassword') {
        errorMessage = "Passwords are not the same!";
      }
      return (
        <Input
          label={el.config.elementConfig.placeholder}
          className={classes.RegisterElement}
          key={el.id}
          id={el.id}
          invalid={!el.config.valid}
          elementType={el.config.elementType}
          elementConfig={el.id === 'country' ? { 'options': countries } : el.config.elementConfig}
          changed={event => inputChangedHandler(event, el.id)}
          shouldValidate={el.config.validation}
          errorMessage={errorMessage}
          touched={el.config.touched}
          value={el.config.value}
        />
      );
    });
    regForm = (
      <form>
        <div className={classes.RegisterContainer}>{formInputs}</div>
        <div className={classes.ButtonRow}>
          <span>{/* checkbox to accept terms of use and coockies */}</span>
          <Button
            clicked={event => onSubmit(event)}
            disabled={!allControlsAreValid}
          >Sign up</Button>
        </div>
      </form>
    );
  }

  return (
    <div className={classes.Register}>
      {redirect}
      <h1>CREATE AN ACCOUNT AND MEET YOUR ERASMUS PARTNERS NOW</h1>
      {errorMessage}
      {regForm}
      <h2 onClick={() => setShouldRedirect(true)}>Go Back</h2>
    </div>
  );
};

export default Register;
