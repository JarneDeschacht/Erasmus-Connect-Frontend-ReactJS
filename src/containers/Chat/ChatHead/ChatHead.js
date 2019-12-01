import React from 'react'
import classes from './ChatHead.module.css'

const ChatHead = props => {
    return (
        <div className={classes.ChatHead}>
            <p>
                {
                    props.connection === null ? null : props.connection.firstName
                }
                
                {
                    props.connection === null ? null : props.connection.lastName
                }
            </p>
        </div>
    )
}

export default ChatHead;