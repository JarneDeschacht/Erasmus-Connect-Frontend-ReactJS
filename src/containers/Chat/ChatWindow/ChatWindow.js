import React, { useEffect, useCallback } from 'react'
import classes from './ChatWindow.module.css'
import { useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../store/actions/index'
import Message from './Message/Message'

const ChatWindow = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId')
    const messages = useSelector(state => state.chat.messages)
    const onFetchMessages = useCallback((userId) => dispatch(actions.getMessages(userId)), [dispatch])

    useEffect(() => {
        onFetchMessages(userId)
    }, [onFetchMessages, userId])


    console.log(messages)
    
    let messageComponents = null;
    if(messages){
        messageComponents = messages.map(mes => {
            console.log(mes)
           return(
            <Message 
                date = {mes.sendDate}
                content = {mes.content}
            />
           )
        })
    }
    
    return (
        <div className={classes.ChatWindow}>
            chatwindow
            {messageComponents}
        </div>
    )
}

export default ChatWindow;