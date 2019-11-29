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

export function* loginSaga(action) {
    yield put(actions.loginStart());
    const loginData = {
        email: action.email,
        password: action.password
    }

    try {
        const response = yield axiosCustom.post('/login', loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const expirationTime = yield new Date(new Date().getTime() + 3600000); //current time + 1 hour
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield localStorage.setItem('userId', response.data.userId);
        yield put(actions.loginSuccess(response.data.token, response.data.userId));
        yield put(actions.checkAuthTimeout(3600));
    } catch (error) {
        yield put(actions.loginFail(error.response.data.message));
    }
}

export function* registerSaga(action) {
    yield put(actions.registerStart())

    try {
        const response = yield axiosCustom.put('/signup', action.data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const expirationTime = yield new Date(new Date().getTime() + 3600000); //current time + 1 hour
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield localStorage.setItem('userId', response.data.userId);
        yield put(actions.registerSuccess(response.data.token, response.data.userId));
        yield put(actions.checkAuthTimeout(3600));
    }
    catch (error) {
        yield put(actions.registerFail(error.response.data.message))
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
            yield put(actions.loginSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout());
        }
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