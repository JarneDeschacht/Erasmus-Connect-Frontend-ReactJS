import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePicture from '../../../../components/UI/ProfilePicture/ProfilePicture'
import classes from './ChatConnection.module.css'

const ChatConnection = props => {
    const lastMessage = useSelector(state => state.chat.lastMessages[props.connectionId])

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
                    {lastMessage !== undefined ? lastMessage.content : null}
                </div>
            </div>
        </div>
    )
}

export default ChatConnection