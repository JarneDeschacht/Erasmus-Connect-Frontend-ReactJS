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
export function* fetchStudentsSaga(action) {
    yield put(actions.fetchStudentsStart());
    const queryParams = '?auth=' + action.token;
    try {
        const response = yield axios.get('/users.json' + queryParams);

        const fetchedStudents = [];
        for (let key in response.data) {
            if (key !== action.userId) {
                fetchedStudents.push(
                    {
                        id: key,
                        ...response.data[key]
                    }
                );
            }
        }
        yield put(actions.fetchStudentsSuccess(fetchedStudents));
    }
    catch (error) {
        yield put(actions.fetchStudentsFail(error));
    }
}
