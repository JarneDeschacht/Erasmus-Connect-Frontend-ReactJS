import React from 'react';
import classes from './input.module.css';
import DateInput from './DateInput/DateInput';

const input = props => {
    let inputElement = null;
    let label = null;

    const inputClasses = [classes.Input];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
        if (props.elementType === 'date') {
            validationError = <p className={[classes.ValidationError,classes.DateError].join(' ')}>{props.errorMessage}</p>;
        }
    }



    switch (props.elementType) {
        case ('input'):
            label = <label htmlFor={props.id} className={classes.Label}>{props.label}</label>
            inputElement = <input
                ref={props.inputRef}
                id={props.id}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value}
            />;
            break;
        case ('select'):
            inputClasses.push(classes.Select);
            label = <label htmlFor={props.id} className={classes.Label}>{props.label}</label>
            inputElement = (
                <select
                    id={props.id}
                    required
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                    <option value="" defaultValue hidden>--- Select Country ---</option>
                    {
                        props.elementConfig.options.map(country => (
                            <option
                                key={country.id}
                                value={country.id}
                            >{country.name}</option>
                        ))
                    }
                </select>
            );
            break;
        case ('date'):
            label = <label htmlFor={props.id} className={classes.Label}>{props.label}</label>
            inputElement = <DateInput id={props.id} changed={props.changed} />
            break;
        default:
            label = <label htmlFor={props.id} className={classes.Label}>{props.label}</label>
            inputElement = <input
                id={props.id}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />;
    }
    return (
        <div>
            {label}
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;