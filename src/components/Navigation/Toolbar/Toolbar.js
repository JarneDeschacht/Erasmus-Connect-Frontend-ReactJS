import React, { useState,useEffect } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';
import {withRouter} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

function getWindowDimensions() {
    const { innerWidth: width} = window;
    return {
        width
    };
}

const Toolbar = props => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);
    const openClickHandler = () => {
        setMenuOpen(!menuOpen);
    }

    const back = <FontAwesome onClick={() => {
        props.history.goBack();
        setMenuOpen(false);
    }} className={classes.BackMobile} name="fas fa-arrow-circle-left" size="2x" />
    const overlay = <div className={[classes.Overlay,menuOpen ? classes.MenuOpen : null].join(' ')}></div>
    const nav = (
        <nav className={[classes.Nav,menuOpen ? classes.MenuOpen : null].join(' ')}>
            <NavigationItems itemClicked={openClickHandler} />
        </nav>)

    

    const open = (
        <div className={classes.MenuToggle} onClick={openClickHandler}>
            <FontAwesome name={menuOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>)
    const container = (
        <div className={classes.Container} style={{display: menuOpen || windowDimensions.width > 992 ? 'flex' : 'none' }}>
                {nav}
            </div>
    );


    return (
        <header className={classes.Toolbar}>
            {back}
            {open}
            {overlay}
            {container}
        </header>
    );
}

export default withRouter(Toolbar);