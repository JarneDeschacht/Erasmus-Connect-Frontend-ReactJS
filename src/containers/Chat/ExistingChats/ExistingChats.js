import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './ExistingChats.module.css'
import * as actions from '../../../store/actions/index'
import ChatConnection from './ChatConnection/ChatConnection'
const ExistingChats = props => {

    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const connections = useSelector(state => state.student.connections);
    const selectedChatFromRoute = useSelector(state =>state.chat.selectedConnection)

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
            console.log(selectedChatFromRoute)
            if(selectedChatFromRoute){
                onSelectChat(selectedChatFromRoute)
            }
            else{
                onSelectChat(connections.connections[0])
            }
            
        }
    }, [connections, onSelectChat])

    const clickedHandler = (selectedConnectionId) => {
        onSelectChat(selectedConnectionId);
    }

    let connectionList = null;
   
    if (connections) {
        console.log(connections.connections)
        connections.connections.sort((a, b) => a.lastMessageDate < b.lastMessageDate ? 1: -1 || a.connectionId > b.connectionId? 1: -1)
        connectionList = connections.connections.map(con => {
            return (
                <ChatConnection
                    key={con.connectionId}
                    name={con.firstName + ' ' + con.lastName}
                    userId={con.userId}
                    imageUrl={con.imageUrl}
                    connectionId={con.connectionId}
                    lastMessage={con.lastMessage}
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