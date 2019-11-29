import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
const registerErasmusStart = (state, action) => {
    return updateObject(state, {
        loading: true
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
    })
}

const initialState = {
    profile: null,
    students: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STUDENT_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_STUDENT_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
        case actionTypes.FETCH_STUDENT_PROFILE_FAIL: return fetchProfileFail(state, action);
        case actionTypes.FETCH_STUDENTS_START: return fetchStudentsStart(state, action);
        case actionTypes.FETCH_STUDENTS_SUCCESS: return fetchStudentsSuccess(state, action);
        case actionTypes.FETCH_STUDENTS_FAIL: return fetchStudentsFail(state, action);
        case actionTypes.REGISTER_ERASMUS_START: return registerErasmusStart(state, action);
        case actionTypes.REGISTER_ERASMUS_SUCCESS: return registerErasmusSuccess(state, action);
        case actionTypes.REGISTER_ERASMUS_FAIL: return registerErasmusFail(state, action);
        default: return state;
    }
};

export default reducer;