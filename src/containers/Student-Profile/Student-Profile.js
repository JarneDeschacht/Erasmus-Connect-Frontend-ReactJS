import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Student-Profile.module.css';
import ProfilePicture from '../../components/UI/ProfilePicture/ProfilePicture';
import Map from '../../components/UI/Map/Map';
import Button from '../../components/UI/Button/Button';
import { NavLink } from 'react-router-dom';

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
                            <p>{student.erasmusCourse || '-----'}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Home City: {student.homeUniversity.city.name || ''}</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Home Country</h4>
                            <h2>{student.homeUniversity.city.country.name || '-----'}</h2>
                        </div>
                        <div>
                            <h4>Home University</h4>
                            <h2>{student.homeUniversity.name || '-----'}</h2>
                        </div>
                        <div>
                            <Button>View connection</Button>
                            <Button>Edit student</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Erasmus City: {student.erasmusUniversity.city.name || ''}</h4>
                            <Map />
                        </div>
                        <div>
                            <h4>Erasmus Country</h4>
                            <h2>{student.erasmusUniversity.city.country.name || '-----'}</h2>
                        </div>
                        <div>
                            <h4>Erasmus University</h4>
                            <h2>{student.erasmusUniversity.name || '-----'}</h2>
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