import React,{useEffect,useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Main.module.css';
import * as actions from '../../store/actions/navbar';

const Main = () => {

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    useEffect(() => {
        if (!isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    return (
        <div className={classes.Main}>
            <div className={classes.FrontPage}>
                <h1><span>ESN</span>PARTNER</h1>
                <h1>Know your erasmus partners before departing</h1>
            </div>
        </div>
    );
}

export default Main;