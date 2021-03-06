import React from 'react';
import classes from './Saerch-Result.module.css';
import ProfilePicture from '../../UI/ProfilePicture/ProfilePicture';

const SearchResult = props => {
    return (
        <div className={classes.SearchResult} onClick={props.clicked}>
            <ProfilePicture imageUrl={props.student.imageUrl} />
            <div>
                <h2 className={classes.Title}>{props.student.name}</h2>
                <h3 className={classes.SubTitle}>{props.student.school}</h3>
                <small className={classes.Small}>{props.student.location}</small>
            </div>
        </div>
    );
}

export default SearchResult;