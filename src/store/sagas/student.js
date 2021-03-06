import axios from "../../axios-custom";
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* fetchProfileSaga(action) {
    yield put(actions.fetchProfileStart());
    try {
        const response = yield axios.get('/student/' + action.userId, {
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
        const keyword = action.keyword === '' ? 'EMPTY' : action.keyword;
        const response = yield axios.get('/students/' + keyword, {
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
        yield put(actions.getConnectionsSuccess(response.data));
    }
    catch (error) {
        yield put(actions.getConnectionsFail(error));
    }
}
export function* makeConnectionSaga(action) {
    yield put(actions.makeConnectionStart());
    const connectionData = {
        userId: action.userId,
        connectToId: action.connectToId
    }
    try {
        yield axios.post('/connectToStudent', connectionData);
        yield put(actions.makeConnectionSuccess());
    }
    catch (error) {
        yield put(actions.makeConnectionFail(error.response.data.message));
    }
}
export function* acceptConnectionSaga(action) {

    yield put(actions.acceptConnectionStart());
    const connectionData = {
        sender: action.senderId,
        receiver: action.receiverId
    }
    try {
        yield axios.post('/acceptConnection', connectionData);
        yield put(actions.acceptConnectionSuccess());
        yield put(actions.getConnections(action.receiverId));
    }
    catch (error) {
        yield put(actions.acceptConnectionFail(error.response.data.message));
    }
}
export function* refuseConnectionSaga(action) {
    yield put(actions.refuseConnectionStart());
    const connectionData = {
        sender: action.senderId,
        receiver: action.receiverId
    }
    try {
        yield axios.post('/refuseConnection', connectionData);
        yield put(actions.refuseConnectionSuccess());
        yield put(actions.getConnections(action.receiverId));
    }
    catch (error) {
        yield put(actions.refuseConnectionFail(error.response.data.message));
    }
}
export function* getNotificationStatusSaga(action) {
    yield put(actions.getNotificationStatusStart());
    try {
        const response = yield axios.get('/getNotificationStatus/' + action.userId);
        yield put(actions.getNotificationStatusSuccess(response.data.response));
    }
    catch (error) {
        yield put(actions.getNotificationStatusFail(error.response.data.message));
    }
}

export function* uploadProfilePictureSaga(action) {
    yield put(actions.uploadProfilePictureStart());
    try {
        yield axios({
            url: '/uploadProfilePicture',
            method: 'POST',
            data: action.formData,
            headers: {
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.uploadProfilePictureSuccess());
    }
    catch (error) {
        yield put(actions.uploadProfilePictureFail());
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

export function* editProfileSaga(action) {
    yield put(actions.editProfileStart());
    try {
        yield axios({
            url: '/edit-profile',
            method: 'PATCH',
            data: action.data,
            headers: {
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.editProfileSuccess());
    }
    catch (error) {
        yield put(actions.editProfileFail(error));
    }
}

export function* editErasmusSaga(action) {
    yield put(actions.editErasmusStart());
    try {
        yield axios({
            url: '/edit-erasmus',
            method: 'PATCH',
            data: action.data,
            headers: {
                'Authorization': 'Bearer ' + action.token
            }
        });
        yield put(actions.editErasmusSuccess());
    }
    catch (error) {
        yield put(actions.editErasmusFail(error));
    }
}
