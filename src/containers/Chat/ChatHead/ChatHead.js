import React from 'react'
import classes from './ChatHead.module.css'
import ProfilePicture from '../../../components/UI/ProfilePicture/ProfilePicture'
import { useHistory } from "react-router-dom";

const ChatHead = props => {
    const firstName = props.connection ? props.connection.firstName : null;
    const lastName = props.connection ? props.connection.lastName : null;
    const imageUrl = props.connection ? props.connection.imageUrl : null;
    const userId = props.connection ? props.connection.userId : null;
    let history = useHistory();
    return (
        <div className={classes.ChatHead}>
            <div 
                className={classes.ProfilePictureContainer}
                onClick={() => history.push(`/students/${userId}`)}
            >
                <ProfilePicture
                    imageUrl={imageUrl}
                    styleType="ChatHead"
                />
                <p className={classes.RouteToProfile}>
                    View Profile
                </p>
            </div>
            <p className={classes.ChatHeadTitle}>
                <span className={classes.ChatWith}>chat with</span> <strong>{firstName} {lastName}</strong>
            </p>
        </div>
    )
}

export default ChatHead;