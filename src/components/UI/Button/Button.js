import React from 'react';
import classes from './Button.module.css';

const button = props => {
    let styles = [classes.Button];
    if(props.noPointer)
    {
        styles.push(classes.NoPointer)
    }
    return (
        <button
            className={styles.join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >{props.children}</button>
    );
}

export default button;