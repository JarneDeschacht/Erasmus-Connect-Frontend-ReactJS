import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ExistingChats.module.css'
import * as actions from '../../../store/actions/index'
import ChatConnection from './ChatConnection/ChatConnection'
const ExistingChats = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const connections = useSelector(state => state.student.connections);
    // const chatLoading = useSelector(state => state.chat.loading) 

    const onFetchConnections = useCallback((userId) => dispatch(actions.getConnections(userId)), [dispatch])
    const onSelectChat = useCallback((connectionId) => dispatch(actions.selectChat(connectionId)), [dispatch])
    const onFetchLastMessageOfConversation = useCallback((connection_ids) => dispatch(actions.getLastMessageOfConversation(connection_ids)), [dispatch])


    useEffect(() => {
        onFetchConnections(userId)
    }, [onFetchConnections, userId])

    useEffect(() => {
        let connection_ids = []
        if (connections) {
            connections.connections.forEach(con => {
                connection_ids.push(con.connectionId)
            })
        }

        onFetchLastMessageOfConversation(connection_ids)

    }, [connections, onFetchLastMessageOfConversation])


    //loadin the first connection as default
    useEffect(() => {
        if (connections) {
            onSelectChat(connections.connections[0])
        }
    }, [connections, onSelectChat])

    const clickedHandler = (selectedConnectionId) => {
        onSelectChat(selectedConnectionId);
    }

    let connectionList = null;
    if (connections) {
        connectionList = connections.connections.map(con => {


            // console.log(chatLoading)
            return (
                <ChatConnection
                    key={con.connectionId}
                    name={con.firstName + ' ' + con.lastName}
                    userId={con.userId}
                    imageUrl={con.imageUrl}
                    connectionId={con.connectionId}
                    clicked={() => clickedHandler({
                        connectionId: con.connectionId,
                        firstName: con.firstName,
                        lastName: con.lastName,
                        userId: con.userId,
                        imageUrl: con.imageUrl
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