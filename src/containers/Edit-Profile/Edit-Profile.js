import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from 'react-router-dom';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {
  checkValidity,
  updateObject,
} from "../../shared/utility";
import classes from './Edit-Profile.module.css';

const EditProfile = () => {

  let [allControlsAreValid, setAllControlsAreValid] = useState(true);
  let [shouldRedirect, setShouldRedirect] = useState(false);
  const dispatch = useDispatch();
  const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
  const onNavbarDisplaySwitch = useCallback(
    () => dispatch(actions.navbarSwitchDisplay()),
    [dispatch]
  );
  const profile = useSelector(state => state.student.profile);
  const countries = useSelector(state => state.country.countries);
  const onFetchCountries = useCallback(
    () => dispatch(actions.fetchCountries()),
    [dispatch]
  );
  const token = localStorage.getItem('token');
  const onEditProfile = data => dispatch(actions.editProfile(token, data));

  useEffect(() => {
    onFetchCountries();
  }, [onFetchCountries]);

  const dateArr = profile.dateOfBirth.split('-');

  const [editForm, setEditForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name",
        autoFocus: 'focus'
      },
      value: profile.firstName,
      validation: {
        required: true
      },
      valid: true,
      touched: true
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name"
      },
      value: profile.lastName,
      validation: {
        required: true
      },
      valid: true,
      touched: true
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail"
      },
      value: profile.email,
      validation: {
        required: true,
        isEmail: true
      },
      valid: true,
      touched: true
    },
    country: {
      elementType: "select",
      value: profile.country.id,
      elementConfig: {
        placeholder: "Country"
      },
      validation: {},
      valid: true,
      touched: true
    },
    phoneNumber: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone Number"
      },
      value: profile.phoneNumber,
      validation: {
        required: true
      },
      valid: true,
      touched: true
    },
    dateOfBirth: {
      elementType: "date",
      elementConfig: {
        type: "text",
        placeholder: "Date Of Birth"
      },
      value: [dateArr[0], dateArr[1], dateArr[2].substring(0, 2)],
      validation: {
        required: true,
        date: true
      },
      valid: true,
      touched: true
    },
    bio: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Bio"
      },
      value: profile.bio,
      validation: {
        required: true,
      },
      valid: true,
      touched: true
    },
  });

  useEffect(() => {
    if (!isNavbarVisible) {
      onNavbarDisplaySwitch();
    }
  }, [onNavbarDisplaySwitch, isNavbarVisible]);

  const inputChangedHandler = (event, controlName) => {
    let enteredValue = event.target.value;
    let valueToBeValidated = event.target.value;

    if (controlName === 'dateOfBirth') {
      const date = editForm.dateOfBirth.value;
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

    let updatedControls = updateObject(editForm, {
      [controlName]: updateObject(editForm[controlName], {
        value: enteredValue,
        valid: checkValidity(
          valueToBeValidated,
          editForm[controlName].validation
        ),
        touched: true
      })
    });

    let valid = true;

    for (let inputIdentifier in updatedControls) {
      valid = updatedControls[inputIdentifier].valid && valid;
    }

    valid = updatedControls.country.value !== "" && valid;

    setAllControlsAreValid(valid);
    setEditForm(updatedControls);
  };

  const onSubmit = event => {
    event.preventDefault();

    const data = {
      firstName: editForm.firstName.value,
      lastName: editForm.lastName.value,
      email: editForm.email.value,
      countryId: editForm.country.value,
      phoneNumber: editForm.phoneNumber.value,
      dateOfBirth: editForm.dateOfBirth.value.join('/').replace('/', '-'),
      bio: editForm.bio.value
    }

    onEditProfile(data);
    setShouldRedirect(true) //has to be improved
  };

  let formElementsArray = [];
  for (let key in editForm) {
    formElementsArray.push({
      id: key,
      config: editForm[key]
    });
  }

  let edForm = null;
  let redirect = null;

  if (shouldRedirect) {
    redirect = <Redirect to='/my-profile' />
  }

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
        changed={event => { inputChangedHandler(event, el.id) }}
        shouldValidate={el.config.validation}
        errorMessage={errorMessage}
        touched={el.config.touched}
        value={el.config.value}
      />
    );
  });
  edForm = (
    <form>
      <div className={classes.EditProfileContainer}>{formInputs}</div>
      <div className={classes.ButtonRow}>
        <span></span>
        <Button
          clicked={event => { onSubmit(event) }}
          disabled={!allControlsAreValid}
        >Update Profile</Button>
      </div>
    </form>
  );

  return (
    <div className={classes.EditProfile}>
      {redirect}
      <h1>Edit your profile here</h1>
      {/* {errorMessage} */}
      {edForm}
    </div>
  );
}

export default EditProfile;