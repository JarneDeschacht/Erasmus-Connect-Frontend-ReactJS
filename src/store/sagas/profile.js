import axios from "../../axios-custom";
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* fetchProfileSaga(action) {
    yield put(actions.fetchProfileStart());
    const queryParams = '?auth=' + action.token;
    try {
        const response = yield axios.get(`/users/${action.userId}.json` + queryParams);
        yield put(actions.fetchProfileSuccess(response.data));
    }
    catch (error) {
        yield put(actions.fetchProfileFail(error));
    }
}