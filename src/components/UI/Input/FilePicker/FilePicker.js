import React from 'react';
import classes from './FilePicker.module.css';

const filePicker = props => {

    let input = document.getElementById(props.id);
    if (input) {
        let label = input.nextElementSibling;
        input.addEventListener('change', function (e) {
            let fileName = e.target.value.split("\\").pop();
            if (fileName)
                label.innerHTML = fileName;
        });
    }


    return (
        <div >
            <input
                className={classes.InputFile}
                //   className={[
                //     !props.valid ? 'invalid' : 'valid',
                //     props.touched ? 'touched' : 'untouched'
                //   ].join(' ')}
                type="file"
                id={props.id}
                onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
                onBlur={props.onBlur}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
};

export default filePicker;
