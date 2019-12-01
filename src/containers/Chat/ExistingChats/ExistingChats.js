import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ExistingChats.module.css'
import * as actions from '../../../store/actions/index'
import ChatConnection from './ChatConnection/ChatConnection'
const ExistingChats = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const connections = useSelector(state => state.student.connections);

    const onFetchConnections = useCallback((userId) => dispatch(actions.getConnections(userId)), [dispatch])

    useEffect(() => {
        onFetchConnections(userId)
    }, [onFetchConnections, userId])


    let connectionList = null;
    if (connections) {
        connectionList = connections.connections.map(con => {
            return (
                <ChatConnection
                    name={con.firstName + ' ' + con.lastName}
                    key={Math.random()}
                />
            )
        })
    }




    return (
        <div className={classes.ExistingChats}>
            ExistingChats
            {connectionList}
        </div>
    )
}

export default ExistingChats;