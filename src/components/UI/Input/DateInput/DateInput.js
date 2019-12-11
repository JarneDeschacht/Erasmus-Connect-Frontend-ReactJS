import React from 'react';
import classes from './DateInput.module.css';

const DateInput = props => {

    const moveCursor = (fromTextBoxId, toTextBoxId) => {
        let fromTextBox = document.getElementById(fromTextBoxId);

        let length = fromTextBox.value.length;
        let maxLength = fromTextBox.getAttribute('maxlength')

        if (length.toString() === maxLength.toString()) {
            document.getElementById(toTextBoxId).focus()
        }
    }

    let placeholders = ['Day', 'Month', 'Year']

    return (
        <div className={classes.DateInput}>
            <input /*id={props.id}*/
                id="day"
                name="DD"
                value={props.date[2]}
                onChange={props.changed}
                placeholder={placeholders[0]}
                className={classes.Input}
                maxLength="2"
                onKeyUp={() => moveCursor('day', 'month')}
            />
            <input
                id='month'
                placeholder={placeholders[1]}
                onChange={props.changed}
                value={props.date[1]}
                name="MM" className={classes.Input}
                maxLength="2"
                onKeyUp={() => moveCursor('month', 'year')}
            />
            <input
                id='year'
                placeholder={placeholders[2]}
                onChange={props.changed}
                value={props.date[0]}
                name="YYYY"
                className={classes.Input}
                maxLength="4"
            />
        </div>
    );
}

export default DateInput;