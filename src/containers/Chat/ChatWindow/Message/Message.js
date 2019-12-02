import React from 'react'

const Message = props => {
    return(
        <div>
            <p>
               {props.content}
            </p>
        </div>
    )
}

export default Message