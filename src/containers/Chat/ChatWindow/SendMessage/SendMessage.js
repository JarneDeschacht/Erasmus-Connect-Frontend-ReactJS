import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import * as actions from '../../../../store/actions/index'
import { updateObject, checkValidity } from '../../../../shared/utility'
import Input from '../../../../components/UI/Input/Input'
import Button from '../../../../components/UI/Button/Button'

const SendMessage = props => {

    const [sendMessageForm, setSendMessageForm] = useState({
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
    })

    const loggedInUserId = localStorage.getItem('userId')
    const dispatch = useDispatch();
    const onMessageSend = (sendToId, message) =>  dispatch(actions.sendMessage(loggedInUserId, sendToId, message))


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

    const onSubmit = event => {
        event.preventDefault()
        // console.log(props.selectedUser)
        onMessageSend(props.selectedUser,sendMessageForm.message.value);
        sendMessageForm.message.value = '';
    }


    let formInputs = formElementsArray.map(el => {
        return (
            <Input
                key={el.id}
                invalid={!el.config.valid}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                changed={event => inputChangedHandler(event, el.id)}
                shouldValidate={el.config.validation}
                errorMessage={"Message is empty"}
                touched={el.config.touched}
                value={el.config.value}
            />
        )
    })

    return (
        <div>
           <form>
               {formInputs}
               <Button
                    clicked = {event => onSubmit(event)}
                    disabled={!sendMessageForm.message.valid}
                >
                    =>
               </Button>
           </form>
       </div>
    )
}

export default SendMessage;