import { takeEvery, all } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  loginSaga,
  authCheckStateSaga,
  registerSaga,
  forgotPasswordSaga,
  setNewPasswordSaga
} from "./auth";
import {
  fetchProfileSaga,
  fetchStudentsSaga,
  makeConnectionSaga,
  acceptConnectionSaga,
  refuseConnectionSaga,
  getConnectionStatusSaga,
  getConnectionsSaga,
  registerErasmusSaga,
  editProfileSaga,
  editErasmusSaga,
  getNotificationStatus
} from "./student";
import {
  fetchCountriesSaga
} from "./countries";
import {
  getMessagesSaga,
  sendMessageSaga,
  getLastMessageOfConversationSaga
} from "./chat"
import * as actionTypes from "../actions/actionTypes";

export function* watchChat() {
  yield all([
    takeEvery(actionTypes.GET_MESSAGES, getMessagesSaga),
    takeEvery(actionTypes.SEND_MESSAGE, sendMessageSaga),
    takeEvery(actionTypes.GET_LAST_MESSAGE_OF_CONVERSATION, getLastMessageOfConversationSaga)
  ]);
}

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.PASSWORDFORGOTTEN_START, forgotPasswordSaga),
    takeEvery(actionTypes.PASSWORDFORGOTTEN_NEWPASSWORD, setNewPasswordSaga),
    takeEvery(actionTypes.REGISTER, registerSaga),
  ]);
}
export function* watchStudent() {
  yield all([
    takeEvery(actionTypes.FETCH_STUDENT_PROFILE, fetchProfileSaga),
    takeEvery(actionTypes.FETCH_STUDENTS, fetchStudentsSaga),
    takeEvery(actionTypes.MAKE_CONNECTION, makeConnectionSaga),
    takeEvery(actionTypes.ACCEPT_CONNECTION, acceptConnectionSaga),
    takeEvery(actionTypes.REFUSE_CONNECTION, refuseConnectionSaga),
    takeEvery(actionTypes.GET_CONNECTION_STATUS, getConnectionStatusSaga),
    takeEvery(actionTypes.GET_CONNECTIONS, getConnectionsSaga),
    takeEvery(actionTypes.REGISTER_ERASMUS, registerErasmusSaga),
    takeEvery(actionTypes.EDIT_PROFILE, editProfileSaga),
    takeEvery(actionTypes.EDIT_ERASMUS, editErasmusSaga),
    takeEvery(actionTypes.GET_NOTIFICATION_STATUS, getNotificationStatus)
  ]);
}

export function* watchCountries() {
  yield takeEvery(actionTypes.FETCH_COUNTRIES, fetchCountriesSaga);
}

