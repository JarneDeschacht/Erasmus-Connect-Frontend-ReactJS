import React from 'react'
import ChatHead from './ChatHead/ChatHead'
import ExistingChats from './ExistingChats/ExistingChats'
import ChatWindow from './ChatWindow/ChatWindow'
import classes from './Chat.module.css'
import {useSelector} from 'react-redux'

const Chat = props => {

    const selectedUser = useSelector(state => state.chat.selectedConnection)
    return (
        <div>
            <ChatHead
                connection = {selectedUser}
             />
            <div className={classes.ChatContainer}>
                <ExistingChats />
                <ChatWindow 
                    connection = {selectedUser}
                />   
            </div>
        </div>
    )
}

export default Chat;