import React from 'react'

const ChatConnection = props => {
    
    return(
        <div onClick={props.clicked}>
            <p>
               {props.name}
            </p>
        </div>
    )
}

export default ChatConnection