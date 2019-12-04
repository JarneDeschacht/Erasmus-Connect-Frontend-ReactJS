import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    profile: null,
    students: [],
    loading: false,
    error: null,
    connecting: false,
    connectionError: null,
    fetchingStatus: false,
    statusError: null,
    connectionExists: false,
    connectionRequestSent: false,
    connectionRequestReceived: false,
    connections: null,
    makingConnection: false,
    fetchingConnections: false,
    acceptingConnection: false,
    refusingConnection: false,
    confirmationMessage: null,
    gettingNotificationStatus: false,
    notificationError: null,
    isNotification: false
};

const clearConnectionError = (state, action) => {
    return updateObject(state, {
        connectionError: null
    });
}

const clearStudentConfirmationMessage = (state, action) => {
    return updateObject(state, {
        confirmationMessage: null
    })
}

const clearProfile = (state, action) => {
    return updateObject(state, {
        profile: null
    })
}

const fetchProfileStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        connections: null
    });
}
const fetchProfileSuccess = (state, action) => {
    return updateObject(state, {
        profile: action.profile,
        loading: false,
    })
}
const fetchProfileFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}
const fetchStudentsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}
const fetchStudentsSuccess = (state, action) => {
    return updateObject(state, {
        students: action.students,
        loading: false,
    })
}
const fetchStudentsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}
const getConnectionStatusStart = (state, action) => {
    return updateObject(state, {
        fetchingStatus: true
    })
}
const getConnectionStatusSuccess = (state, action) => {
    return updateObject(state, {
        fetchingStatus: false,
        connectionExists: action.connectionExists,
        connectionRequestSent: action.connectionRequestSent,
        connectionRequestReceived: action.connectionRequestReceived
    })
}
const getConnectionStatusFail = (state, action) => {
    return updateObject(state, {
        fetchingStatus: false,
        statusError: null
    })
}

const getConnectionsStart = (state, action) => {
    return updateObject(state, {
        fetchingConnections: true
    })
}
const getConnectionsSuccess = (state, action) => {
    return updateObject(state, {
        fetchingConnections: false,
        connections: action.connections
    })
}
const getConnectionsFail = (state, action) => {
    return updateObject(state, {
        fetchingConnections: false,
        connectionError: action.error
    })
}

const makeConnectionStart = (state, action) => {
    return updateObject(state, {
        makingConnection: true
    })
}
const makeConnectionSuccess = (state, action) => {
    return updateObject(state, {
        makingConnection: false,
        confirmationMessage: 'Request sent',
        connectionExists: false,
        connectionRequestSent: true,
        connectionRequestReceived: false
    })
}
const makeConnectionFail = (state, action) => {
    return updateObject(state, {
        makingConnection: false,
        error: action.error
    })
}
const acceptConnectionStart = (state, action) => {
    return updateObject(state, {
        acceptingConnection: true
    })
}
const acceptConnectionSuccess = (state, action) => {
    return updateObject(state, {
        acceptingConnection: false,
        confirmationMessage: 'Request accepted',
        connectionExists: true,
        connectionRequestSent: true,
        connectionRequestReceived: false
    })
}
const acceptConnectionFail = (state, action) => {
    return updateObject(state, {
        acceptingConnection: false,
        connectionError: action.error
    })
}

const refuseConnectionStart = (state, action) => {
    return updateObject(state, {
        refusingConnection: true
    })
}
const refuseConnectionSuccess = (state, action) => {
    return updateObject(state, {
        refusingConnection: false,
        confirmationMessage: 'Request refused',
        connectionExists: false,
        connectionRequestSent: false,
        connectionRequestReceived: false
    })
}
const refuseConnectionFail = (state, action) => {
    return updateObject(state, {
        refusingConnection: false,
        connectionError: action.error
    })
}

const registerErasmusStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}
const registerErasmusSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        confirmationMessage: 'Erasmus registered'
    })
}
const registerErasmusFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}
const getNotificationStatusStart = (state, action) => {
    return updateObject(state, {
        gettingNotificationStatus: true
    })
}
const getNotificationStatusSuccess = (state, action) => {
    return updateObject(state, {
        gettingNotificationStatus: false,
        isNotification: action.isNotification
    })
}
const getNotificationStatusFail = (state, action) => {
    return updateObject(state, {
        gettingNotificationStatus: false,
        notificationError: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STUDENT_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_STUDENT_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_STUDENT_PROFILE_FAIL: return fetchProfileFail(state, action);
        case actionTypes.FETCH_STUDENTS_START: return fetchStudentsStart(state, action);
        case actionTypes.FETCH_STUDENTS_SUCCESS: return fetchStudentsSuccess(state, action);
        case actionTypes.FETCH_STUDENTS_FAIL: return fetchStudentsFail(state, action);
        case actionTypes.GET_CONNECTIONS_START: return getConnectionsStart(state, action);
        case actionTypes.GET_CONNECTIONS_SUCCESS: return getConnectionsSuccess(state, action);
        case actionTypes.GET_CONNECTIONS_FAIL: return getConnectionsFail(state, action);
        case actionTypes.GET_CONNECTION_STATUS_START: return getConnectionStatusStart(state, action);
        case actionTypes.GET_CONNECTION_STATUS_SUCCESS: return getConnectionStatusSuccess(state, action);
        case actionTypes.GET_CONNECTION_STATUS_FAIL: return getConnectionStatusFail(state, action);
        case actionTypes.MAKE_CONNECTION_START: return makeConnectionStart(state, action);
        case actionTypes.MAKE_CONNECTION_SUCCESS: return makeConnectionSuccess(state, action);
        case actionTypes.MAKE_CONNECTION_FAIL: return makeConnectionFail(state, action);
        case actionTypes.ACCEPT_CONNECTION_START: return acceptConnectionStart(state, action);
        case actionTypes.ACCEPT_CONNECTION_SUCCESS: return acceptConnectionSuccess(state, action);
        case actionTypes.ACCEPT_CONNECTION_FAIL: return acceptConnectionFail(state, action);
        case actionTypes.REFUSE_CONNECTION_START: return refuseConnectionStart(state, action);
        case actionTypes.REFUSE_CONNECTION_SUCCESS: return refuseConnectionSuccess(state, action);
        case actionTypes.REFUSE_CONNECTION_FAIL: return refuseConnectionFail(state, action);
        case actionTypes.REGISTER_ERASMUS_START: return registerErasmusStart(state, action);
        case actionTypes.REGISTER_ERASMUS_SUCCESS: return registerErasmusSuccess(state, action);
        case actionTypes.REGISTER_ERASMUS_FAIL: return registerErasmusFail(state, action);
        case actionTypes.CLEAR_CONNECTION_ERROR: return clearConnectionError(state, action);
        case actionTypes.CLEAR_STUDENT_CONFIRMATION_MESSAGE: return clearStudentConfirmationMessage(state, action);
        case actionTypes.CLEAR_PROFILE: return clearProfile(state, action);
        case actionTypes.GET_NOTIFICATION_STATUS_START: return getNotificationStatusStart(state, action);
        case actionTypes.GET_NOTIFICATION_STATUS_SUCCESS: return getNotificationStatusSuccess(state, action);
        case actionTypes.GET_NOTIFICATION_STATUS_FAIL: return getNotificationStatusFail(state, action);
        default: return state;
    }
};

export default reducer;