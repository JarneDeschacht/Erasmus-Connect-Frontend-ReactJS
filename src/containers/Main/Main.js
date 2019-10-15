import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Main.module.css';
import * as actions from '../../store/actions/navbar';

const Main = () => {

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    useEffect(() => {
        if (!isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);


    let content = (
        <div className={classes.FrontPage}>
            <h1><span>ESN</span>PARTNER</h1>
            <h1>Know your erasmus partners before departing</h1>
        </div>
    );

    if (isAuthenticated) {
        content = (
            <div className={classes.Links}>
                <NavLink to="/universities" exact>Find universities</NavLink>
                <NavLink to="/profile" exact>My profile</NavLink>
                <NavLink to="/students" exact>Find student</NavLink>
                <NavLink to="/chat" exact>Chat</NavLink>
            </div>
        )
    }

    return (
        <div className={classes.Main}>
            {content}
        </div>
    );
}

export default Main;