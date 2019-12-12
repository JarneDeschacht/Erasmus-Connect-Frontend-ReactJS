import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import classes from "./ConnectionSummarty.module.css";
import * as actions from "../../../store/actions/index";
import { useHistory } from "react-router-dom";

const ConnectionSummary = props => {
  const dispatch = useDispatch();
  let history = useHistory()
  const userId = localStorage.getItem("userId");

  const onAcceptConnection = (senderId, receiverId) => dispatch(actions.acceptConnection(senderId, receiverId));
  const onRefuseConnection = (senderId, receiverId) => dispatch(actions.refuseConnection(senderId, receiverId));
  const onGoToChat = (connectionInfo) => dispatch(actions.routeToChat(connectionInfo))
  const connections = useSelector(state => state.student.connections.connections);

  const onAccept = () => {
    onAcceptConnection(props.userId, userId);
  }
  const onRefuse = () => {
    onRefuseConnection(props.userId, userId);
  }

  const routeToChat = () => {
    const connectToId = props.userId;

    connections.forEach(element => {
      if(connectToId === element.userId){
          onGoToChat(element);
      }
    });

    history.push('/chat'); 
  }

  return (
    <div className={classes.ConnectionSummary}>
      <div className={classes.Info}>{props.name}</div>
      {props.isConnection ? (
        <div className={classes.Controls}>
          <Button clicked={() => { props.goTo('/students', [props.userId]) }} smallButton>View Profile</Button>
          <Button smallButton clicked={() => routeToChat()}>Chat</Button>
          <Button smallButton clicked={() => { onRefuse() }}>Remove Connection</Button>
        </div>
      ) : null}
      {props.isReceived ? (
        <div className={classes.Controls}>
          <Button clicked={() => { onAccept() }} smallButton>Accept</Button>
          <Button clicked={() => { onRefuse() }} smallButton>Refuse</Button>
        </div>
      ) : null}
      {props.isSent ? (
        <div className={classes.Controls}>
          <Button clicked={() => { onRefuse() }} smallButton>Cancel</Button>
        </div>
      ) : null}
    </div>
  );
};

export default ConnectionSummary;
