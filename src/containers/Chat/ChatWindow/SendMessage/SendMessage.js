import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../../../store/actions/index'
import { updateObject, checkValidity } from '../../../../shared/utility'
import Input from '../../../../components/UI/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import classes from './SendMessage.module.css'

const SendMessage = props => {

    let [sendMessageForm, setSendMessageForm] = useState({
        message: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: 'type a message'
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });


    const loggedInUserId = localStorage.getItem('userId')
    const dispatch = useDispatch();

    const onMessageSend = useCallback(
        (sendToId, message) => dispatch(actions.sendMessage(loggedInUserId, sendToId, message)),
        [dispatch, loggedInUserId]
      );


    const formElementsArray = [];
    for (let key in sendMessageForm) {
        formElementsArray.push({
            id: key,
            config: sendMessageForm
        })
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(sendMessageForm, {
            [controlName]: updateObject(sendMessageForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    sendMessageForm[controlName].validation
                ),
                touched: true
            })
        });
        setSendMessageForm(updatedControls)
    }

    const emptyForm = () => {
        const updatedControls = updateObject(sendMessageForm, {
            message: updateObject(sendMessageForm.message, {
                value: '',
                valid: checkValidity(
                    '',
                    sendMessageForm.message.validation
                ),
                touched: false
            })
        });
        setSendMessageForm(updatedControls)
    }

   

    const onSubmit = event => {
        event.preventDefault()
        onMessageSend(props.selectedUser, sendMessageForm.message.value);  
        emptyForm();  
    }


    let formInputs = formElementsArray.map(el => {
        console.log(el)
        return (
            <Input
                key={el.id}
                invalid={!el.config.message.valid}
                elementType={el.config.message.elementType}
                elementConfig={el.config.message.elementConfig}
                changed={event => inputChangedHandler(event, el.id)}
                shouldValidate={el.config.message.validation}
                errorMessage={"Message is empty"}
                touched={el.config.message.touched}
                value={el.config.message.value}
                styleType="SendMessage"
            />
        )
    })

    return (
        <div>
            <form className={classes.SendForm}>
                <div className={classes.Input}>
                    {formInputs}
                </div>
                <div className={classes.Button}>
                    <Button
                        clicked={event => onSubmit(event)}
                        disabled={!sendMessageForm.message.valid}
                    >
                        SEND
               </Button>
                </div>

            </form>
        </div>
    )
}

export default SendMessage;