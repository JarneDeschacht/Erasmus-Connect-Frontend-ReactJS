import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './Main.module.css';
import * as actions from '../../store/actions';

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
        <div className={classes.FrontPage}>
            <div className={classes.Brand}>
                <h1><span>ESN</span>PARTNER</h1>
                <h1 className={classes.SubText}>Know your erasmus partners before departing</h1>
            </div>
            <header className={classes.BottomToolBar}>
                <nav>
                    <ul className={classes.NavigationItems}>
                        <li className={classes.NavigationItem}><NavLink to="/about" exact >About</NavLink></li>
                        <li className={classes.NavigationItem}><NavLink to="/login" exact >Sign in</NavLink></li>
                        <li className={classes.NavigationItem}><NavLink to="/register" exact >Sign up</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );

    let notificationBubble = null;
    if (isNotification) {
        notificationBubble = (<div className={classes.NotificationBubble}></div>)
    }

    if (isAuthenticated) {
        content = (
            <div className={classes.Links}>
                <div className={[classes.Brand,classes.BrandLoggedIn].join(' ')}>
                    <h1><span>ESN</span>PARTNER</h1>
                    <h1 className={classes.SubText}>Know your erasmus partners before departing</h1>
                </div>
                <div className={classes.LinkItems}>
                    <div>
                        <div style={{ position: 'relative', margin: "0 !important" }}>
                            {notificationBubble}
                            <NavLink to="/my-profile" exact>My profile</NavLink>
                        </div>
                    </div>
                    <NavLink to="/students" exact>Find student</NavLink>
                    <NavLink to="/chat" exact>Chat</NavLink>
                    <NavLink to="/logout" exact>Logout</NavLink>
                </div>

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