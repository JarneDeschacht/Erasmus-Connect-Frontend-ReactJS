import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    profile: null,
    students: [],
    loading: false,
    connecting: false,
    connectionError: null,
    fetchingStatus: false,
    statusError: null,
    connectionExists: false,
    connectionRequestSent: false,
    connectionRequestReceived: false,
    connections: null,
    fetchingConnections: false,
    acceptingConnection: false,
    refusingConnection: false
};

const clearConnectionError = (state, action) => {
    return updateObject(state, {
        connectionError: null
    });
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
        fetchingConnections: true,
        loading: true
    })
}
const getConnectionsSuccess = (state, action) => {
    return updateObject(state, {
        fetchingConnections: false,
        connections: action.connections,
        loading: false
    })
}
const getConnectionsFail = (state, action) => {
    return updateObject(state, {
        fetchingConnections: false,
        connectionError: action.error,
        loading: false
    })
}

const acceptConnectionStart = (state, action) => {
    return updateObject(state, {
        acceptingConnection: true
    })
}
const acceptConnectionSuccess = (state, action) => {
    return updateObject(state, {
        acceptingConnection: false
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
        refusingConnection: false
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
    })
}
const registerErasmusFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
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
        default: return state;
    }
};

export default reducer;