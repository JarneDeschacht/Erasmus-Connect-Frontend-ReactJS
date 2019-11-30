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
    connectionRequestReceived: false
};

const fetchProfileStart = (state, action) => {
    return updateObject(state, {
        loading: true
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
const connectionStart = (state, action) => {
    return updateObject(state, {
        connecting: true
    })
}
const connectionSuccess = (state, action) => {
    return updateObject(state, {
        connecting: false,
        connectionRequestSent: true
    })
}
const connectionFail = (state, action) => {
    return updateObject(state, {
        connecting: false,
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
        case actionTypes.CONNECTION_START: return connectionStart(state, action);
        case actionTypes.CONNECTION_SUCCESS: return connectionSuccess(state, action);
        case actionTypes.CONNECTION_FAIL: return connectionFail(state, action);
        case actionTypes.GET_CONNECTION_STATUS_START: return getConnectionStatusStart(state, action);
        case actionTypes.GET_CONNECTION_STATUS_SUCCESS: return getConnectionStatusSuccess(state, action);
        case actionTypes.GET_CONNECTION_STATUS_FAIL: return getConnectionStatusFail(state, action);
        case actionTypes.REGISTER_ERASMUS_START: return registerErasmusStart(state, action);
        case actionTypes.REGISTER_ERASMUS_SUCCESS: return registerErasmusSuccess(state, action);
        case actionTypes.REGISTER_ERASMUS_FAIL: return registerErasmusFail(state, action);
        default: return state;
    }
};

export default reducer;