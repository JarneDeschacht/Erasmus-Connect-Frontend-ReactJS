import React from 'react'
import ChatHead from './ChatHead/ChatHead'
import ExistingChats from './ExistingChats/ExistingChats'
import ChatWindow from './ChatWindow/ChatWindow'
import classes from './Chat.module.css'

const Chat = props => {

    return (
        <div>
            <ChatHead />
            <div className={classes.ChatContainer}>
                <ExistingChats />
                <ChatWindow />
            </div>
        </div>
    )
}

export default Chat;