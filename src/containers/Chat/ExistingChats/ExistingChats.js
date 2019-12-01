import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ExistingChats.module.css'
import * as actions from '../../../store/actions/index'
import ChatConnection from './ChatConnection/ChatConnection'
const ExistingChats = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const connections = useSelector(state => state.student.connections);

    const onFetchConnections = useCallback((userId) => dispatch(actions.getConnections(userId)), [dispatch])
    const onSelectChat = (connectionId) => dispatch(actions.selectChat(connectionId))



    useEffect(() => {
        onFetchConnections(userId)
    }, [onFetchConnections, userId])

    //loadin the first connection as default
    useEffect(() => {
        if (connections) {
            onSelectChat(connections.connections[0])
        }
    }, [connections])

    const clickedHandler = (selectedConnectionId) => {
        onSelectChat(selectedConnectionId);
    }

    let connectionList = null;
    if (connections) {
        connectionList = connections.connections.map(con => {
            console.log('con')
            console.log(con)
            return (
                <ChatConnection
                    name={con.firstName + ' ' + con.lastName}
                    key={con.connectionId}
                    clicked={() => clickedHandler({
                        connectionId : con.connectionId,
                        firstName: con.firstName,
                        lastName: con.lastName
                    })}
                />
            )
        })
    }

    return (
        <div className={classes.ExistingChats}>
            {connectionList}
        </div>
    )
}

export default ExistingChats;