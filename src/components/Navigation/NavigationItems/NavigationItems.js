import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            {/* <NavigationItem link="/">Main Menu</NavigationItem> */}
            <NavigationItem link="/about">About</NavigationItem>
            <NavigationItem link="/login">Sign in</NavigationItem>
            <NavigationItem link="/register">Sign up</NavigationItem>
        </ul>
    );
}

export default navigationItems;