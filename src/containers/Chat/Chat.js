import React, { useCallback, useEffect } from 'react'
import ChatHead from './ChatHead/ChatHead'
import ExistingChats from './ExistingChats/ExistingChats'
import ChatWindow from './ChatWindow/ChatWindow'
import classes from './Chat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions/index'

const Chat = props => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.chat.selectedConnection)
    // const loadingState = useSelector(statech => state.chat.loading);
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);

    const onNavbarDisplaySwitch = useCallback(
        () => dispatch(actions.navbarSwitchDisplay()),
        [dispatch]
    );

    useEffect(() => {
        if (!isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);    

    return (
        <div className={classes.Chat}>
            <ExistingChats />
            <div className={classes.ChatContainer}>
                <ChatHead
                    connection={selectedUser}
                />
                <ChatWindow
                    connection={selectedUser}
                />
            </div>
        </div>
    )
}

export default Chat;