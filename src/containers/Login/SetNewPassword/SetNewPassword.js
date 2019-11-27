import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { checkValidity, updateObject } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import * as actions from '../../../store/actions'
import classes from './SetNewPassword.module.css'
const SetNewPassword = props => {

    const [newPasswordForm, setNewPasswordForm] = useState({
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'New Password',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm New Password',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })

    const dispatch = useDispatch()
    const onSetNewPassword =(studentId, password) => dispatch(actions.setNewPassword(studentId, password))

    const formElementsArray = []
    for (let key in newPasswordForm) {
        formElementsArray.push({
            id: key,
            config: newPasswordForm[key]
        })
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(newPasswordForm, {
            [controlName]: updateObject(newPasswordForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, newPasswordForm[controlName].validation)
            })
        })

        setNewPasswordForm(updatedControls)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        onSetNewPassword(props.match.params.id, newPasswordForm.password.value)
        console.log('enter logic to change password here')
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
                errorMessage={"passwords not valid"}
                touched={el.config.touched}
                value={el.config.value}
            />
        )
    })

    return (
        <div>
            <h1>Change your password</h1>

            <form className = {classes.SetNewPasswordForm}>
                {formInputs}
                <Button
                    clicked={(event) => onSubmit(event)}
                >
                    change passwords
                </Button>
            </form>
        </div>
    )
}


export default SetNewPassword