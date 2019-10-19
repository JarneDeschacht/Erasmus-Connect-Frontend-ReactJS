import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
}
const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}
const authLogout = (state, action) => {
    return updateObject(state, { idToken: null, userId: null });
}

const registerStart = (state, action) =>{
    console.log('AUTH JS(reducer) - registerStart')
    return updateObject(state, {
        idToken: null, 
        loading: true, 
        userId: null, 
        error: null
    })
}

const registerFail = (state, action) => {
    console.log('AUTH JS(recucer) - registerFail')

    return updateObject(state,{
        loading: false,
        error: action.error
    })
}

const registerSuccess = (state, action) => {
    console.log('AUTH JS(reducer) - registerSuccess')

    return updateObject(state,{
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
        
    })
} 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTER_START : return registerStart(state, action);
        case actionTypes.REGISTER_FAIL : return registerFail(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action)
        default: return state;
    }
}


export default reducer