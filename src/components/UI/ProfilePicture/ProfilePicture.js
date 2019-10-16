import React from 'react';
import ProfileImg from '../../../assets/images/empty-profile.png';
import classes from './ProfilePicture.module.css';

const profilePicture = () => {
    return <img className={classes.ProfilePicture} src={ProfileImg} alt={localStorage.getItem('userId')} />
}

export default profilePicture;