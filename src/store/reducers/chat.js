import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    messages: null,
    selectedConnection: null,
    loading: false,
    lastMessages: null
}


const getMessagesStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const getMessagesSuccess = (state, action) => {
    return updateObject(state, {
        messages: action.messages,
        loading: false
    })
}

const getMessagesFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })

}

const selectChat = (state, action) => {
    return updateObject(state, {
        selectedConnection: action.connectionId
    })
}

const getLastMessageStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const getLastMessageSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        lastMessages: action.messages
    })
}

const getLastMessageFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const newMessage = (state, action) => {    
    const messages = [...state.messages];
    console.log(messages);
    let lastKey = 0
    for (let key in messages) {
        lastKey = parseInt(key, 10)
    }
    const newKey = lastKey + 1;

    messages[newKey] = {
        content: action.message.content,
        messageId: messages.length + 1 + new Date().toString(),
        receiver: action.message.receiver,
        sendDate: action.message.sendDate,
        sender: action.message.sender
    }
     return updateObject(state, {
        messages: messages
    })
}

const goToChat =(state, action) => {
    return updateObject(state, {
        selectedConnection: action.userId
    })
}

const routeToChat = (state, action) => {
    return updateObject(state,{
        selectedConnection: action.connectionInfo,
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGES_START: return getMessagesStart(state, action);
        case actionTypes.GET_MESSAGES_SUCCESS: return getMessagesSuccess(state, action);
        case actionTypes.GET_MESSAGES_FAIL: return getMessagesFail(state, action);
        case actionTypes.SELECT_CHAT: return selectChat(state, action);
        case actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_START: return getLastMessageStart(state, action);
        case actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_SUCCESS: return getLastMessageSuccess(state, action);
        case actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_FAIL: return getLastMessageFail(state, action);
        case actionTypes.NEW_MESSAGE: return newMessage(state, action);
        case actionTypes.GO_TO_CHAT: return goToChat(state, action);
        case actionTypes.ROUTE_TO_CHAT: return routeToChat(state, action)
        default: return state;
    }
}

export default reducer;