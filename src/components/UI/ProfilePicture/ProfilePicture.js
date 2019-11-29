import React from 'react';
import classes from './ProfilePicture.module.css';
import ProfilePicture from '../../../assets/images/default.png';

const profilePicture = props => {
    let imgClass = classes.ProfilePicture;
    if (window.location.pathname === '/students') {
        imgClass = classes.ProfilePictureSearch;
    }
    let url = ProfilePicture;
    if (props.imageUrl) {
        url = 'http://localhost:8080/' + props.imageUrl;
    }

    return <img className={imgClass} src={url} alt={localStorage.getItem('userId')} />
}

export default profilePicture;