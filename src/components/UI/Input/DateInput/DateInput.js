import React from 'react';
import classes from './DateInput.module.css';

const dateInput = props => {
    
    return (
        <div className={classes.DateInput}>
            <input id={props.id} name="DD" value={props.date[2]} onChange={props.changed} placeholder="Day" className={classes.Input} maxLength="2" />
            <input placeholder="Month" onChange={props.changed} value={props.date[1]} name="MM" className={classes.Input} maxLength="2" />
            <input placeholder="Year" onChange={props.changed} value={props.date[0]} name="YYYY" className={classes.Input} maxLength="4" />
        </div>
    );
}

export default dateInput;