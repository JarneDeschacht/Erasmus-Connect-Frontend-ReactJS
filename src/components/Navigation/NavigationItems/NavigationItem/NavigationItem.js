import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import { withRouter } from 'react-router'



const navigationItem = props => {

    let content = null;
    if (props.link === "goBack") {
        content = (
            <li className={classes.GoBack} onClick={() => props.history.goBack()}>
                {props.children}
            </li>
        )
    }
    else {
        content = (
            <li className={classes.NavigationItem}>
                <NavLink
                    onClick={props.clicked}
                    to={props.link}
                    exact
                >{props.children}
                </NavLink>
            </li>
        )
    }

    return content;
}

export default withRouter(navigationItem);