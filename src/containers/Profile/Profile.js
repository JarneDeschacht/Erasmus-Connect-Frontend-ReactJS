import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Profile.module.css';
import ProfilePicture from '../../components/UI/ProfilePicture/ProfilePicture';
import Map from '../../components/UI/Map/Map';
import Button from '../../components/UI/Button/Button';

const Profile = props => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const onFetchProfile = useCallback(() => dispatch(actions.fetchProfile(token, userId)), [token, userId, dispatch]);
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);
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
                <h2 className={classes.Title}>Welcome back {profile.firstname}</h2>
                <div className={classes.ProfileColumns}>
                    <div>
                        <ProfilePicture />
                        <h2>{profile.firstname} {profile.lastname}</h2>
                        <div>
                            <h4>Bio</h4>
                            <p>{profile.bio}</p>
                        </div>
                        <div>
                            <h4>Course</h4>
                            <p>{profile.course}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>City</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Country</h4>
                            <h3>{profile.current.country}</h3>
                        </div>
                        <div>
                            <h4>Course</h4>
                            <h3>{profile.current.school}</h3>
                        </div>
                        <div>
                            <Button>View connection</Button>
                            <Button>Edit profile</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>City</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Country</h4>
                            <h3>{profile.upcoming.country}</h3>
                        </div>
                        <div>
                            <h4>Course</h4>
                            <h3>{profile.upcoming.school}</h3>
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