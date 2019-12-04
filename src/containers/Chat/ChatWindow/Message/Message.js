import React from 'react'
import classes from './Message.module.css'

const Message = props => {

    const userId = localStorage.getItem('userId')
    let messageStyle = [classes.Container]

    const date = new Date(props.date);
    console.log(date)

    const formattedDate = `${date.getHours()}:${date.getMinutes()}`


    if(props.sender.toString() === userId.toString()){
        messageStyle.push(classes.Right)
    }

    return(
        <div className={messageStyle.join(' ')}>
            <div className={classes.Content}>
                {props.content}
            </div>
            <div className={classes.Date}>
                {formattedDate}
            </div>
        </div>
    )
}

export default Message