import React, {useState, useEffect} from 'react';
import classes from './DateInput.module.css';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const DateInput = props => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    let placeholders = ['Day', 'Month', 'Year']

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if(windowDimensions.width < 576) {
        placeholders = ['dd', 'mm', 'yyyy']
    }

    return (
        <div className={classes.DateInput}>
            <input id={props.id} name="DD" value={props.date[2]} onChange={props.changed} placeholder={placeholders[0]} className={classes.Input} maxLength="2" />
            <input placeholder={placeholders[1]} onChange={props.changed} value={props.date[1]} name="MM" className={classes.Input} maxLength="2" />
            <input placeholder={placeholders[2]} onChange={props.changed} value={props.date[0]} name="YYYY" className={classes.Input} maxLength="4" />
        </div>
    );
}

export default DateInput;