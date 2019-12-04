import React, { useEffect, useCallback, useState } from 'react'
import classes from './ChatWindow.module.css'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import openSocket from 'socket.io-client'

const ChatWindow = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId')
    const messages = useSelector(state => state.chat.messages)
    const onFetchMessages = useCallback((userId, chatWithId) => dispatch(actions.getMessages(userId, chatWithId)), [dispatch])
    const onNewMessage = (message) => dispatch(actions.newMessage(message))

    useEffect(() => {
        if (props.connection) {
            onFetchMessages(userId, props.connection.userId)
        }
    }, [onFetchMessages, userId, props, messages])

    useEffect(() => {
        const socket = openSocket('http://localhost:8080/')
        socket.on('messages', data => {
            console.log('data receiver')
            onNewMessage(data.message)
        })
    }, [])




    let messageComponents = null;
    if (messages) {
        messageComponents = messages.map(mes => {
            return (
                <Message
                    date={mes.sendDate}
                    content={mes.content}
                    key={mes.messageId}
                    sender={mes.sender}
                    receiver={mes.receiver}
                />
            )
        })
    }




    return (
        <div className={classes.ChatWindow}>
            <div className={classes.Conversation}>
                {messageComponents}
            </div>
            <SendMessage
                selectedUser={props.connection ? props.connection.userId : null}
            />
        </div>
    )
}

export default ChatWindow;