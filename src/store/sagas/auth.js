import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
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
        password: action.password
    }

    try {
        const response = yield axiosCustom.post('/login', authData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const expirationTime = yield new Date(new Date().getTime() + 3600000); //current time + 1 hour
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield localStorage.setItem('userId', response.data.userId);
        yield put(actions.authSuccess(response.data.token, response.data.userId));
        yield put(actions.checkAuthTimeout(3600));
    } catch (error) {
        yield put(actions.authFail(error.response.data.message));
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

    const userData = {
        bio: 'unknown',
        birthday: action.credentials.dateOfBirth,
        course: 'unknown',
        current: {
            city: action.credentials.currentCity,
            country: action.credentials.currentCountry,
            school: 'unknown',
        },
        email: action.credentials.email,
        firstname: action.credentials.firstName,
        lastname: action.credentials.lastName,
        upcoming: {
            city: 'unknown',
            country: 'unknown',
            school: 'unknown',
        }
    }

    const registerData = {
        email: action.credentials.email,
        password: action.credentials.password
    }
    try {
        const response = yield axiosCustom.post(url, registerData)
        yield put(actions.registerSuccess(response.data.idToken, response.data.localId));
        yield saveUserInDataBase(response.data.localId, userData)
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationTime', expirationTime)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    }
    catch (error) {
        yield put(actions.registerFail(error.response.data.error))
    }
}

export function* forgotPasswordSaga(action) {
    const params = {
        email: action.email
    }

    const response = yield axiosCustom.post('/forgotPassword', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function* setNewPasswordSaga(action) {
    yield console.log('in saga: '+ action.studentId + ' ' + action.newPassword)

    const params = {
        studentId: action.studentId,
        newPassword: action.newPassword
    }

    const response = yield axiosCustom.post('/setNewPassword', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const saveUserInDataBase = (userKey, userData) => {
    axiosCustom.put(`/users/${userKey}.json`, { ...userData }
    )
    // axiosCustom.post('/users.json', userData)
}