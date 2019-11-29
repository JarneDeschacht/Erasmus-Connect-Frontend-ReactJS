import axios from "../../axios-custom";
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* fetchProfileSaga(action) {
    yield put(actions.fetchProfileStart());
    try {
        const response = yield axios.get('/my-profile', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.fetchProfileSuccess(response.data.user));
    }
    catch (error) {
        yield put(actions.fetchProfileFail(error));
    }
}
export function* fetchStudentsSaga(action) {
    yield put(actions.fetchStudentsStart());
    try {
        const response = yield axios.get('/students', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.fetchStudentsSuccess(response.data.users));
    }
    catch (error) {
        yield put(actions.fetchStudentsFail(error));
    }
}
export function* registerErasmusSaga(action) {
    yield put(actions.registerErasmusStart());
    try {
        yield axios({
            url: '/register-erasmus',
            method: 'POST',
            data: action.formData,
            headers: {
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.registerErasmusSuccess());
    }
    catch (error) {
        yield put(actions.registerErasmusFail(error));
    }
}
