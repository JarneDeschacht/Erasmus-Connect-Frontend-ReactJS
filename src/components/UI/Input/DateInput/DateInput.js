import React from 'react';
import classes from './DateInput.module.css';

const dateInput = props => {
    return (
        <div className={classes.DateInput}>
            <input id={props.id} name="DD" onChange={props.changed} placeholder="Day" className={classes.Input} />
            <input placeholder="Month" onChange={props.changed} name="MM" className={classes.Input} />
            <input placeholder="Year" onChange={props.changed} name="YYYY" className={classes.Input} />
        </div>
    );
}

export default dateInput;