import { takeEvery, all } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { fetchProfileSaga, fetchStudentsSaga } from './student';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}
export function* watchStudent() {
    yield all([
        takeEvery(actionTypes.FETCH_STUDENT_PROFILE, fetchProfileSaga),
        takeEvery(actionTypes.FETCH_STUDENTS, fetchStudentsSaga),
    ]);

}