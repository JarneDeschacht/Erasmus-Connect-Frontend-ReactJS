import React from 'react';
import classes from './ImagePreview.module.css';

const imagePreview = props => (
    <div
        className={classes.Image}
        style={{
            backgroundImage: `url('${props.imageUrl}')`
        }}
    />
);

export default imagePreview;