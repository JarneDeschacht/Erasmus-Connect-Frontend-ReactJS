import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import classes from "./ConnectionSummarty.module.css";
import * as actions from "../../../store/actions/index";
import { useHistory } from "react-router-dom";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import FontAwesome from 'react-fontawesome';

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
      if (connectToId === element.userId) {
        onGoToChat(element);
      }
    });

    history.push('/chat');
  }



  return (
    <Aux>
      <div className={[classes.ConnectionSummary, classes.BigScreen].join(' ')}>
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

      <div className={[classes.ConnectionSummary, classes.SmallScreen].join(' ')}>
        <div className={classes.Info}>{props.name}</div>
        {props.isConnection ? (
          <div className={classes.Controls}>
            <div className={classes.ButtonContainer}>
              <Button clicked={() => { props.goTo('/students', [props.userId]) }} smallButton>
                <FontAwesome
                  name="fas fa-user" />
              </Button>
            </div>
            <div className={classes.ButtonContainer}>
              <Button smallButton clicked={() => routeToChat()}>
                <FontAwesome
                  name="fas fa-comments" />
              </Button>
            </div>
            <div className={classes.ButtonContainer}>
              <Button smallButton clicked={() => { onRefuse() }}>
                <FontAwesome
                  name="fas fa-trash" />
              </Button>
            </div>

          </div>
        ) : null}
        {props.isReceived ? (
          <div className={classes.Controls}>
            <div className={classes.ButtonContainer}>
              <Button clicked={() => { onAccept() }} smallButton>
                <FontAwesome
                  name="fas fa-check" />
              </Button>
            </div>
            <div className={classes.ButtonContainer}>
              <Button clicked={() => { onRefuse() }} smallButton>
                <FontAwesome
                  name="fas fa-times" />
              </Button>
            </div>
          </div>
        ) : null}
        {props.isSent ? (
          <div className={classes.Controls}>
            <div className={classes.ButtonContainer}>
              <Button clicked={() => { onRefuse() }} smallButton>
                <FontAwesome
                  name="fas fa-times" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Aux>



  );
};

export default ConnectionSummary;
