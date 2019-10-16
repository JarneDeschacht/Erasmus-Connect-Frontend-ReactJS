import React from 'react';
import ProfileImg from '../../../assets/images/dummyProfile.jpg';
import classes from './ProfilePicture.module.css';

const profilePicture = () => {
    let imgClass = classes.ProfilePicture;
    if (window.location.pathname !== '/profile') {
        imgClass = classes.ProfilePictureSearch;
    }

    return <img className={imgClass} src={ProfileImg} alt={localStorage.getItem('userId')} />
}

export default profilePicture;