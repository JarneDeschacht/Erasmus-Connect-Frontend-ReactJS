import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Student-Profile.module.css";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import Map from "../../components/UI/Map/Map";
import Button from "../../components/UI/Button/Button";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const StudentProfile = props => {
  const dispatch = useDispatch();

  const onConnection = (userId, connectToId) =>
    dispatch(actions.makeConnection(userId, connectToId));
  const onLoad = useCallback(
    (userId, connectToId) =>
      dispatch(actions.getConnectionStatus(userId, connectToId)),
    [dispatch]
  );

  const connectionStatus = {
    exists: useSelector(state => state.student.connectionExists),
    requestSent: useSelector(state => state.student.connectionRequestSent),
    requestReceived: useSelector(
      state => state.student.connectionRequestReceived
    )
  };

  const loadingStatus = useSelector(state => state.student.fetchingStatus);

  const students = useSelector(state => state.student.students);
  const userId = localStorage.getItem("userId");
  let student = null;
  if (props.match.params.id) {
    for (let key in students) {
      if (students[key].id.toString() === props.match.params.id.toString()) {
        student = students[key];
      }
    }
  }

  useEffect(() => {
    onLoad(userId, student.id);
  }, [onLoad, userId, student]);

  const onConnectionClick = () => {
    onConnection(userId, student.id);
  };

  const onAcceptConnection = () => {

  };

  const onChat = () => {

  }

  let connectButton = null;
  if (loadingStatus) {
    connectButton = <Spinner />;
  } else {
    if (connectionStatus.exists) {
      connectButton = <Button clicked={onChat}>Chat</Button>;
    } else if (connectionStatus.requestReceived) {
      connectButton = (
        <Button clicked={onAcceptConnection}>Accept Request</Button>
      );
    } else if (connectionStatus.requestSent) {
      connectButton = <Button noPointer>Request Sent</Button>;
    } else {
      connectButton = <Button clicked={onConnectionClick}>Connect</Button>;
    }
  }

    return (
        <div className={classes.StudentProfile}>
            <NavLink className={classes.GoBack} to="/students">Go back</NavLink>
            <div className={classes.ProfileColumns}>
                    <div>
                        <ProfilePicture imageUrl={student.imageUrl} />
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
                            <Map address={student.homeUniversity.city.name + '+' + student.homeUniversity.city.country.name} />
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
                            {connectButton}
                            <Button>Edit student</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Erasmus City: {student.erasmusUniversity.city.name || ''}</h4>
                            <Map address={student.erasmusUniversity.city.name + '+' + student.erasmusUniversity.city.country.name} />
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
};

export default StudentProfile;
