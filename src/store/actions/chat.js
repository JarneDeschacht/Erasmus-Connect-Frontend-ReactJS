import * as actionTypes from './actionTypes'


export const getMessages = (userId, chatWithId) => {
    return {
        type: actionTypes.GET_MESSAGES,
        userId: parseInt(userId, 10),
        chatWithId: chatWithId,
        loading: false
    }
}

export const getMessagesStart = () => {
    return {
        type: actionTypes.GET_MESSAGES_START
    }
}

export const getMessagesSuccess = (messages) => {
    return {
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

export const sendMessage = (senderId, receiverId, content) => {
    return {
        type: actionTypes.SEND_MESSAGE,
        senderId: senderId,
        receiverId: receiverId,
        content: content
    }
}

export const sendMessageStart = () => {
    return {
        type: actionTypes.SEND_MESSAGE_START
    }
}

export const sendMessagefail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    }
}

export const getLastMessageOfConversation = (connection_ids) => {
    return {
        type: actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION,
        connection_ids: connection_ids
    }
}

export const getLastMessageOfConversationStart = () => {
    return {
        type: actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_START
    }
}

export const getLastMessageOfConversationFail = () => {
    return {
        type: actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_FAIL
    }
}

export const getLastMessageOfConversationSuccess = (messages) => {
    return {
        type: actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION_SUCCESS,
        messages: messages
    }
}
