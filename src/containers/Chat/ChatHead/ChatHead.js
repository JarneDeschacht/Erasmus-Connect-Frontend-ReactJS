import React from 'react'
import classes from './ChatHead.module.css'
import ProfilePicture from '../../../components/UI/ProfilePicture/ProfilePicture'
const ChatHead = props => {
    const firstName = props.connection ? props.connection.firstName : null;
    const lastName = props.connection ? props.connection.lastName : null;
    const imageUrl = props.connection ? props.connection.imageUrl : null;


    return (
        <div className={classes.ChatHead}>
            <ProfilePicture
                imageUrl={imageUrl}
                styleType="ChatHead"
            />

            <p className={classes.ChatHeadTitle}>
                chat with <strong>{firstName} {lastName}</strong>
            </p>
        </div>
    )
}

export default ChatHead;