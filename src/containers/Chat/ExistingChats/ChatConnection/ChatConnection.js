import React from 'react'
import ProfilePicture from '../../../../components/UI/ProfilePicture/ProfilePicture'
import classes from './ChatConnection.module.css'

const ChatConnection = props => {
    // const lastMessage = useSelector(state => state.chat.lastMessages[props.connectionId])

    let lastMessage = props.lastMessage;
    return (
        <div onClick={props.clicked} className={classes.Container}>
            <div className={classes.PictureContainer}>
                <ProfilePicture
                    imageUrl={props.imageUrl}
                    styleType="ExistingChat"
                />
            </div>
            <div className={classes.ContentContainer}>
                <div className={classes.UserName}>
                    {props.name}
                </div>
                <div className={classes.LastMessage}>
                    {/* {lastMessage !== undefined ? lastMessage.content : null} */}
                    {lastMessage}
                </div>
            </div>
        </div>
    )
}

export default ChatConnection