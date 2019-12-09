import React, { useEffect, useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import FontAwesome from 'react-fontawesome/lib/index'

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
        width
    };
}

const NavigationItems = props => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let goback = null;

    if (windowDimensions.width > 992) {
        goback = (<NavigationItem link="goBack">
            <FontAwesome
                name='fas fa-arrow-circle-left'
                size='2x'
            />
        </NavigationItem>)
    }

    return (
        <ul className={classes.NavigationItems}>
            {goback}
            <NavigationItem clicked={props.itemClicked} link="/students">Find Students</NavigationItem>
            <NavigationItem clicked={props.itemClicked} link="/chat">Chat</NavigationItem>
            <NavigationItem clicked={props.itemClicked} link="/my-profile">My Profile</NavigationItem>
            <NavigationItem clicked={props.itemClicked} link="/logout">Logout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;