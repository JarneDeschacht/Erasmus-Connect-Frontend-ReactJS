import React from 'react';
import classes from './Button.module.css';

const button = props => {
    let styles = [classes.Button];
    if (props.noPointer) {
        styles.push(classes.NoPointer)
    }
    if (props.smallButton) {
        styles.push(classes.SmallButton);
    }
    if (props.maxWidth) {
        styles.push(classes.MaxWidth);
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