import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './My-Profile.module.css';
import { NavLink } from 'react-router-dom';
import ProfilePicture from '../../components/UI/ProfilePicture/ProfilePicture';
import Map from '../../components/UI/Map/Map';
import Button from '../../components/UI/Button/Button';

const Profile = props => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const onFetchProfile = useCallback(() => dispatch(actions.fetchProfile(token, userId)), [token, userId, dispatch]);
    const profile = useSelector(state => state.student.profile);
    const loading = useSelector(state => state.student.loading);
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    useEffect(() => {
        onFetchProfile();
    }, [onFetchProfile]);

    let content = <Spinner />

    if (!loading && profile) {
        content = (
            <div className={classes.Profile}>
                <div className={classes.Header}>
                    <NavLink className={classes.GoBack} to="/">Go back</NavLink>
                    <h2 className={classes.Title}>Welcome back {profile.firstName}</h2>
                </div>
                <div className={classes.ProfileColumns}>
                    <div>
                        <ProfilePicture imageUrl={profile.imageUrl} />
                        <h2>{profile.firstName} {profile.lastName}</h2>
                        <div>
                            <h4>Bio</h4>
                            <p>{profile.bio}</p>
                        </div>
                        <div>
                            <h4>Course</h4>
                            <p>{profile.erasmusCourse || '-----'}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Home City: {profile.homeUniversity.city.name || ''}</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Home Country</h4>
                            <h2>{profile.homeUniversity.city.country.name || '-----'}</h2>
                        </div>
                        <div>
                            <h4>Home University</h4>
                            <h2>{profile.homeUniversity.name || '-----'}</h2>
                        </div>
                        <div>
                            <Button>View connection</Button>
                            <Button>Edit profile</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Erasmus City: {profile.erasmusUniversity.city.name || ''}</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Erasmus Country</h4>
                            <h2>{profile.erasmusUniversity.city.country.name || '-----'}</h2>
                        </div>
                        <div>
                            <h4>Erasmus University</h4>
                            <h2>{profile.erasmusUniversity.name || '-----'}</h2>
                        </div>
                        <div>
                            <Button>Manage photos</Button>
                            <Button>Social profiles</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return content;
}

export default Profile;