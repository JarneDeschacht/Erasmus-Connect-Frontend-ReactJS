import React from 'react'
import classes from './ChatHead.module.css'
import ProfilePicture from '../../../components/UI/ProfilePicture/ProfilePicture'
const ChatHead = props => {
    console.log(props)
    const userId = props.connection ? props.connection.userId : null;
    const firstName = props.connection ? props.connection.firstName : null;
    const lastName = props.connection ? props.connection.lastName : null;
    const imageUrl = props.connection ? props.connection.imageUrl : null;


    return (
        <div className={classes.ChatHead}>
            <p>
                <div className={classes.ImageContainer}>
                    <ProfilePicture
                        imageUrl={imageUrl}
                    />
                </div>

                chat with <strong>{firstName} {lastName}</strong>
            </p>
        </div>
    )
}

export default ChatHead;