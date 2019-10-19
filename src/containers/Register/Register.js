import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Register.module.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity, updateObject, checkPasswords } from '../../shared/utility';

const Register = props => {

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    const onRegister = (credentials) => dispatch(actions.register(credentials))

    const [disableConfirmButton, setDisableConfirmButton] = useState(true)

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
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'date of birth',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }

    })

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

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

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(registerForm, {
            [controlName]: updateObject(registerForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, registerForm[controlName].validation),
                touched: true
            })
        })

        let allControlsAreValid = true;
        formElementsArray.forEach((el) => {
            if (el.config.valid === false) {
                allControlsAreValid = false
            }
        })

        let passwordConfirmed = checkPasswords(registerForm.password.value, registerForm.confirmPassword.value);

            if (allControlsAreValid && passwordConfirmed) {
                setDisableConfirmButton(false)
            }
        setRegisterForm(updatedControls)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        console.log('REGISTER JS - onSubmit')

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





    // console.log(allControlsAreValid)

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
            {regForm}
            <h2 onClick={() => setShouldRedirect(true)}>Go Back</h2>
        </div>
    );
}

export default Register;