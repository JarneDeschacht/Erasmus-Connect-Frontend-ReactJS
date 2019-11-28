import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { passwordChangedSucces, passwordChangedFail } from '../actions/auth';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    confirmationMessage: null
}
const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}
const loginSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}
const loginFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}
const authLogout = (state, action) => {
    return updateObject(state, { idToken: null, userId: null });
}

const registerStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const registerFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}
const registerSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const passwordForgottenMailSucces = (state, action) => {
    return updateObject(state, {
        error: null,
        confirmationMessage: 'A message was sent to your email address'
    })
}

const passwordForgottenMailFail = (state, action) => {
    return updateObject(state, {
        error: 'something went wrong, try again later',
        confirmationMessage: null
    })
}

const passwordUpdatedSucces = (state, action) => {
    console.log('in password updated reducer')
    return updateObject(state, {
        error: null,
        confirmationMessage: 'Password was updated, log in with your new password.'
    })
}

const passwordUpdatedFail = (state, action) => {
    return updateObject(state, {
        error: 'something went wrong, your password was not updated. try again later',
        confirmationMessage: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.PASSWORDFORGOTTEN_MAIL_SUCCES: return passwordForgottenMailSucces(state, action);
        case actionTypes.PASSWORDFORGOTTEN_MAIL_FAIL: return passwordForgottenMailFail(state, action);
        case actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD_SUCCESS: return passwordUpdatedSucces(state, action);
        case actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD_FAIL: return passwordUpdatedFail(state, action);
        default: return state;
    }
}

export default reducer