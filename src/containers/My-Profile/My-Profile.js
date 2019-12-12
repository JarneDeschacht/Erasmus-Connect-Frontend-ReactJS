import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./My-Profile.module.css";
import { NavLink } from "react-router-dom";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import Map from "../../components/UI/Map/Map";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/modal";
import ConnectionSummary from "../../components/UI/ConnectionSummary/ConnectionSummary";

const Profile = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const onFetchProfile = useCallback(
    () => dispatch(actions.fetchProfile(token, userId)),
    [token, userId, dispatch]
  );
  const profile = useSelector(state => state.student.profile);
  const loading = useSelector(state => state.student.loading);
  const connections = useSelector(state => state.student.connections);
  const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
  const onNavbarDisplaySwitch = useCallback(
    () => dispatch(actions.navbarSwitchDisplay()),
    [dispatch]
  );
  const onFetchConnections = userId => dispatch(actions.getConnections(userId));

  const isNotification = useSelector(state => state.student.isNotification);
  const onGetNotificationStatus = useCallback((userId) => dispatch(actions.getNotificationStatus(userId)), [dispatch]);

  useEffect(() => {
    onGetNotificationStatus(userId);
  }, [onGetNotificationStatus, userId]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!isNavbarVisible) {
      onNavbarDisplaySwitch();
    }
  }, [onNavbarDisplaySwitch, isNavbarVisible]);

  const openConnectionsModal = () => {
    setOpenModal(true);
    if (connections === null) {
      onFetchConnections(userId);
    }
  };

  const closeConnectionsModal = () => {
    setOpenModal(false);
  };

  const goToLink = (link, params) => {
    let destination = link;
    params.forEach(param => {
      destination = destination + '/' + param;
    });
    props.history.push({ pathname: destination });
  }

  useEffect(() => {
    onFetchProfile();
  }, [onFetchProfile]);

  let notificationBubble = null;
  if (isNotification) {
    notificationBubble = (<div className={classes.NotificationBubble}></div>)
  }

  let content = <Spinner />;

  let modalContent = null;
  if (connections !== null) {
    modalContent = (
      <div>
        <div>
          <h2 style={{ marginTop: "10px" }}>Received Requests</h2>
          {connections.received
            ? connections.received.map(connection => {
              return (
                <ConnectionSummary
                  key={userId.concat(connection.userId)}
                  name={connection.firstName + " " + connection.lastName}
                  userId={connection.userId}
                  goTo={(link, params) => { goToLink(link, params) }}
                  isReceived
                />
              );
            })
            : null}
          <hr className={classes.Hr} />
        </div>
        <div>
          <h2>Sent Requests</h2>
          {connections.sended
            ? connections.sended.map(connection => {
              return (
                <ConnectionSummary
                  key={userId.concat(connection.userId)}
                  name={connection.firstName + " " + connection.lastName}
                  userId={connection.userId}
                  goTo={(link, params) => { goToLink(link, params) }}
                  isSent
                />
              );
            })
            : null}
          <hr className={classes.Hr} />
        </div>
        <div>
          <h2>Connections</h2>
          {connections.connections
            ? connections.connections.map(connection => {
              return (
                <ConnectionSummary
                  key={userId.concat(connection.userId)}
                  name={connection.firstName + " " + connection.lastName}
                  userId={connection.userId}
                  goTo={(link, params) => { goToLink(link, params) }}
                  isConnection
                />
              );
            })
            : null}
        </div>
      </div>
    );
  } else {
    modalContent = <Spinner />;
  }

  if (!loading && profile) {
    content = (
      <div className={classes.Profile}>
        <Modal
          open={openModal}
          onClose={() => closeConnectionsModal()}
        >{modalContent}</Modal>
        <div className={classes.ProfileColumns}>
          <div>
            <div className={classes.Row}>
              <ProfilePicture styleType="Profile" imageUrl={profile.imageUrl} />
              <h2 className={classes.Name}>
                {profile.firstName} {profile.lastName}
              </h2>
            </div>
            <div className={classes.Row}>
              <h4>Bio</h4>
              <p>{profile.bio}</p>
            </div>
            <div className={classes.Row}>
              <h4>Course</h4>
              <p>{profile.erasmusCourse || "-----"}</p>
            </div>
          </div>
          <div>
            <div className={classes.Row}>
              <div>
                <h4>Home City: {profile.homeUniversity.city.name || ""}</h4>
                <Map address={profile.homeUniversity.city.name + '+' + profile.homeUniversity.city.country.name} />
              </div>
              <div>
                <h4>Home Country</h4>
                <h2>{profile.homeUniversity.city.country.name || "-----"}</h2>
              </div>
            </div>
            <div className={classes.Row}>
              <h4>Home University</h4>
              <h2>{profile.homeUniversity.name || "-----"}</h2>
            </div>
            <div className={classes.Row}>
              <div style={{ position: 'relative' }}>
                {notificationBubble}
                <Button
                  clicked={() => {
                    openConnectionsModal();
                  }} maxWidth>
                  My connections
              </Button>
              </div>
              <NavLink className={classes.NavLink} exact to="/edit-profile"><Button maxWidth>Edit Profile</Button></NavLink>
            </div>
          </div>
          <div>
            <div className={classes.Row}>
              <div>
                <h4>Erasmus City: {profile.erasmusUniversity.city.name || ""}</h4>
                <Map address={profile.erasmusUniversity.city.name + '+' + profile.erasmusUniversity.city.country.name} />
              </div>
              <div>
                <h4>Erasmus Country</h4>
                <h2>{profile.erasmusUniversity.city.country.name || "-----"}</h2>
              </div>
            </div>
            <div className={classes.Row}>
              <h4>Erasmus University</h4>
              <h2>{profile.erasmusUniversity.name || "-----"}</h2>
            </div>
            <div className={classes.Row}>
              <Button maxWidth>Social profiles</Button>
              <NavLink className={classes.NavLink} exact to="/edit-erasmus"><Button maxWidth>Edit Erasmus</Button></NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default Profile;
