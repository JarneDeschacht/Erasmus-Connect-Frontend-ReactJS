import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Register.module.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const Register = props => {

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to="/" />
    }


    return (
        <div className={classes.Register}>
            {redirect}
            <h1>CREATE AN ACCOUNT AND MEET YOUR ERASMUS PARTNERS NOW</h1>
            <h2 onClick={() => setShouldRedirect(true)}>Go Back</h2>
        </div>
    );
}

export default Register;