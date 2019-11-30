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
export function* getConnectionStatusSaga(action) {
    yield put(actions.getConnectionStatusStart());
    const connectionStatusData = action.userId + '/' + action.connectToId;
    
    try {
        const response = yield axios.get('/connectionStatus/' + connectionStatusData);
        yield put(actions.getConnectionStatusSuccess(response.data.connectionExists, response.data.connectionRequestSent, response.data.connectionRequestReceived));
    }
    catch (error) {
        yield put(actions.getConnectionStatusFail(error));
    }
}
export function* getConnectionsSaga(action) {
    yield put(actions.getConnectionsStart());

 
    const userId = action.userId;
    try {
        const response = yield axios.get(`/getConnections/${userId}`);
        console.log(response.data.connections);
        yield put(actions.getConnectionsSuccess(response.data.connections));
    }
    catch (error) {
        yield put(actions.getConnectionsFail(error));
    }
}
export function* makeConnectionSaga(action) {
    yield put(actions.getConnectionsStart());
    const connectionData = {
        userId: action.userId,
        connectToId: action.connectToId
    }
    try {
        yield axios.post('/connectToStudent', connectionData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.getConnectionsSuccess());
    }
    catch (error) {
        yield put(actions.getConnectionsFail(error));
    }
}
export function* acceptConnectionSaga(action) {
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
export function* refuseConnectionSaga(action) {
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
