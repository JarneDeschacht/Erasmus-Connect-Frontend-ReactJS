import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}
export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
}
export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}
export const auth = (email, password) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
    }
}
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}

export const register = (credentials) => {
    return {
        type: actionTypes.REGISTER_USER,
        credentials: credentials
    }
}

export const registerStart = () =>{
    return{
        type: actionTypes.REGISTER_START
    }
}

export const registerFail = (error) => {
    return{
        type: actionTypes.REGISTER_FAIL,
        error: error
    }
}

export const registerSuccess = () => {
    return{
        type: actionTypes.REGISTER_SUCCESS
    }
}