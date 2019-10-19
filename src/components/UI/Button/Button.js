import React from 'react';
import classes from './Button.module.css';

const button = props => {

    let isDisabled = false
    
    props.disabled? isDisabled=true: isDisabled=false


    return (
        <button
            className={classes.Button}
            onClick={props.clicked}
            disabled={isDisabled}
        >{props.children}</button>
    );
}

export default button;