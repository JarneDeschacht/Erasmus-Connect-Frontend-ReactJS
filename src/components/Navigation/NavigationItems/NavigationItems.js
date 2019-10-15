import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import { useSelector } from 'react-redux';

const NavigationItems = props => {

    const isAuthenticated = useSelector(state => state.auth.idToken !== null);

    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/about">About</NavigationItem>
            <NavigationItem link="/login">Sign in</NavigationItem>
            <NavigationItem link="/register">Sign up</NavigationItem>
        </ul>
    );

    if (isAuthenticated) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/help">Help</NavigationItem>
                <NavigationItem link="/faq">FAQ</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </ul>
        )
    }
    return navItems;
}

export default NavigationItems;