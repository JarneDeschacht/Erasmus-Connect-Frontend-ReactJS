// import React, { useState } from './node_modules/react';

import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import { updateObject, checkValidity } from '../../../shared/utility'
import * as actions from '../../../store/actions'
import classes from './ForgotPassword.module.css'
const Forgotpassword = (props) => {


    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        }
    })
    const dispatch = useDispatch()
    const onSend = (email) => dispatch(actions.sendForgotPasswordMail(email))

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(forgotPasswordForm.email.value)
        onSend(forgotPasswordForm.email.value)
    }


    const formElementsArray = []
    for (let key in forgotPasswordForm) {
        formElementsArray.push({
            id: key,
            config: forgotPasswordForm[key]
        })
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(forgotPasswordForm, {
            [controlName]: updateObject(forgotPasswordForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, forgotPasswordForm[controlName].validation)
            })
        })
        setForgotPasswordForm(updatedControls)
    }


    let formInputs = formElementsArray.map(el => {
        return (
            <Input
                key={el.id}
                invalid={!el.config.valid}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                changed={(event) => inputChangedHandler(event, el.id)}
                shouldValidate={el.config.validation}
                errorMessage={"email is not valid"}
                touched={el.config.touched}
                value={el.config.value}
            />
        )
    })


    let form = (
        <form>
            {formInputs}
            <Button
                clicked={event => onSubmit(event)}
            >
                Send email
            </Button>
        </form>
    )

    return (
        <div className={classes.ForgotPasswordContainer}>
            <h1>enter your email address</h1>

            <p className={classes.Info}>
                Fill in the email address which is connected to you account. <br />
                We will send you an email with further instructions.
            </p>

            {form}
        </div>
    )
}

export default Forgotpassword