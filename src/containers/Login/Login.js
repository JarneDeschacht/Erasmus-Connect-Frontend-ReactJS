import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Login.module.css';
import { checkValidity, updateObject } from '../../shared/utility';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
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
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        }
    });

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
    }

    let formInputs = formElementsArray.map(el => (
        <Input
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
    ));
    return (
        <div className={classes.Login}>
            <h1>WELCOME BACK, YOUR ERASMUS PARTNERS HAVE BEEN WAITING FOR YOU</h1>
            <form>
                {formInputs}
                <div>
                    <p className={classes.ForgotPassword}>forgot password?</p>
                    <Button clicked={(event) => onSubmit(event)}>Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;