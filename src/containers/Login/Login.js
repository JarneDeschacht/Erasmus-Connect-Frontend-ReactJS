import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Login.module.css';
import { checkValidity, updateObject } from '../../shared/utility';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect, NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import FontAwesome from 'react-fontawesome/lib/index'


const Login = props => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });

    // use state returns an array with 2 elements
    // the first one is the current state 
    // the second one is to update this state
    const [shouldRedirect, setShouldRedirect] = useState(false);


    //whatever action that we dispatch, gets cought in the reducer (switch-case)
    const dispatch = useDispatch();

    //useSelector = getting data out of the redux store
    let isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const loading = useSelector(state => state.auth.loading);

    //actions.auth is a method that manages the state
    const onAuth = (email, password) => dispatch(actions.login(email, password));

    //useCallback only when it's dependency changes this will be executed 
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);


    //= componentDidMount
    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    const formElementsArray = [];
    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key]
        });
    }
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, loginForm[controlName].validation),
                touched: true
            })
        });
        setLoginForm(updatedControls);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        onAuth(loginForm.email.value, loginForm.password.value);
    }


    let formInputs = formElementsArray.map(el => {
        const extraErr = el.id === 'password' ? ' (min 6 chars)' : '';
        return (
            <Input
                label={el.config.elementConfig.placeholder}
                key={el.id}
                invalid={!el.config.valid}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                changed={(event) => inputChangedHandler(event, el.id)}
                shouldValidate={el.config.validation}
                errorMessage={"Please enter a valid " + el.id + extraErr}
                touched={el.config.touched}
                value={el.config.value}
            />
        )
    });

    let form = (
        <form >
            {formInputs}
            <div className={classes.FormControls}>
                <NavLink to="/forgotPassword"
                    className={classes.ForgotPassword}
                    exact>forgot password</NavLink>
                <Button
                    clicked={(event) => onSubmit(event)}
                // disabled={false}
                >Sign in
                </Button>
            </div>
        </form>
    )

    if (loading) {
        form = <Spinner />
    }

    let redirect = null;
    if (isAuthenticated || shouldRedirect) {
        redirect = <Redirect to="/" />
    }

    return (
        <div className={classes.Login}>
            <div>
                <h1>WELCOME BACK, YOUR ERASMUS PARTNERS HAVE BEEN WAITING FOR YOU</h1>
                {redirect}
                {form}
                <NavLink to="/register" className={classes.CreateNew} exact>Create a new account</NavLink>
                <h2 onClick={() => setShouldRedirect(true)}>
                    <FontAwesome
                        name='fas fa-arrow-circle-left'
                        size='2x'
                    />
                </h2>
            </div>
        </div>
    );
}

export default Login;