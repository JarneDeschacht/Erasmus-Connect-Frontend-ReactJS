import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import axiosCustom from '../../axios-custom'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationTime');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe9ns8BH9Pj_OnjudjFiE7Nb96jNMgN9E';

    try {
        const response = yield axios.post(url, authData);
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}



export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));
        if (expirationTime > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout());
        }
    }
}


export function* registerUserSaga(action) {
    yield put(actions.registerStart())
    
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe9ns8BH9Pj_OnjudjFiE7Nb96jNMgN9E';
    
    const registerData = {
        firstName: action.credentials.firstName,
        lastName: action.credentials.lastName,
        email: action.credentials.email,
        currentCountry: action.credentials.currentCountry,
        password: action.credentials.password,
        currentCity: action.credentials.currentCity,
        dateOfBirth: action.credentials.dateOfBirth
    }
    try {
        const response = yield axios.post(url, registerData)
        yield put(actions.registerSuccess(response.data.idToken, response.data.localId));
        yield saveUserInDataBase(registerData)
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationTime', expirationTime)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    }
    catch (error) {
        yield console.log('something went wrong in auth.js saga')
        yield console.log(error)
        yield put(actions.registerFail(error.response.data.error))
    }
}

const saveUserInDataBase = (userData) => {
    axiosCustom.post('/users.json', userData)
}