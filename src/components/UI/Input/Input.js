import React from 'react';
import classes from './input.module.css';

const input = props => {
    let inputElement = null;
    const inputClasses = [classes.Input];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
                 />;
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />;
    }
    return (
        <div>
            <label className={classes.Label}
            >{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;