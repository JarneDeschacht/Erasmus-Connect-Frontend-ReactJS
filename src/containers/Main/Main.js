import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Main.module.css';
import * as actions from '../../store/actions';
import logo from '../../assets/images/logo.png'

const Main = () => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const isNotification = useSelector(state => state.student.isNotification);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);
    const onGetNotificationStatus = useCallback((userId) => dispatch(actions.getNotificationStatus(userId)), [dispatch]);

    useEffect(() => {
        if ((isNavbarVisible)) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            onGetNotificationStatus(userId);
        }
    }, [onGetNotificationStatus, isAuthenticated, userId]);


    let content = (
        <ul className={classes.NavigationItems}>
            <li className={classes.NavigationItem}><NavLink to="/about" exact >About</NavLink></li>
            <li className={classes.NavigationItem}><NavLink to="/login" exact >Sign in</NavLink></li>
            <li className={classes.NavigationItem}><NavLink to="/register" exact >Sign up</NavLink></li>
            </ul>
    );

    let notificationBubble = null;
    if (isNotification) {
        notificationBubble = (<div className={classes.NotificationBubble}></div>)
    }

    if (isAuthenticated) {
        content = (
            <ul className={classes.NavigationItems}>
                <li className={[classes.NavigationItem]}>
                    <div className={classes.MyProfileLink}>
                    {notificationBubble}
                    <NavLink to="/my-profile" exact>My profile</NavLink>
                </div></li>
                <li className={classes.NavigationItem}><NavLink to="/students" exact>Find student</NavLink></li>
                <li className={classes.NavigationItem}><NavLink to="/chat" exact>Chat</NavLink></li>
                <li className={classes.NavigationItem}><NavLink to="/logout" exact>Logout</NavLink></li>
            </ul>
        )
    }

    return (
        <div className={classes.Main}>
            <div className={classes.FrontPage}>
                <div className={classes.Brand}>
                    <img className={classes.Logo} src={logo} alt="logo erasmus connect" />
                    <h1 className={classes.SubText}>Know your erasmus partners before departing</h1>
                </div>
                <header className={classes.BottomToolBar}>
                    <nav>
                        {content}
                    </nav>
                </header>
            </div>
        </div>
    );
}

export default Main;