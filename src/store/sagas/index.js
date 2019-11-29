import { takeEvery, all } from 'redux-saga/effects';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    loginSaga,
    authCheckStateSaga,
    registerSaga,
    forgotPasswordSaga,
    setNewPasswordSaga
} from './auth';
import {
    fetchProfileSaga,
    fetchStudentsSaga,
    registerErasmusSaga
} from './student';
import { fetchCountriesSaga } from './countries';
import * as actionTypes from '../actions/actionTypes';



export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.LOGIN, loginSaga),
        takeEvery(actionTypes.REGISTER, registerSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.PASSWORDFORGOTTEN_START, forgotPasswordSaga),
        takeEvery(actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD, setNewPasswordSaga),
    ]);
}
export function* watchStudent() {
    yield all([
        takeEvery(actionTypes.FETCH_STUDENT_PROFILE, fetchProfileSaga),
        takeEvery(actionTypes.FETCH_STUDENTS, fetchStudentsSaga),
        takeEvery(actionTypes.REGISTER_ERASMUS, registerErasmusSaga)
    ]);
}

export function* watchCountries() {
    yield takeEvery(actionTypes.FETCH_COUNTRIES, fetchCountriesSaga);
}