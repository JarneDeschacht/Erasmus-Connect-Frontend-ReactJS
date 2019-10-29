import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Register.module.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity, updateObject, checkPasswords } from '../../shared/utility';
import { giveCustomErrorMessage } from '../../shared/utility';

const Register = props => {

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    const onRegister = (credentials) => dispatch(actions.register(credentials))

    const [disableConfirmButton, setDisableConfirmButton] = useState(true)
    const error = useSelector(state => state.auth.error);

    const [registerForm, setRegisterForm] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'first name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'lastName'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        currentCountry: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'current country',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'password',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        currentCity: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'current City',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'confirm password',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        dateOfBirth: {
            elementType: 'date',
            elementConfig: {
                placeholder: 'date of birth'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }

    })

    let [allControlsAreValid, setAllControlsAreValid] = useState(false);

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    useEffect(() => {
        let passwordConfirmed = checkPasswords(registerForm.password.value, registerForm.confirmPassword.value);
        if (allControlsAreValid && passwordConfirmed) {
            setDisableConfirmButton(false)
        }
        else {
            // errorPasswords = 'passwords not equal';
            setDisableConfirmButton(true);
        }
    }, [allControlsAreValid,registerForm]);

    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to="/" />
    }

    let formElementsArray = []
    //creating an array with an object for each form control
    for (let key in registerForm) {
        formElementsArray.push({
            id: key,
            config: registerForm[key]
        })
    }


    let errorPasswords = ''
    const inputChangedHandler = (event, controlName) => {
        console.log('in change handler')
        const updatedControls = updateObject(registerForm, {
            [controlName]: updateObject(registerForm[controlName], {
                value: controlName === 'dateOfBirth' ? event : event.target.value,

                valid: checkValidity(controlName === 'dateOfBirth' ? event : event.target.value, registerForm[controlName].validation),
                touched: true
            })
        })

        let valid = true;

        for (let inputIdentifier in updatedControls) {
            valid = updatedControls[inputIdentifier].valid && valid;
        }

        setAllControlsAreValid(valid);
        setRegisterForm(updatedControls)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const newUserCredentials = {
            firstName: registerForm.firstName.value,
            lastName: registerForm.lastName.value,
            email: registerForm.email.value,
            currentCountry: registerForm.currentCountry.value,
            password: registerForm.password.value,
            currentCity: registerForm.currentCity.value,
            passwordConfirmation: registerForm.confirmPassword.value,
            dateOfBirth: registerForm.dateOfBirth.value,
        }

        onRegister(newUserCredentials)
    }
    //mapping the array with the elements to actual formcontrols
    let formInputs = formElementsArray.map(el => {
        return (
            <Input
                className={classes.RegisterElement}
                key={el.id}
                invalid={!el.config.valid}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                changed={(event) => inputChangedHandler(event, el.id)}
                shouldValidate={el.config.validation}
                errorMessage={"Please enter a valid " + el.id}
                touched={el.config.touched}
                value={el.config.value}
            />
        )
    })

    let errorMessage = null;
    if (error) {
        errorMessage = <p className={classes.ErrorMessage}>{giveCustomErrorMessage(error)}</p>;
    }
    let regForm = (
        <form>
            <div className={classes.RegisterContainer}>
                {formInputs}
            </div>

            <div>
                {/* <p className={classes.ForgotPassword}>forgot password?</p> */}
                <Button
                    clicked={(event) => onSubmit(event)}
                    disabled={disableConfirmButton}
                >
                    Sign in
                </Button>
            </div>
        </form>
    )

    return (
        <div className={classes.Register}>

            {redirect}
            <h1>CREATE AN ACCOUNT AND MEET YOUR ERASMUS PARTNERS NOW</h1>
            {errorMessage}
            {regForm}
            {errorPasswords}
            <h2 onClick={() => setShouldRedirect(true)}>Go Back</h2>
        </div>
    );
}

export default Register;