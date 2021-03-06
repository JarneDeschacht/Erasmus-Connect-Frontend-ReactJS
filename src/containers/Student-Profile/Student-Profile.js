import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Student-Profile.module.css";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import Map from "../../components/UI/Map/Map";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { useHistory } from "react-router-dom";

const StudentProfile = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const onConnection = (userId, connectToId) =>
    dispatch(actions.makeConnection(userId, connectToId));
  const onAccept = (userId, connectToId) =>
    dispatch(actions.acceptConnection(userId, connectToId));
  const onRefuse = (userId, connectToId) =>
    dispatch(actions.refuseConnection(userId, connectToId));
  const onFetchConnections = useCallback((userId) => dispatch(actions.getConnections(userId)), [dispatch])
  const connections = useSelector(state => state.student.connections);

  const onLoad = useCallback(
    (userId, connectToId) =>
      dispatch(actions.getConnectionStatus(userId, connectToId)),
    [dispatch]
  );

  const onGetStudent = useCallback((studentId) =>
    dispatch(actions.fetchProfile(token, studentId)), [dispatch, token]);

  const clearProfile = useCallback(
    () =>
      dispatch(actions.clearProfile()),
    [dispatch]
  );

  let selectedUserId = props.match.params.id
  const onGoToChat = (connectionInfo) => dispatch(actions.routeToChat(connectionInfo))


  const connectionStatus = {
    exists: useSelector(state => state.student.connectionExists),
    requestSent: useSelector(state => state.student.connectionRequestSent),
    requestReceived: useSelector(
      state => state.student.connectionRequestReceived
    )
  };
  const loadingStatus = useSelector(state => state.student.fetchingStatus);

  const studentProfile = useSelector(state => state.student.profile);
  const userId = localStorage.getItem("userId");
  let history = useHistory();

  useEffect(() => {
    onFetchConnections(userId)
  }, [onFetchConnections, userId])

  useEffect(() => {
    clearProfile();
    onGetStudent(props.match.params.id.toString());
    onLoad(userId, props.match.params.id);
  }, [clearProfile, onGetStudent, props.match.params.id, onLoad, userId]);

  const onConnectionClick = () => {
    onConnection(userId, studentProfile.id);
  };

  const onAcceptConnection = () => {
    onAccept(studentProfile.id, userId);
  };

  const onRefuseConnection = () => {
    onRefuse(studentProfile.id, userId);
  };

  const onChat = () => {
    connections.connections.forEach(element => {

      if(selectedUserId.toString() === element.userId.toString()){
          onGoToChat(element);
      }
    });

    history.push('/chat');
  };

  let connectButton = null;
  if (loadingStatus) {
    connectButton = <Spinner />;
  } else {
    if (connectionStatus.exists) {
      connectButton = <Button maxWidth clicked={onChat}>Chat</Button>;
    } else if (connectionStatus.requestReceived) {
      connectButton = (
        <Aux>
          <p style={{ margin: '0' }}>Incoming request:</p>
          <div className={classes.ButtonGroup}>
            <Button maxWidth clicked={onAcceptConnection}>Accept</Button>
            <Button maxWidth clicked={onRefuseConnection}>Refuse</Button>
          </div>
        </Aux>
      );
    } else if (connectionStatus.requestSent) {
      connectButton = <Button maxWidth noPointer>Request Sent</Button>;
    } else {
      connectButton = <Button clicked={onConnectionClick} maxWidth>Connect</Button>;
    }
  }

  let studentContent = null;
  if (studentProfile) {
    studentContent = (
      <div className={classes.ProfileColumns}>
        <div className={classes.FirstCol}>
          <div className={classes.Row}>
            <ProfilePicture styleType="Profile" imageUrl={studentProfile.imageUrl} />
            <h2 className={classes.Name}>{studentProfile.firstName} {studentProfile.lastName}</h2>
            {connectButton}
          </div>
          <div className={classes.Row}>
            <h4>Bio</h4>
            <p>{studentProfile.bio}</p>
            <h4>Course</h4>
            <p>{studentProfile.erasmusCourse || '-----'}</p>
          </div>
          {/* <div className={classes.Row}> */}
           
          {/* </div> */}
        </div>
        <div>
          <div className={classes.Row}>
            <div>
              <h4 style={{marginTop:'0px'}}>Home City: {studentProfile.homeUniversity.city.name || ''}</h4>
              <Map address={studentProfile.homeUniversity.city.name + '+' + studentProfile.homeUniversity.city.country.name} />
            </div>
            <div>
              <h4>Home Country</h4>
              <h2>{studentProfile.homeUniversity.city.country.name || '-----'}</h2>
            </div>
          </div>
          <div className={classes.Row}>
            <h4>Home University</h4>
            <h2>{studentProfile.homeUniversity.name || '-----'}</h2>
          </div>

        </div>
        <div>
          <div className={classes.Row}>
            <div>
              <h4 style={{marginTop:'0px'}}>Erasmus City: {studentProfile.erasmusUniversity.city.name || ''}</h4>
              <Map address={studentProfile.erasmusUniversity.city.name + '+' + studentProfile.erasmusUniversity.city.country.name} />
            </div>
            <div>
              <h4>Erasmus Country</h4>
              <h2>{studentProfile.erasmusUniversity.city.country.name || '-----'}</h2>
            </div>
          </div>
          <div className={classes.Row}>
            <h4>Erasmus University</h4>
            <h2>{studentProfile.erasmusUniversity.name || '-----'}</h2>
          </div>
        </div>
      </div>
    )
  } else {
    studentContent = <Spinner />
  }

  return (
    <div className={classes.StudentProfile}>
      {studentContent}
    </div>
  );
};

export default StudentProfile;
