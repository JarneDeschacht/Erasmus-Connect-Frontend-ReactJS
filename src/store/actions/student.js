import * as actionTypes from './actionTypes';

export const fetchProfileSuccess = (profile) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_SUCCESS,
        profile: profile
    }
}
export const fetchProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_FAIL,
        error: error,
    }
}
export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE_START
    }
}
export const fetchProfile = (token, userId) => {
    return {
        type: actionTypes.FETCH_STUDENT_PROFILE,
        token: token,
        userId: userId
    }
}

export const fetchStudentsSuccess = (students) => {
    return {
        type: actionTypes.FETCH_STUDENTS_SUCCESS,
        students: students
    }
}
export const fetchStudentsFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENTS_FAIL,
        error: error,
    }
}
export const fetchStudentsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENTS_START
    }
}
export const fetchStudents = (token, userId, keyword) => {
    return {
        type: actionTypes.FETCH_STUDENTS,
        token: token,
        userId: userId,
        keyword: keyword
    }
}

export const getConnectionStatus = (userId, connectToId) => {
    return {
        type: actionTypes.GET_CONNECTION_STATUS,
        userId: userId,
        connectToId: connectToId
    }
}
export const getConnectionStatusStart = (userId, connectToId) => {
    return {
        type: actionTypes.GET_CONNECTION_STATUS_START,
        userId: userId,
        connectToId: connectToId
    }
}
export const getConnectionStatusSuccess = (connectionExists, connectionRequestSent, connectionRequestReceived) => {
    return {
        type: actionTypes.GET_CONNECTION_STATUS_SUCCESS,
        connectionExists: connectionExists,
        connectionRequestSent: connectionRequestSent,
        connectionRequestReceived: connectionRequestReceived
    }
}
export const getConnectionStatusFail = (error) => {
    return {
        type: actionTypes.GET_CONNECTION_STATUS_FAIL,
        error: error
    }
}
export const getConnections = (userId) => {
    return {
        type: actionTypes.GET_CONNECTIONS,
        userId: userId
    }
}
export const getConnectionsStart = () => {
    return {
        type: actionTypes.GET_CONNECTIONS_START
    }
}
export const getConnectionsSuccess = (connections) => {
    return {
        type: actionTypes.GET_CONNECTIONS_SUCCESS,
        connections: connections
    }
}

export const getConnectionsFail = (error) => {
    return {
        type: actionTypes.GET_CONNECTIONS_FAIL,
        error: error
    }
}
export const makeConnection = (userId, connectToId) => {
    return {
        type: actionTypes.MAKE_CONNECTION,
        userId: userId,
        connectToId: connectToId
    }
}
export const makeConnectionStart = () => {
    return {
        type: actionTypes.MAKE_CONNECTION_START
    }
}
export const makeConnectionSuccess = () => {
    return {
        type: actionTypes.MAKE_CONNECTION_SUCCESS
    }
}
export const makeConnectionFail = (error) => {
    return {
        type: actionTypes.MAKE_CONNECTION_FAIL,
        error: error
    }
}

export const acceptConnection = (senderId, receiverId) => {
    return {
        type: actionTypes.ACCEPT_CONNECTION,
        senderId: senderId,
        receiverId: receiverId
    }
}
export const acceptConnectionStart = () => {
    return {
        type: actionTypes.ACCEPT_CONNECTION_START
    }
}
export const acceptConnectionSuccess = () => {
    return {
        type: actionTypes.ACCEPT_CONNECTION_SUCCESS
    }
}
export const acceptConnectionFail = (error) => {
    return {
        type: actionTypes.ACCEPT_CONNECTION_FAIL,
        error: error
    }
}
export const refuseConnection = (senderId, receiverId) => {
    return {
        type: actionTypes.REFUSE_CONNECTION,
        senderId: senderId,
        receiverId: receiverId
    }
}
export const refuseConnectionStart = () => {
    return {
        type: actionTypes.REFUSE_CONNECTION_START
    }
}
export const refuseConnectionSuccess = () => {
    return {
        type: actionTypes.REFUSE_CONNECTION_SUCCESS
    }
}
export const refuseConnectionFail = (error) => {
    return {
        type: actionTypes.REFUSE_CONNECTION_FAIL,
        error: error
    }
}

export const registerErasmusSuccess = () => {
    return {
        type: actionTypes.REGISTER_ERASMUS_SUCCESS
    }
}
export const registerErasmusFail = (error) => {
    return {
        type: actionTypes.REGISTER_ERASMUS_FAIL,
        error: error,
    }
}
export const registerErasmusStart = () => {
    return {
        type: actionTypes.REGISTER_ERASMUS_START
    }
}
export const registerErasmus = (token, userId, formData) => {
    return {
        type: actionTypes.REGISTER_ERASMUS,
        token: token,
        userId: userId,
        formData: formData
    }
}
export const clearConnectionError = () => {
    return {
        type: actionTypes.CLEAR_CONNECTION_ERROR
    }
}

export const editProfileSuccess = () => {
    return {
        type: actionTypes.EDIT_PROFILE_SUCCESS
    }
}
export const editProfileFail = (error) => {
    return {
        type: actionTypes.EDIT_PROFILE_FAIL,
        error: error,
    }
}
export const editProfileStart = () => {
    return {
        type: actionTypes.EDIT_PROFILE_START
    }
}
export const editProfile = (token, data) => {
    return {
        type: actionTypes.EDIT_PROFILE,
        token: token,
        data: data
    }
}

export const editErasmusSuccess = () => {
    return {
        type: actionTypes.EDIT_ERASMUS_SUCCESS
    }
}
export const editErasmusFail = (error) => {
    return {
        type: actionTypes.EDIT_ERASMUS_FAIL,
        error: error,
    }
}
export const editErasmusStart = () => {
    return {
        type: actionTypes.EDIT_ERASMUS_START
    }
}
export const editErasmus = (token, data) => {
    return {
        type: actionTypes.EDIT_ERASMUS,
        token: token,
        data: data
    }
}


export const clearStudentConfirmationMessage = () => {
    return {
        type: actionTypes.CLEAR_STUDENT_CONFIRMATION_MESSAGE
    }
}
export const clearProfile = () => {
    return {
        type: actionTypes.CLEAR_PROFILE
    }
}
export const getNotificationStatus = (userId) => {
    return {
        type: actionTypes.GET_NOTIFICATION_STATUS,
        userId: userId
    }
}
export const getNotificationStatusStart = () => {
    return {
        type: actionTypes.GET_NOTIFICATION_STATUS_START
    }
}
export const getNotificationStatusSuccess = (isNotification) => {
    return {
        type: actionTypes.GET_NOTIFICATION_STATUS_SUCCESS,
        isNotification: isNotification
    }
}
export const getNotificationStatusFail = (error) => {
    return {
        type: actionTypes.GET_NOTIFICATION_STATUS_FAIL,
        error: error
    }
}

export const routeToChat = (connectionInfo) => {
    return{
        type: actionTypes.ROUTE_TO_CHAT,
        connectionInfo: connectionInfo
    }
}