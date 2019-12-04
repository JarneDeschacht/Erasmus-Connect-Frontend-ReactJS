import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="goBack">&larr; Go Back</NavigationItem>
            <NavigationItem link="/students">Find Students</NavigationItem>
            <NavigationItem link="/chat">Chat</NavigationItem>
            <NavigationItem link="/my-profile">My Profile</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;