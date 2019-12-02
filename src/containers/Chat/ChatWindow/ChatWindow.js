import React, { useEffect, useCallback } from 'react'
import classes from './ChatWindow.module.css'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const ChatWindow = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId')
    const messages = useSelector(state => state.chat.messages)
    const onFetchMessages = useCallback((userId, chatWithId) => dispatch(actions.getMessages(userId, chatWithId)), [dispatch])

    useEffect(() => {
        if (props.connection) {
            onFetchMessages(userId, props.connection.userId)
        }


    }, [onFetchMessages, userId, props])

    let messageComponents = null;
    if (messages) {
        messageComponents = messages.map(mes => {
            return (

                <Message
                    date={mes.sendDate}
                    content={mes.content}
                    key={mes.messageId}
                />


            )
        })
    }

    return (
        <div className={classes.ChatWindow}>

            {messageComponents}
            <SendMessage
                selectedUser={props.connection?props.connection.userId: null}
            />
        </div>
    )
}

export default ChatWindow;