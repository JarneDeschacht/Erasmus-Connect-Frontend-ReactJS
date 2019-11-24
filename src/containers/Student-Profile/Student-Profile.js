import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Student-Profile.module.css';
import ProfilePicture from '../../components/UI/ProfilePicture/ProfilePicture';
import Map from '../../components/UI/Map/Map';
import Button from '../../components/UI/Button/Button';
import {NavLink} from 'react-router-dom';

const StudentProfile = props => {

    const students = useSelector(state => state.student.students);

    let student = null;
    if (props.match.params.id) {
        for (let key in students) {
            if (students[key].id.toString() === props.match.params.id.toString()) {
                student = students[key];
                console.log(students[key])
            }
        }
    }

    return (
        <div className={classes.StudentProfile}>
            <NavLink className={classes.GoBack} to="/">Go back</NavLink>
            <div className={classes.ProfileColumns}>
                <div>
                    <ProfilePicture />
                    <h2>{student.firstName} {student.lastName}</h2>
                    <div>
                        <h4>Bio</h4>
                        <p>{student.bio}</p>
                    </div>
                    <div>
                        <h4>Course</h4>
                        <p>-----</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>City</h4>
                        <Map />
                    </div>
                    <div>
                        <h4>Country</h4>
                        <h2>-----</h2>
                    </div>
                    <div>
                        <h4>Course</h4>
                        <h2>-----</h2>
                    </div>
                    <div>
                        <Button>request connection</Button>
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
                        <h2>-----</h2>
                    </div>
                    <div>
                        <h4>Course</h4>
                        <h2>-----</h2>
                    </div>
                    <div>
                        <Button>Manage photos</Button>
                        <Button>Social profiles</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;