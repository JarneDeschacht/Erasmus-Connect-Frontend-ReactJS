import { takeEvery, all } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga, registerUserSaga } from './auth';
import { fetchProfileSaga, fetchStudentsSaga } from './student';
import { fetchCountriesSaga } from './countries';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.REGISTER_USER, registerUserSaga)
    ]);
}
export function* watchStudent() {
    yield all([
        takeEvery(actionTypes.FETCH_STUDENT_PROFILE, fetchProfileSaga),
        takeEvery(actionTypes.FETCH_STUDENTS, fetchStudentsSaga),
    ]);
}

export function* watchCountries() {
    yield takeEvery(actionTypes.FETCH_COUNTRIES, fetchCountriesSaga);
}