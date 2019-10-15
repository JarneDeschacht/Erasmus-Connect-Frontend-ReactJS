import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/profile';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Profile.module.css';

const Profile = props => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const onFetchProfile = useCallback(() => dispatch(actions.fetchProfile(token, userId)), [token, userId, dispatch]);
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    useEffect(() => {
        onFetchProfile();
    }, [onFetchProfile]);

    console.log(profile);

    let content = <Spinner/>

    if (!loading && profile) {
        content = (
            <div>
                <ul>
                    <li>{profile.firstname} {profile.lastname}</li>
                    <li>{profile.birthday}</li>
                    <li>{profile.course}</li>
                    <li>{profile.bio}</li>
                    <ul>
                        <li>{profile.current.city}</li>
                        <li>{profile.current.country}</li>
                        <li>{profile.current.school}</li>
                    </ul>
                    <li>{profile.email}</li>
                    <ul>
                        <li>{profile.upcoming.city}</li>
                        <li>{profile.upcoming.country}</li>
                        <li>{profile.upcoming.school}</li>
                    </ul>
                </ul>
            </div>
        )
    }

    return (
        <div className={classes.Profile}>
            {content}
        </div>
    );
}

export default Profile;