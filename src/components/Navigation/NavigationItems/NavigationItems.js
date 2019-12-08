import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import FontAwesome from 'react-fontawesome/lib/index'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="goBack">
                <FontAwesome
                    name='fas fa-arrow-circle-left'
                    size='2x'
                />
            </NavigationItem>
            <NavigationItem link="/students">Find Students</NavigationItem>
            <NavigationItem link="/chat">Chat</NavigationItem>
            <NavigationItem link="/my-profile">My Profile</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;