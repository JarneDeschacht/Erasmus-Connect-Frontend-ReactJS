import React from 'react';
import classes from './Saerch-Result.module.css';
import ProfilePicture from '../../UI/ProfilePicture/ProfilePicture';

const SearchResult = props => {
    return (
        <div className={classes.SearchResult} onClick={props.clicked}>
            <ProfilePicture />
            <div>
                <h2 className={classes.Title}>{props.student.name}</h2>
                <h3>{props.student.school}</h3>
                <small>{props.student.location}</small>
            </div>
        </div>
    );
}

export default SearchResult;