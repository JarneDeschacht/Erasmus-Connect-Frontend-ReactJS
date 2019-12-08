import React from 'react';
import classes from './DateInput.module.css';

const DateInput = props => {


    let placeholders = ['Day', 'Month', 'Year']

    return (
        <div className={classes.DateInput}>
            <input id={props.id} name="DD" value={props.date[2]} onChange={props.changed} placeholder={placeholders[0]} className={classes.Input} maxLength="2" />
            <input placeholder={placeholders[1]} onChange={props.changed} value={props.date[1]} name="MM" className={classes.Input} maxLength="2" />
            <input placeholder={placeholders[2]} onChange={props.changed} value={props.date[0]} name="YYYY" className={classes.Input} maxLength="4" />
        </div>
    );
}

export default DateInput;