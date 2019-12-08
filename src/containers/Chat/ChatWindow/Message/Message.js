import React from 'react'
import classes from './Message.module.css'
import Aux from '../../../../hoc/Auxiliary/Auxiliary'



const Message = props => {

    const userId = localStorage.getItem('userId')
    let messageStyle = [classes.Container]

    const date = new Date(props.date);

    const formattedDate = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`

    if (props.sender.toString() === userId.toString()) {
        messageStyle.push(classes.Right)
    }
    else{
        messageStyle.push(classes.Left)
    }

    let message = (
        <div
                className={messageStyle.join(' ')}>
                <div className={classes.Content}>
                    {props.content}
                </div>
                <div className={classes.Date}>
                    {formattedDate}
                </div>
            </div>
    );
    if (props.id) {
        message = (
            <div
                id='last'
                className={messageStyle.join(' ')}>
                <div className={classes.Content}>
                    {props.content}
                </div>
                <div className={classes.Date}>
                    {formattedDate}
                </div>
            </div>
        )
    }
   
    return (
      
       <Aux>
           {message}
       </Aux>
    )
}

export default Message