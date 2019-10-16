import React from 'react';
import MapImage from '../../../assets/images/map.png';
import classes from './Map.module.css';

const map = () => {
    return <img className={classes.Map} src={MapImage} alt={Math.random()} />
}
export default map;