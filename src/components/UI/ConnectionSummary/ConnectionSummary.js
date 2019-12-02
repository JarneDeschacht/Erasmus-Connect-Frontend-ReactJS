import React from "react";
import {useDispatch} from "react-redux";
import Button from "../Button/Button";
import classes from "./ConnectionSummarty.module.css";
import {useHistory} from "react-router-dom";
import * as actions from "../../../store/actions/index";

const ConnectionSummary = props => {
  const dispatch = useDispatch();

  let history = useHistory();
  const userId = localStorage.getItem("userId");

  const onAcceptConnection = (senderId, receiverId) => dispatch(actions.acceptConnection(senderId, receiverId));
  const onRefuseConnection = (senderId, receiverId) => dispatch(actions.refuseConnection(senderId, receiverId));

  const onAccept = () => {
    onAcceptConnection(props.userId, userId);
  }
  const onRefuse = () => {
    onRefuseConnection(props.userId, userId);
  }

  return (
    <div className={classes.ConnectionSummary}>
      <div className={classes.Info}>{props.name}</div>
      {props.isConnection ? (
        <div className={classes.Controls}>
          <Button clicked={() => {history.push(`/students/${props.userId}`)}} smallButton>View Profile</Button>
          <Button smallButton>Chat</Button>
          <Button smallButton>Remove Connection</Button>
        </div>
      ) : null}
      {props.isReceived ? (
        <div className={classes.Controls}>
          <Button clicked={() => {onAccept()}} smallButton>Accept</Button>
          <Button clicked={() => {onRefuse()}} smallButton>Refuse</Button>
        </div>
      ) : null}
      {props.isSent ? (
        <div className={classes.Controls}>
          <Button clicked={() => {onRefuse()}} smallButton>Cancel</Button>
        </div>
      ) : null}
    </div>
  );
};

export default ConnectionSummary;
