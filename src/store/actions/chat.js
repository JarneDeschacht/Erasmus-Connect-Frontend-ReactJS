import * as actionTypes from './actionTypes'


export const getMessages = (userId, chatWithId) => {
    return {
        type: actionTypes.GET_MESSAGES,
        userId: parseInt(userId, 10),
        chatWithId: chatWithId
    }
}

export const getMessagesStart = () => {
    return {
        type: actionTypes.GET_MESSAGES_START
    }
}

export const getMessagesSuccess = (messages) => {
    return{
        type: actionTypes.GET_MESSAGES_SUCCESS,
        messages: messages
    }
}

export const getMessagesFailed = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAIL,
        error: error
    }
}

export const selectChat = (connectionId) => {
    return {
        type: actionTypes.SELECT_CHAT,
        connectionId: connectionId
    }
}
